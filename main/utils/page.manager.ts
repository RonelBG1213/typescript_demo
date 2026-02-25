import { Page, TestInfo } from "@playwright/test";
import { homePage } from "../functions/homePageMethods";
import { contactUsPage } from "../functions/contactUsPageMethods";
import { navbarPage } from "../functions/navigationMethods";
import { privacyPolicyCookie } from "../functions/modals/privacyPolicyCookie";
import { ScreenshotHelper } from "./screenshot";

/**
 * Central lazy-load Page Object provider.
 *
 * Page objects are instantiated only on first access and cached for the
 * lifetime of the manager instance.  A **single** `ScreenshotHelper` is
 * shared across every page object so the step counter stays consistent.
 */
export class PageManager {
  private readonly page: Page;
  private readonly testInfo: TestInfo;

  /** Shared screenshot helper – one step counter for the whole test. */
  readonly screenshot: ScreenshotHelper;

  private _homePage?: homePage;
  private _contactUsPage?: contactUsPage;
  private _navbarPage?: navbarPage;
  private _privacyPolicyCookie?: privacyPolicyCookie;

  constructor(page: Page, testInfo: TestInfo) {
    this.page = page;
    this.testInfo = testInfo;
    this.screenshot = new ScreenshotHelper(testInfo);
  }

  /** Home page – lazy-loaded on first access */
  get home(): homePage {
    if (!this._homePage) {
      this._homePage = new homePage(this.page, this.testInfo, this.screenshot);
    }
    return this._homePage;
  }

  /** Contact Us page – lazy-loaded on first access */
  get contactUs(): contactUsPage {
    if (!this._contactUsPage) {
      this._contactUsPage = new contactUsPage(this.page, this.testInfo, this.screenshot);
    }
    return this._contactUsPage;
  }

  /** Navigation bar – lazy-loaded on first access */
  get navbar(): navbarPage {
    if (!this._navbarPage) {
      this._navbarPage = new navbarPage(this.page);
    }
    return this._navbarPage;
  }

  /** Privacy-policy / cookie modal – lazy-loaded on first access */
  get privacyCookie(): privacyPolicyCookie {
    if (!this._privacyPolicyCookie) {
      this._privacyPolicyCookie = new privacyPolicyCookie(this.page);
    }
    return this._privacyPolicyCookie;
  }
}
