import { test, expect } from '@playwright/test';
import { fetchGmailOTP } from '../lib/utils/gmailHelper';
import {LoginPage} from '../lib/pages/loginPage';
import locators from '../lib/locators/loginPage.json' assert { type: "json"};

test.describe('Login feature', () => {
  test('Validate OTP Login flow', async ({page}) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigateToLoginPage()
    await loginPage.loginAsTestUser()
    const otp = await fetchGmailOTP();
    if (otp) {
      await loginPage.enterOTP(otp); 
    } else {
      console.error('Failed to retrieve OTP code');
    }
   await expect(page.locator(locators.signInSignUpButton)).not.toBeVisible();
  })
})
