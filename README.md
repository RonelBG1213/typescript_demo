# DemoTSFramework

A **Playwright + TypeScript** end-to-end test automation framework using the **Page Object Model (POM)** with a lazy-load **PageManager fixture**, custom screenshot helper, Docker support, and GitLab CI/CD.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
  - [Local Execution](#local-execution)
  - [Docker Execution](#docker-execution)
- [Custom Fixtures](#custom-fixtures)
- [Screenshot Helper](#screenshot-helper)
- [Adding a New Page Object](#adding-a-new-page-object)
- [GitLab CI/CD](#gitlab-cicd)
- [Useful Commands](#useful-commands)

---

## Project Structure

```
DemoTSFramework/
├── .dockerignore
├── .env                        # Environment variables (BASE_URL, etc.)
├── .gitignore
├── .gitlab-ci.yml              # GitLab CI/CD pipeline (4 stages)
├── Dockerfile                  # Playwright Docker image
├── docker-compose.yml          # One-command container test run
├── package.json
├── package-lock.json
├── playwright.config.ts        # Playwright configuration
├── tsconfig.json
├── README.md
├── main/
│   ├── functions/              # Page Object classes
│   │   ├── contactUsPageMethods.ts
│   │   ├── homePageMethods.ts
│   │   ├── navigationMethods.ts
│   │   └── modals/
│   │       └── privacyPolicyCookie.ts
│   ├── locators/               # Element locator definitions
│   │   ├── contactUsLocators.ts
│   │   ├── homePageLocators.ts
│   │   └── navigationLocators.ts
│   └── utils/
│       ├── base.fixture.ts     # Custom Playwright fixtures (pm, pmWithCookies, capture)
│       ├── logger.ts           # Timestamped logger with file output
│       ├── page.manager.ts     # Lazy-load PageManager
│       └── screenshot.ts       # Screenshot helper (step, element, before/after)
└── tests/                      # Spec files
    ├── contactus.spec.ts
    └── homepagetest.spec.ts
```

---

## Prerequisites

| Tool        | Minimum Version | Notes                          |
| ----------- | --------------- | ------------------------------ |
| **Node.js** | 18+             | LTS recommended                |
| **npm**     | 9+              | Ships with Node.js             |
| **Docker**  | 20+             | Only needed for container runs |

---

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd DemoTSFramework
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install --with-deps
```

### 4. Set up environment variables

```bash
cp .env.example .env
# Edit .env to set BASE_URL if needed (defaults to https://stratpoint.com/)
```

### 5. Verify the setup

```bash
npx playwright test --list
```

---

## Running Tests

### Local Execution

```bash
# Run all tests
npm test

# Run only smoke-tagged tests
npm run test:smoke

# Run tests in headed mode (browser visible)
npm run test:headed

# Debug tests with the Playwright Inspector
npm run test:debug

# Open the last HTML report
npm run report
```

### Docker Execution

```bash
# Build the image
docker build -t pw-tests .

# Run smoke tests via Docker Compose
docker compose up --build

# Run chromium-only tests
docker compose run tests-chromium

# Run and exit when done
docker compose up --build --abort-on-container-exit
```

Docker volume mounts:

| Container Path           | Host Path            | Contents           |
| ------------------------ | -------------------- | ------------------ |
| `/app/test-results`      | `./test-results`     | Traces, screenshots |
| `/app/playwright-report` | `./playwright-report`| HTML report         |

---

## Custom Fixtures

Import the custom `test` and `expect` from `main/utils/base.fixture` (not `@playwright/test`).

### Available fixtures

| Fixture         | Description                                                    |
| --------------- | -------------------------------------------------------------- |
| `pm`            | Bare PageManager — you handle navigation & cookies             |
| `pmWithCookies` | Pre-navigated to `/` with cookie modal accepted                |
| `capture`       | Standalone ScreenshotHelper for ad-hoc captures                |

### Usage

```typescript
import { test, expect } from "main/utils/base.fixture";

test("example test", async ({ pm }) => {
  await pm.navbar.navigate();
  await pm.navbar.navbar_link("home");
  await pm.privacyCookie.handleCookieModal();
  await pm.home.verify_header();
  await pm.contactUs.verify_header();
});
```

### Page objects on `pm`

| Property           | Class                 | Lazy |
| ------------------ | --------------------- | ---- |
| `pm.home`          | `homePage`            | Yes  |
| `pm.contactUs`     | `contactUsPage`       | Yes  |
| `pm.navbar`        | `navbarPage`          | Yes  |
| `pm.privacyCookie` | `privacyPolicyCookie` | Yes  |
| `pm.screenshot`    | `ScreenshotHelper`    | No   |

---

## Screenshot Helper

A shared `ScreenshotHelper` instance is available via `pm.screenshot` or the `capture` fixture. All screenshots are saved to `test-results/screenshots/<testName>/` and attached to the HTML report.

| Method                                        | Description                              |
| --------------------------------------------- | ---------------------------------------- |
| `captureStep(page, name, opts?)`              | Page screenshot (viewport/full-page/clip)|
| `captureElement(locator, name, opts?)`        | Screenshot a specific element            |
| `captureBeforeAfter(page, label, action, opts?)` | Capture before & after an action      |
| `captureIf(page, condition, name, opts?)`     | Conditional capture                      |

```typescript
// Via PageManager
await pm.screenshot.captureStep(pm.home.page, 'After login', { fullPage: true });

// Via standalone fixture
test("standalone", async ({ page, capture }) => {
  await page.goto('/');
  await capture.captureStep(page, 'Landing', { fullPage: true });
});
```

---

## Adding a New Page Object

1. **Create the locator file** in `main/locators/` (e.g., `aboutPageLocators.ts`).
2. **Create the page class** in `main/functions/` (e.g., `aboutPageMethods.ts`).
3. **Register it in the PageManager** — open `main/utils/page.manager.ts` and:
   - Import the new page class.
   - Add a private cached field (`private _aboutPage?: aboutPage;`).
   - Add a lazy getter.
4. **Use it in tests** via `pm.about`.

---

## GitLab CI/CD

The `.gitlab-ci.yml` pipeline uses the project Dockerfile and has four stages:

| Stage            | Job               | Trigger   | Description                                         |
| ---------------- | ----------------- | --------- | --------------------------------------------------- |
| **docker-build** | `docker-build`    | Auto      | Builds Dockerfile, pushes to GitLab Container Registry |
| **build**        | `build`           | Auto      | Installs dependencies (`npm ci`)                    |
| **test**         | `test:all`        | Auto      | Runs the full test suite                            |
| **test**         | `test:smoke`      | Auto      | Runs only `@smoke`-tagged tests                     |
| **test**         | `test:regression` | **Manual**| Runs full regression suite (play button in GitLab)  |
| **deploy**       | `deploy:report`   | Auto      | Publishes HTML report to GitLab Pages               |

Pipeline triggers on **merge requests** and **pushes to the default branch**.

---

## Useful Commands

| Command                                  | Description                           |
| ---------------------------------------- | ------------------------------------- |
| `npm test`                               | Run all tests                         |
| `npm run test:smoke`                     | Run smoke tests                       |
| `npm run test:headed`                    | Run tests with browser UI             |
| `npm run test:debug`                     | Launch Playwright Inspector           |
| `npm run report`                         | Open the HTML report                  |
| `npx playwright test --grep @smoke`      | Run tests matching a tag              |
| `npx playwright test --project=chromium` | Run on a specific browser project     |
| `npx playwright test --workers=4`        | Override worker count                 |
| `npx playwright codegen <url>`           | Record actions and generate test code |
| `docker build -t pw-tests .`             | Build the Docker image                |
| `docker compose up --build`              | Run tests inside Docker               |

---

