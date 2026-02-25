import { Page, Locator } from "@playwright/test";
import { Logger } from "../../utils/logger";

export class privacyPolicyCookie {
  readonly page: Page;
  private logger: Logger;
  readonly modalText: Locator;
  readonly rejectAllButton: Locator;
  readonly acceptAll: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logger = new Logger();
    this.modalText = page.getByText('By clicking "Accept All", you');
    this.rejectAllButton = page.getByRole('button', { name: 'Reject All' });
    this.acceptAll = page.getByRole('button', { name: 'Accept All' });
  }

  async handleCookieModal(): Promise<void> {
    try {
      if (await this.modalText.isVisible({ timeout: 5000 })) {
        await this.acceptAll.click();
        this.logger.info("Accepted Cookie");
      }
    } catch {
      // Modal not present – safe to continue
      this.logger.info("Cookie modal not found – skipping");
    }
  }
}
