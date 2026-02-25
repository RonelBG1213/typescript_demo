import { test, Page, Locator, expect, TestInfo } from "@playwright/test";
import { homePageLocators } from "../locators/homePageLocators";
import { Logger } from "../utils/logger";
import { ScreenshotHelper } from '../utils/screenshot';

interface FillForm {
    name: string;
    emailAddress: string;
    contactNumber: string;
    companyName: string;
    jobTitle: string;
    service: string;
    message: string;
}

export class homePage {
    readonly page: Page;
    private logger: Logger;
    private screenshot: ScreenshotHelper;

    readonly bannerHeader: Locator;
    readonly ourServiceHeader: Locator;
    readonly whyStratPointHeader: Locator;
    readonly successStoriesHeader: Locator;
    readonly whatOurClientSayHeader: Locator;
    readonly whatsNewHeader: Locator;
    readonly letsConnectHeader: Locator;
    readonly formLabelName: Locator;
    readonly textFieldName: Locator;
    readonly formLabelEmailAddress: Locator;
    readonly textFieldEmailAddress: Locator;
    readonly formLabelContactNumber: Locator;
    readonly textFieldContactNumber: Locator;
    readonly formLabelCompanyName: Locator;
    readonly textFieldCompanyName: Locator;
    readonly formLabelJobTitle: Locator;
    readonly textFieldJobTitle: Locator;
    readonly formLabelService: Locator;
    readonly selectService: Locator;
    readonly formLabelMessage: Locator;
    readonly textAreaMessage: Locator;
    readonly checkboxPrivacyPolicy: Locator;
    readonly linkPrivacyPolicy: Locator;
    readonly getInTouchButton: Locator;
    readonly mesmessageAfterGetInTouch: Locator;
    readonly privacyPolicyLink: Locator;

    constructor(page: Page, private testinfo: TestInfo, screenshot: ScreenshotHelper) {
        this.page = page;
        this.logger = new Logger();
        this.screenshot = screenshot;

        this.bannerHeader = page.getByRole(
            homePageLocators.bannerHeader.role,
            homePageLocators.bannerHeader.text
        );
        this.ourServiceHeader = page.getByRole(
            homePageLocators.ourServicesHeader.role,
            homePageLocators.ourServicesHeader.text
        );
        this.whyStratPointHeader = page.getByRole(
            homePageLocators.whyStratpointHeader.role,
            homePageLocators.whyStratpointHeader.text
        );
        this.successStoriesHeader = page.getByRole(
            homePageLocators.successStoriesHeader.role,
            homePageLocators.successStoriesHeader.text
        );
        this.whatOurClientSayHeader = page.getByRole(
            homePageLocators.whatOurClientSayHeader.role,
            homePageLocators.whatOurClientSayHeader.text
        );
        this.whatsNewHeader = page.getByRole(
            homePageLocators.whatsNewHeader.role,
            homePageLocators.whatsNewHeader.text
        );
        this.letsConnectHeader = page.getByRole(
            homePageLocators.letsConnectHeader.role,
            homePageLocators.letsConnectHeader.text
        );

        this.formLabelName = page.getByText(
            homePageLocators.formLabelName.text,
            homePageLocators.formLabelName.option
        );

        this.textFieldName = page.getByRole(
            homePageLocators.textFieldName.role,
            homePageLocators.textFieldName.text
        );
        this.formLabelEmailAddress = page.getByText(
            homePageLocators.formLabelEmailAddress.text
        );
        this.textFieldEmailAddress = page.getByRole(
            homePageLocators.textFieldEmailAddress.role,
            homePageLocators.textFieldEmailAddress.text
        );
        this.formLabelContactNumber = page.getByText(
            homePageLocators.formLabelContactNumber.text
        );
        this.textFieldContactNumber = page.getByRole(
            homePageLocators.textFieldContactNumber.role,
            homePageLocators.textFieldContactNumber.text
        );
        this.formLabelCompanyName = page.getByText(
            homePageLocators.formLabelCompanyName.text
        );
        this.textFieldCompanyName = page.getByRole(
            homePageLocators.textFieldCompanyName.role,
            homePageLocators.textFieldCompanyName.text
        );
        this.formLabelJobTitle = page.getByText(
            homePageLocators.formLabelJobTitle.text
        );
        this.textFieldJobTitle = page.getByRole(
            homePageLocators.textFieldJobTitle.role,
            homePageLocators.textFieldJobTitle.text
        );
        this.formLabelService = page.getByText(
            homePageLocators.formLabelJobTitle.text
        );
        this.selectService = page.getByRole(
            homePageLocators.selectService.role,
            homePageLocators.selectService.text
        );
        this.formLabelMessage = page
            .locator(homePageLocators.formLabelMessage.xpath)
            .locator(homePageLocators.formLabelMessage.xpath2);
        this.textAreaMessage = page.getByRole(
            homePageLocators.textAreaMessage.role,
            homePageLocators.textAreaMessage.text
        );
        this.checkboxPrivacyPolicy = page.getByRole(
            homePageLocators.checkboxPrivacyPolicy.role,
            homePageLocators.checkboxPrivacyPolicy.text
        );
        this.linkPrivacyPolicy = page.getByRole(
            homePageLocators.linkPrivacyPolicy.role,
            homePageLocators.linkPrivacyPolicy.text
        );
        this.getInTouchButton = page.getByRole(
            homePageLocators.getInTouchButton.role,
            homePageLocators.getInTouchButton.text
        );
        this.mesmessageAfterGetInTouch = page.getByText(
            homePageLocators.messageAfterGetInTouch.text
        );
        this.privacyPolicyLink = page
            .locator(homePageLocators.privacyPolicyLink.tagForChain)
            .getByRole(
                homePageLocators.privacyPolicyLink.role,
                homePageLocators.privacyPolicyLink.text
            );
    }

