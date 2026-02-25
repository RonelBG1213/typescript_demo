import { Page, Locator } from "@playwright/test";
import { navLocators } from "../locators/navigationLocators";
import { Logger } from "../utils/logger";

export class navbarPage {
  readonly page: Page;
  private logger: Logger;

  readonly homeNavLink: Locator;
  readonly contactUsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logger = new Logger();
    this.homeNavLink = page.getByAltText(navLocators.home.alttext);
    this.contactUsLink = page.getByRole(
      navLocators.contactUs.role,
      navLocators.contactUs.text
    );
  }

  async navigate(): Promise<void> {
    await this.page.goto("/", { timeout: 60000, waitUntil: "domcontentloaded" });
    this.logger.info("Navigated to home page");
  }

  async navigate_to_home(): Promise<void> {
    await this.homeNavLink.click();
  }

  async navigate_to_contact_us(): Promise<void> {
    await this.contactUsLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navbar_link(selectpage: string): Promise<void> {
    switch (selectpage) {
      case "home":
        await this.navigate_to_home();
        break;
      case "contactus":
        await this.navigate_to_contact_us();
        break;
      default:
        throw new Error(`Unknown page: "${selectpage}". Expected "home" or "contactus".`);
    }
  }
}
