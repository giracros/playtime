# Project Overview

This document provides a quick reference for the important pieces of the Playtime test suite.

## Playwright configuration

The test runner is configured in `playwright.config.js`. Tests run in Chromium with video capture enabled. The `BASE_URL` environment variable controls the base address for page navigation.

## Page objects

The `lib/pages/` directory contains classes that represent sections of the KFC web site. Each page uses locators defined in `lib/locators/` to interact with the UI. Common functionality lives in `lib/pages/basePage.js`.

## Gmail OTP helper

`lib/utils/gmailHelper.js` fetches a one-time password from Gmail using Google OAuth credentials. When running locally, ensure the required OAuth values are supplied, either by editing the file or providing environment variables.

## Adding tests

Create new test files under `tests/` using the Playwright API. Page objects can be imported from `lib/pages`. For examples, see `tests/header.spec.js` and `tests/footer.spec.js`.

