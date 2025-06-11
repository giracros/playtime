import { test, expect } from '@playwright/test';
import { FooterPage } from '../lib/pages/footerPage';

test.describe('Test Suite: Footer Validations', () => {
  let footerPage;

  test.beforeEach(async ({ page }) => {
    footerPage = new FooterPage(page);
    await footerPage.navigateToFooterPage();
  });

  test('should display Privacy Center', async () => {
    await footerPage.validateFooterLinkVisible('Privacy Center');
    const popup = await footerPage.openPrivacyCenter();
    await footerPage.validatePrivacyCenter(popup);
  });

  test('should display Terms Of Use', async () => {
    await footerPage.validateFooterLinkVisible('Terms of Use');
    const popup = await footerPage.openTermsOfUse();
    await footerPage.acceptTermsPopup(popup);
    await footerPage.validateTermsOfUse(popup);
  });

  test('should display Our Cookies and Ads', async () => {
    await footerPage.validateFooterLinkVisible('Our Cookies and Ads');
    const popup = await footerPage.openCookiesAndAds();
    await footerPage.validateCookiesAndAds(popup);
  });

  test('should display Accessibility Statement', async () => {
    await footerPage.validateFooterLinkVisible('Accessibility Statement');
    const popup = await footerPage.openAccessibilityStatement();
    await footerPage.validateAccessibilityStatement(popup);
  });

  test('should display KFC Rewards Terms', async () => {
    await footerPage.validateFooterLinkVisible('KFC Rewards Terms');
    const popup = await footerPage.openKfcRewardsTerms();
    await footerPage.validateKfcRewardsTerms(popup);
  });

  test('should display FAQ', async () => {
    await footerPage.validateFooterLinkVisible('FAQ');
    const popup = await footerPage.openFaq();
    await footerPage.validateFaq(popup);
  });
});

