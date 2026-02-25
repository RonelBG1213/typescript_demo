import { test, Page, Locator, expect, TestInfo } from "@playwright/test";
import { contactUsPageLocators } from "../locators/contactUsLocators";
import { Logger } from "../utils/logger";
import { ScreenshotHelper } from '../utils/screenshot';

interface FillForm {
    name: string;
    emailAddress: string;
    contactNumber: string;
    companyName: string;
    jobTitle: string;
    typeOfService: string;
    subject: string;
    message: string;
}

export class contactUsPage {
    readonly page: Page;
    private logger: Logger;
    private screenshot: ScreenshotHelper;
    readonly contactUsHeader: Locator;
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
    readonly formLabelTypeOfInquiry: Locator;
    readonly selectTypeOfInquiry: Locator;
    readonly formLabelSubject: Locator;
    readonly textFieldSubject: Locator;
    readonly formLabelMessage: Locator;
    readonly textAreaMessage: Locator;
    readonly checkboxPrivacyPolicy: Locator;
    readonly linkPrivacyPolicy: Locator;
    readonly sendButton: Locator;
    readonly mesmessageAfterGetInTouch: Locator;
    readonly privacyPolicyLink: Locator;

    constructor(page: Page, private testinfo: TestInfo, screenshot: ScreenshotHelper) {
        this.page = page;
        this.logger = new Logger();
        this.screenshot = screenshot;

        this.contactUsHeader = page.getByRole(
            contactUsPageLocators.contactUsHeader.role,
            contactUsPageLocators.contactUsHeader.text
        );

        this.formLabelName = page.getByText(
            contactUsPageLocators.formLabelName.text,
            contactUsPageLocators.formLabelName.option
        );
        this.textFieldName = page.getByRole(
            contactUsPageLocators.textFieldName.role,
            contactUsPageLocators.textFieldName.text
        );
        this.formLabelEmailAddress = page.getByText(
            contactUsPageLocators.formLabelEmailAddress.text
        );
        this.textFieldEmailAddress = page.getByRole(
            contactUsPageLocators.textFieldEmailAddress.role,
            contactUsPageLocators.textFieldEmailAddress.text
        );
        this.formLabelContactNumber = page.getByText(
            contactUsPageLocators.formLabelContactNumber.text
        );
        this.textFieldContactNumber = page.getByRole(
            contactUsPageLocators.textFieldContactNumber.role,
            contactUsPageLocators.textFieldContactNumber.text
        );
        this.formLabelCompanyName = page.getByText(
            contactUsPageLocators.formLabelCompanyName.text
        );
        this.textFieldCompanyName = page.getByRole(
            contactUsPageLocators.textFieldCompanyName.role,
            contactUsPageLocators.textFieldCompanyName.text
        );
        this.formLabelJobTitle = page.getByText(
            contactUsPageLocators.formLabelJobTitle.text
        );
        this.textFieldJobTitle = page.getByRole(
            contactUsPageLocators.textFieldJobTitle.role,
            contactUsPageLocators.textFieldJobTitle.text
        );
        this.formLabelTypeOfInquiry = page.getByText(
            contactUsPageLocators.formLabelTypeOfInquiry.text
        );
        this.selectTypeOfInquiry = page.getByRole(
            contactUsPageLocators.selectTypeOfInquiry.role
            // ,
            // contactUsPageLocators.selectTypeOfInquiry.text
        );
         this.formLabelSubject = page.getByText(
            contactUsPageLocators.formLabelSubject.text
        );
        this.textFieldSubject = page.getByRole(
            contactUsPageLocators.textFieldSubject.role,
            contactUsPageLocators.textFieldSubject.text
        );
        this.formLabelMessage = page
            .locator(contactUsPageLocators.formLabelMessage.xpath)
            .locator(contactUsPageLocators.formLabelMessage.xpath2);
        this.textAreaMessage = page.getByRole(
            contactUsPageLocators.textAreaMessage.role,
            contactUsPageLocators.textAreaMessage.text
        );
        this.checkboxPrivacyPolicy = page.getByRole(
            contactUsPageLocators.checkboxPrivacyPolicy.role,
            contactUsPageLocators.checkboxPrivacyPolicy.text
        );
        this.linkPrivacyPolicy = page.getByRole(
            contactUsPageLocators.linkPrivacyPolicy.role,
            contactUsPageLocators.linkPrivacyPolicy.text
        );
        this.sendButton = page.getByRole(
            contactUsPageLocators.sendButton.role,
            contactUsPageLocators.sendButton.text
        );
        this.mesmessageAfterGetInTouch = page.getByText(
            contactUsPageLocators.messageAfterGetInTouch.text
        );
        this.privacyPolicyLink = page
            .locator(contactUsPageLocators.privacyPolicyLink.tagForChain)
            .getByRole(
                contactUsPageLocators.privacyPolicyLink.role,
                contactUsPageLocators.privacyPolicyLink.text
            );
    }

    async verify_header(): Promise<void> {
        await test.step("Verify Section headers", async () => {
            await expect(this.contactUsHeader).toBeVisible();
            await expect(this.contactUsHeader).toHaveText("CONTACT US");
            this.logger.info(`Header Text: ${await this.contactUsHeader.innerText()}`);
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

            await expect(this.formLabelTypeOfInquiry).toBeVisible();
            await this.selectTypeOfInquiry.selectOption(forms.typeOfService);

            await expect(this.formLabelSubject).toBeVisible();
            await this.textFieldSubject.fill(forms.subject);

            await expect(this.formLabelMessage).toBeVisible();
            await this.textAreaMessage.fill(forms.message);

            await this.checkboxPrivacyPolicy.click();
            await this.sendButton.click();

            await this.screenshot.captureStep(this.page, 'Form filled', { fullPage: true });
            this.logger.info("Form submitted");
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
