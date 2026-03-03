import { test, expect } from "main/utils/base.fixture";
import { qase } from 'playwright-qase-reporter';

const formData = {
  name: "ronel",
  emailAddress: "test@testing.com",
  contactNumber: "09876543211",
  companyName: "stratpoint technologies",
  jobTitle: "QA",
  service: "Quality Assurance",
  message: "this is a ultra long message",
};

test.describe.configure({ mode: 'serial' });
test.describe("Home Page test suite", {
  annotation: { type: 'category', description: 'report' },
}, () => {

  test.beforeEach(async ({ pm }) => {
    await pm.navbar.navigate();
    await pm.navbar.navbar_link("home");
    await pm.privacyCookie.handleCookieModal();
  });

  test(qase(1, "Verify section headers @regression"), async ({ pm }) => {
    await test.step('navigate to home', async () => {
      await pm.navbar.navigate();
      await pm.navbar.navbar_link("home");
    });
    await test.step('verify header', async () => {
      await pm.home.verify_header();
    });
    await test.step('click privacy policy page', async () => {
      await pm.home.privacy_policy_page();
    });
    await test.step('fill lets connect form', async () => {
      await pm.home.fill_lets_connect_form(formData);
    });
  });

  test(qase(2, "Verify section headers Smoke"), { tag: '@smoke' }, async ({ pm }) => {
    await test.step('navigate to home', async () => {
      await pm.navbar.navigate();
      await pm.navbar.navbar_link("home");
    });
    await test.step('verify header', async () => {
      await pm.home.verify_header();
    });
    await test.step('click privacy policy page', async () => {
      await pm.home.privacy_policy_page();
    });
    await test.step('fill lets connect form', async () => {
      await pm.home.fill_lets_connect_form(formData);
    });
  });
});
