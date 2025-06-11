import { BasePage } from './basePage';
import locators from '../locators/footerPage.json' assert { type: "json" };
import { expect } from '@playwright/test';

export class FooterPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async navigateToFooterPage() {
    await this.page.goto('/');
    await this.dismissCookieBanner();
  }

  get privacyCenterLink() {
    return this.page.locator(locators.privacyCenterLink);
  }
  get termsOfUseLink() {
    return this.page.locator(locators.termsOfUseLink);
  }
  get cookiesAndAdsLink() {
    return this.page.locator(locators.cookiesAndAdsLink);
  }
  get accessibilityStatementLink() {
    return this.page.locator(locators.accessibilityStatementLink);
  }
  get kfcRewardsTermsLink() {
    return this.page.locator(locators.kfcRewardsTermsLink);
  }
  get faqLink() {
    return this.page.locator(locators.faqLink);
  }
  get contentInfo() {
    return this.page.locator(locators.contentInfo);
  }

  get linkMap() {
    return {
      'Privacy Center': this.privacyCenterLink,
      'Terms of Use': this.termsOfUseLink,
      'Our Cookies and Ads': this.cookiesAndAdsLink,
      'Accessibility Statement': this.accessibilityStatementLink,
      'KFC Rewards Terms': this.kfcRewardsTermsLink,
      'FAQ': this.faqLink
    };
  }

  async openPrivacyCenter() {
    return await this.openPopup(this.privacyCenterLink);
  }

  async validatePrivacyCenter(popup) {
    await this.validateHeadingVisible('KFC US - Privacy Center');
  }

  async openTermsOfUse() {
    return await this.openPopup(this.termsOfUseLink);
  }

  async acceptTermsPopup(popup) {
    await popup.getByRole('button', { name: 'Accept' }).click();
  }

  async validateTermsOfUse(popup) {
    await expect(popup.locator('#main')).toContainText('KFC TERMS OF USE');
  }

  async openCookiesAndAds() {
    return await this.openPopup(this.cookiesAndAdsLink);
  }

  async validateCookiesAndAds(popup) {
    await expect(popup.locator('#we-use-tracking-technologies')).toContainText('WE USE TRACKING TECHNOLOGIES');
  }

  async openAccessibilityStatement() {
    return await this.openPopup(this.accessibilityStatementLink);
  }

  async validateAccessibilityStatement(popup) {
    await expect(popup.locator('#main')).toContainText('Accessibility Statement');
  }

  async openKfcRewardsTerms() {
    return await this.openPopup(this.kfcRewardsTermsLink);
  }

  async validateKfcRewardsTerms(popup) {
    await expect(popup.locator('#main')).toContainText('KFC REWARDS TERMS AND CONDITIONS');
  }

  async openFaq() {
    return await this.openPopup(this.faqLink);
  }

  async validateFaq(popup) {
    await expect(popup.locator('#main')).toContainText('How Can We Help?');
  }

  async validateFooterLinkVisible(linkName) {
    await this.validateLinkVisible(this.linkMap, linkName);
  }
} 