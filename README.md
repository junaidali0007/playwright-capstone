# Playwright Capstone: SauceDemo Test Automation

![Playwright Tests](https://github.com/junaidali0007/playwright-capstone/actions/workflows/playwright.yml/badge.svg)

End-to-end UI test automation framework built with **Playwright** and **TypeScript**, running on **GitHub Actions**.

**Application under test:** [SauceDemo](https://www.saucedemo.com), a public demo e-commerce site.

## Tech stack
- Playwright Test
- TypeScript
- Node.js
- GitHub Actions (CI)

## What is covered
- Login: valid and locked-out users
- Product listing: filtering product cards by name
- Cart: add a product, verify name, price, and quantity in the cart
- Checkout flow

## Project structure
```
playwright-capstone/
├── tests/                  # test specs
├── playwright.config.ts    # Playwright configuration
├── package.json
└── .github/workflows/      # CI pipeline
```

## Getting started

### Prerequisites
- Node.js (LTS)

### Install
```bash
git clone https://github.com/junaidali0007/playwright-capstone.git
cd playwright-capstone
npm ci
npx playwright install
```

### Run tests
```bash
npx playwright test            # run all tests
npx playwright test --headed   # watch the browser
npx playwright test --ui       # interactive UI mode
npx playwright show-report     # open the HTML report
```

## Continuous integration
Tests run automatically on every push through GitHub Actions. The HTML report is uploaded as a build artifact.

## Roadmap
- [x] Setup and first tests
- [x] Locators, filtering, and cart verification
- [x] CI pipeline
- [x] Hooks, grouping, tags, and `test.step`
- [ ] Page Object Model and fixtures
- [ ] API testing
- [ ] Parallel execution and reporting improvements

## Author
**Junaid Ali**, Senior SQA Analyst
[LinkedIn](https://www.linkedin.com/in/junaid-ali-sqa)
