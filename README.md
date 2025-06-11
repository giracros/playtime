# Playtime

This project contains end-to-end tests written with [Playwright](https://playwright.dev/). The tests automate the KFC web site and demonstrate a Page Object Model approach.

## Requirements

- Node.js 18 or newer
- npm

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file (optional) to set environment variables used by the tests. The most important variable is `BASE_URL` which defines the base address for the site under test:

```bash
BASE_URL=https://www.kfc.com
```

If you plan to run the OTP login flow you will also need Google API credentials. See `lib/utils/gmailHelper.js` for the fields that can be configured via environment variables.

## Running tests

Execute all tests using Playwright:

```bash
npm run e2e
```

Test reports are written to `playwright-report/` and `test-results/` which are ignored by Git.

## Repository structure

```
lib/            Page objects and shared utilities
lib/locators/   JSON files with selectors used by the page objects
lib/pages/      JavaScript classes representing pages
lib/utils/      Helper modules (e.g. Gmail OTP fetcher)
tests/          Playwright test suites
```

The `tests-examples` folder contains the default sample test provided by Playwright.

## License

This project is licensed under the terms of the `LICENSE` file in this repository.