    async navigate(): Promise<void> {
        await this.page.goto('/', { timeout: 60000, waitUntil: 'domcontentloaded' });
        this.logger.info("Navigated to home page");
    }

    async verify_header() :Promise<void> {
        await test.step("Verify Section headers", async () => {
            this.page.pause();
            await expect(this.bannerHeader).toBeVisible();
            const bannerText = await this.bannerHeader.innerText();
            this.logger.info(`Banner Text is: ${bannerText}`);
            await expect(this.bannerHeader).toHaveText("Fast forward to the future");

            await expect(this.ourServiceHeader).toBeVisible();
            const ourServicesText = await this.ourServiceHeader.innerText();
            this.logger.info(`Section header Text is: ${ourServicesText}`);
            await expect(this.ourServiceHeader).toHaveText("OUR SERVICES");


            await expect(this.whyStratPointHeader).toBeVisible();
            const whyStratpointText = await this.whyStratPointHeader.innerText();
            this.logger.info(`Section header Text is: ${whyStratpointText}`);
            await expect(this.whyStratPointHeader).toHaveText("WHY STRATPOINT?");


            await expect(this.whatOurClientSayHeader).toBeVisible();
            const whatOurClientSayText =
                await this.whatOurClientSayHeader.innerText();
            this.logger.info(`Section header Text is: ${whatOurClientSayText}`);
            await expect(this.whatOurClientSayHeader).toHaveText(
                "WHAT OUR CLIENTS SAY"
            );


            await expect(this.whatsNewHeader).toBeVisible();
            const whatsNewText = await this.whatsNewHeader.innerText();
            this.logger.info(`Section header Text is: ${whatsNewText}`);
            await expect(this.whatsNewHeader).toHaveText("WHAT’S NEW");


            await expect(this.letsConnectHeader).toBeVisible();
            const letsConnectText = await this.letsConnectHeader.innerText();
            this.logger.info(`Section header Text is: ${letsConnectText}`);
            await expect(this.letsConnectHeader).toHaveText("Let's connect");

        });
    }

    async fill_lets_connect_form(forms: FillForm): Promise<void> {
        await test.step("Fill and verify lets connect form", async () => {
            const fields: [Locator, Locator, string][] = [
                [this.formLabelName, this.textFieldName, forms.name],
                [this.formLabelEmailAddress, this.textFieldEmailAddress, forms.emailAddress],
                [this.formLabelContactNumber, this.textFieldContactNumber, forms.contactNumber],
                [this.formLabelCompanyName, this.textFieldCompanyName, forms.companyName],
                [this.formLabelJobTitle, this.textFieldJobTitle, forms.jobTitle],
            ];

            for (const [label, input, value] of fields) {
                await expect(label).toBeVisible();
                await input.fill(value);
            }

            await expect(this.formLabelService).toBeVisible();
            await this.selectService.selectOption(forms.service);

            await expect(this.formLabelMessage).toBeVisible();
            await this.textAreaMessage.fill(forms.message);

            await this.checkboxPrivacyPolicy.click();
            await this.getInTouchButton.click();

            await this.screenshot.captureStep(this.page, 'Form filled', { fullPage: true });
            this.logger.info("Form submitted");
            await this.screenshot.captureStep(this.page, 'After submit', { fullPage: true });

            await expect(this.mesmessageAfterGetInTouch).toBeVisible({ timeout: 10000 });
        });
    }

    async privacy_policy_page(): Promise<void> {
        await test.step("View privacy policy page in new tab", async () => {
            await expect(this.privacyPolicyLink).toBeVisible();
            const href = await this.privacyPolicyLink.getAttribute("href");
            const newTab = await this.page.context().newPage();
            await newTab.goto(href!);
            this.logger.info("Opened Privacy Policy page");
            await newTab.close();
            await this.page.bringToFront();
        });
    }
}
