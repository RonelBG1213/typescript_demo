import { test, expect } from "main/utils/base.fixture";

const formData = {
  name: "ronel",
  emailAddress: "test@testing.com",
  contactNumber: "09876543211",
  companyName: "stratpoint technologies",
  jobTitle: "QA",
  typeOfService: "Feedback",
  subject: "Feedback subject",
  message: "this is a ultra long message",
};

test.describe("Contact Us Page test suite", () => {

  test.beforeEach(async ({ pm }) => {
    await pm.navbar.navigate();
    await pm.navbar.navbar_link("contactus");
    await pm.privacyCookie.handleCookieModal();
  });

  test("@smoke demo tag Smoke", async ({ pm }) => {
    await pm.contactUs.verify_header();
    await pm.contactUs.privacy_policy_page();
    await pm.contactUs.fill_lets_connect_form(formData);
  });
});
