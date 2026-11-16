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
- Login: valid user, locked-out user, wrong password, empty username
- Inventory: sorting by price and name
- Cart: add, verify, and remove products
- Checkout: full purchase and form validation errors
- Logout
- add: Login once with a saved session (storage state)
- API: GET (single, list, query params), POST, PUT, DELETE, and a 404 case against JSONPlaceholder

## Project structure
```
playwright-capstone/
├── .github/
│   └── workflows/
│       └── playwright.yml      # CI pipeline (GitHub Actions)
├── fixtures/
│   └── pages.ts                # custom fixtures: loginPage, inventoryPage, cartPage, checkoutPage
├── pages/                      # Page Object Model classes
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/
│   ├── auth.setup.ts           # logs in once and saves the session
│   ├── login.spec.ts           # login: valid, locked out, wrong password, empty fields
│   ├── inventory.spec.ts       # product list and sorting
│   ├── cart.spec.ts            # add, verify, and remove products
│   ├── checkout.spec.ts        # full purchase and form validation
│   └── logout.spec.ts          # logout
│   ├── api/
│   │   └── posts.api.spec.ts   # API tests: GET, POST, PUT, DELETE, 404
├── playwright.config.ts        # Playwright configuration (setup + Edge projects)
├── package.json
└── README.md
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
- [x] Debugging with screenshots, video, and traces
- [x] Page Object Model
- [x] Fixtures
- [x] API testing
- [ ] Parallel execution and reporting improvements

## Author
**Junaid Ali**, Senior SQA Analyst
[LinkedIn](https://www.linkedin.com/in/junaid-ali-sqa)
