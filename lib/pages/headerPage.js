import { BasePage } from './basePage';
import locators from '../locators/headerPage.json' assert { type: "json" };
import { LoginPage } from './loginPage';
import { fetchGmailOTP } from '../utils/gmailHelper';

export class HeaderPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async navigateToHomePage() {
    await this.page.goto('/');
    await this.dismissCookieBanner();
  }

  get menuLink() {
    return this.page.locator(locators.menuLink);
  }
  get rewardsLink() {
    return this.page.locator(locators.rewardsLink);
  }
  get careersLink() {
    return this.page.locator(locators.careersLink);
  }
  get giftCardsLink() {
    return this.page.locator(locators.giftCardsLink);
  }
  get findAKFCLink() {
    return this.page.locator(locators.findAKFCLink);
  }

  get linkMap() {
    return {
      'Menu': this.menuLink,
      'Rewards': this.rewardsLink,
      'Careers': this.careersLink,
      'Gift Cards': this.giftCardsLink,
      'Find A KFC': this.findAKFCLink
    };
  }

  async openMenu() {
    await this.clickOnElement(this.menuLink);
  }
  async openRewards() {
    await this.clickOnElement(this.rewardsLink);
  }
  async openCareers() {
    await this.clickOnElement(this.careersLink);
  }
  async openGiftCards() {
    await this.clickOnElement(this.giftCardsLink);
    await this.page.waitForTimeout(2000);
  }
  async openFindAKFC() {
    await this.clickOnElement(this.findAKFCLink);
  }

  async validateHeaderLinkVisible(linkName) {
    await this.validateLinkVisible(this.linkMap, linkName);
  }

  async validateModalHeading(headingText) {
    await this.validateModalHeading(headingText);
  }

  async clickGiftCardsAndHandleModal() {
    await this.openGiftCards();
    const modal = this.page.locator('[role="dialog"], .modal, .external-site-prompt');
    await modal.getByRole('heading', { name: 'You are about to leave kfc.com' }).waitFor({ state: 'visible', timeout: 5000 });
    return modal;
  }

  async clickFindAKFCAndHandlePopup(context) {
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      this.openFindAKFC()
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }

  async clickGiftCardAndHandlePopup(modal) {
    return await this.openPopup(modal.getByRole('button', { name: /continue/i }));
  }

  async loginTestUserWithOTP() {
    const loginPage = new LoginPage(this.page);
    await loginPage.navigateToLoginPage();
    await loginPage.loginAsTestUser();
    const otp = await fetchGmailOTP();
    if (otp) {
      await loginPage.enterOTP(otp);
    } else {
      throw new Error('Failed to retrieve OTP code');
    }
  }
} 