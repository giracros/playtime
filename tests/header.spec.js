import { test, expect } from '@playwright/test';
import { HeaderPage } from '../lib/pages/headerPage';

test.describe('Header Navigation & Functionality', () => {
  let headerPage;

  test.beforeEach(async ({ page }) => {
    headerPage = new HeaderPage(page);
    await headerPage.navigateToHomePage();
  });

  test('should display Menu and redirect to /menu', async ({ page }) => {
    await headerPage.validateHeaderLinkVisible('Menu');
    await headerPage.openMenu();
    await expect(page).toHaveURL(/\/menu/);
    await headerPage.validateHeadingVisible('KFC Menu');
  });

  test('should display Rewards and redirect to /dashboard/enroll if logged out', async ({ page }) => {
    await headerPage.validateHeaderLinkVisible('Rewards');
    await headerPage.openRewards();
    await expect(page).toHaveURL(/\/dashboard\/enroll/);
    await headerPage.validateTextVisible('Earn Points on Purchases');
  });

  test('should display Rewards and redirect to /dashboard if logged in', async ({ page }) => {
    headerPage = new HeaderPage(page);
    await headerPage.navigateToHomePage();
    await headerPage.loginTestUserWithOTP();
    await headerPage.validateHeaderLinkVisible('Rewards');
    await headerPage.openRewards();
    await expect(page).toHaveURL(/\/dashboard/);
    await headerPage.validateTextVisible('testuser');
  });

  test('should display Careers and redirect to /careers', async ({ page }) => {
    await headerPage.validateHeaderLinkVisible('Careers');
    await headerPage.openCareers();
    await expect(page).toHaveURL(/\/careers/);
    await headerPage.validateHeadingVisible('Join Our KFC Family');
  });

  test('should display Gift Cards and prompt with external site prompt', async ({ page }) => {
    await headerPage.validateHeaderLinkVisible('Gift Cards');
    const modal = await headerPage.clickGiftCardsAndHandleModal();
    await modal.getByRole('button', { name: 'Back to KFC.com' }).click();
   
  });

  test('should display Gift Cards and redirect to /gift-cards', async ({ page }) => {
    await headerPage.validateHeaderLinkVisible('Gift Cards');
    const modal = await headerPage.clickGiftCardsAndHandleModal();
    const giftCardPopup = await headerPage.clickGiftCardAndHandlePopup(modal);
    await expect(giftCardPopup.getByRole('heading', { name: 'Save 10% on Gift Cards' })).toBeVisible();
  });

  test('should display Find A KFC and redirect to external locations site', async ({ page, context }) => {
    await headerPage.validateHeaderLinkVisible('Find A KFC');
    const newPage = await headerPage.clickFindAKFCAndHandlePopup(context);
    await expect(newPage).toHaveURL(/https:\/\/locations\.kfc\.com\/search/);
    if (await newPage.getByRole('button', { name: 'Accept' }).isVisible().catch(() => false)) {
      await newPage.getByRole('button', { name: 'Accept' }).click();
    }
    await newPage.getByRole('textbox', { name: /City, State/ }).click();
    await newPage.getByRole('textbox', { name: /City, State/ }).fill('33327');
    await newPage.getByRole('button', { name: /Submit a search/ }).click();
    await expect(newPage.getByText(/locations near/)).toBeVisible();
  });
}); 