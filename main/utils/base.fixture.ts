import { test as base } from "@playwright/test";
import { PageManager } from "./page.manager";
import { ScreenshotHelper } from "./screenshot";

// ---------------------------------------------------------------------------
// Custom Playwright fixtures
// ---------------------------------------------------------------------------

type Fixtures = {
  /** Lazy-load page manager – auto-created per test */
  pm: PageManager;

  /** Page manager pre-navigated with cookie modal dismissed */
  pmWithCookies: PageManager;

  /** Standalone screenshot helper for ad-hoc captures in tests */
  capture: ScreenshotHelper;
};

/**
 * Extended `test` with custom fixtures.
 *
 * | Fixture | Description |
 * |---|---|
 * | `pm` | Bare PageManager – caller handles navigation & cookies |
 * | `pmWithCookies` | Pre-navigated to `/` with cookie modal accepted |
 * | `capture` | Standalone ScreenshotHelper (prefer `pm.screenshot` when using pm) |
 *
 * @example
 * ```ts
 * import { test, expect } from "main/utils/base.fixture";
 *
 * test("with pm", async ({ pm }) => {
 *   await pm.navbar.navigate();
 *   await pm.home.verify_header();
 *   await pm.screenshot.captureStep(pm.home.page, 'Done');
 * });
 *
 * test("standalone capture", async ({ page, capture }) => {
 *   await page.goto('/');
 *   await capture.captureStep(page, 'Landing', { fullPage: true });
 * });
 * ```
 */
export const test = base.extend<Fixtures>({
  pm: async ({ page }, use, testInfo) => {
    await use(new PageManager(page, testInfo));
  },

  pmWithCookies: async ({ page }, use, testInfo) => {
    const pm = new PageManager(page, testInfo);
    await pm.navbar.navigate();
    await pm.privacyCookie.handleCookieModal();
    await use(pm);
  },

  capture: async ({}, use, testInfo) => {
    await use(new ScreenshotHelper(testInfo));
  },
});

export { expect } from "@playwright/test";
