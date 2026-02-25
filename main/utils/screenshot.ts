import { Page, Locator, TestInfo } from '@playwright/test';
import fs from 'fs-extra';
import path from 'path';

// ── Types ──────────────────────────────────────────────────────────────────────

type ImageFormat = 'png' | 'jpeg';

interface CaptureOptions {
  /** Take a full-page screenshot (default: false) */
  fullPage?: boolean;
  /** Image format (default: 'png') */
  format?: ImageFormat;
  /** JPEG quality 0-100 – only used when format is 'jpeg' */
  quality?: number;
  /** Timeout in ms for the screenshot call (default: 30 000) */
  timeout?: number;
  /** Clip region {x, y, width, height} – ignored when fullPage is true */
  clip?: { x: number; y: number; width: number; height: number };
  /** Whether to hide the default white background and allow transparency (png only) */
  omitBackground?: boolean;
}

// ── ScreenshotHelper ───────────────────────────────────────────────────────────

/**
 * A per-test screenshot helper that:
 * - auto-increments a step counter shared across all page objects
 * - saves screenshots to `test-results/screenshots/<testName>/`
 * - attaches every capture to the Playwright HTML report
 * - supports full-page, viewport, region (clip), and element screenshots
 *
 * Create **one** instance per test (via PageManager) so the step counter
 * stays consistent across page objects.
 */
export class ScreenshotHelper {
  private stepCounter = 1;
  private readonly screenshotDir: string;
  private readonly testInfo: TestInfo;

  constructor(testInfo: TestInfo) {
    this.testInfo = testInfo;
    const safeTitle = testInfo.title.replace(/\s+/g, '_').replace(/[^\w]/g, '');
    this.screenshotDir = path.join('test-results', 'screenshots', safeTitle);
    fs.ensureDirSync(this.screenshotDir);
  }

  // ── Core helpers ───────────────────────────────────────────────────────────

  /** Current step number (read-only). */
  get step(): number {
    return this.stepCounter;
  }

  /** Build a file path inside the screenshot dir. */
  private buildPath(label: string, format: ImageFormat = 'png'): string {
    const safeLabel = label.replace(/\s+/g, '_').replace(/[^\w-]/g, '');
    return path.join(
      this.screenshotDir,
      `step${this.stepCounter}-${safeLabel}.${format}`,
    );
  }

  /** Guard – throws if the page is already closed. */
  private assertOpen(page: Page): void {
    if (page.isClosed()) {
      throw new Error('Cannot capture screenshot: page is already closed.');
    }
  }

  /** Attach a screenshot file to the Playwright HTML report. */
  private async attach(label: string, filepath: string, format: ImageFormat = 'png'): Promise<void> {
    await this.testInfo.attach(`Step ${this.stepCounter}: ${label}`, {
      path: filepath,
      contentType: format === 'jpeg' ? 'image/jpeg' : 'image/png',
    });
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  /**
   * Capture a page-level screenshot (viewport or full-page).
   *
   * @example
   * ```ts
   * await screenshot.captureStep(page, 'After login');
   * await screenshot.captureStep(page, 'Full page', { fullPage: true });
   * await screenshot.captureStep(page, 'Hero section', {
   *   clip: { x: 0, y: 0, width: 1280, height: 600 },
   * });
   * ```
   */
  async captureStep(
    page: Page,
    stepName: string,
    fullPageOrOptions: boolean | CaptureOptions = false,
  ): Promise<string> {
    this.assertOpen(page);

    // Backwards-compat: accept a plain boolean for fullPage
    const opts: CaptureOptions =
      typeof fullPageOrOptions === 'boolean'
        ? { fullPage: fullPageOrOptions }
        : fullPageOrOptions;

    const format = opts.format ?? 'png';
    const filepath = this.buildPath(stepName, format);

    await page.screenshot({
      path: filepath,
      fullPage: opts.fullPage ?? false,
      type: format,
      quality: format === 'jpeg' ? (opts.quality ?? 80) : undefined,
      timeout: opts.timeout ?? 30_000,
      clip: opts.fullPage ? undefined : opts.clip,
      omitBackground: opts.omitBackground,
    });

    await this.attach(stepName, filepath, format);
    this.stepCounter++;
    return filepath;
  }

  /**
   * Capture a screenshot of a specific element / locator.
   *
   * @example
   * ```ts
   * await screenshot.captureElement(page.locator('.hero'), 'Hero banner');
   * ```
   */
  async captureElement(
    locator: Locator,
    stepName: string,
    options: Pick<CaptureOptions, 'format' | 'quality' | 'timeout' | 'omitBackground'> = {},
  ): Promise<string> {
    const format = options.format ?? 'png';
    const filepath = this.buildPath(stepName, format);

    await locator.screenshot({
      path: filepath,
      type: format,
      quality: format === 'jpeg' ? (options.quality ?? 80) : undefined,
      timeout: options.timeout ?? 30_000,
      omitBackground: options.omitBackground,
    });

    await this.attach(stepName, filepath, format);
    this.stepCounter++;
    return filepath;
  }

  /**
   * Capture a *before* and *after* screenshot pair around an action.
   *
   * @example
   * ```ts
   * await screenshot.captureBeforeAfter(page, 'Form submit', async () => {
   *   await page.click('#submit');
   * });
   * ```
   */
  async captureBeforeAfter(
    page: Page,
    label: string,
    action: () => Promise<void>,
    options: CaptureOptions = {},
  ): Promise<{ before: string; after: string }> {
    const before = await this.captureStep(page, `${label}_before`, options);
    await action();
    const after = await this.captureStep(page, `${label}_after`, options);
    return { before, after };
  }

  /**
   * Capture the page only when a condition is true. Useful for conditional
   * evidence gathering (e.g. capture when an error toast is visible).
   *
   * @returns The file path if captured, or `null` if skipped.
   */
  async captureIf(
    page: Page,
    condition: boolean | (() => boolean | Promise<boolean>),
    stepName: string,
    options: CaptureOptions = {},
  ): Promise<string | null> {
    const shouldCapture =
      typeof condition === 'function' ? await condition() : condition;
    if (!shouldCapture) return null;
    return this.captureStep(page, stepName, options);
  }
}