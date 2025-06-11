import { BasePage } from './basePage';
import locators from '../locators/loginPage.json' assert { type: "json"}
import { expect} from '@playwright/test';
import { assert } from 'console';

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
    }

    async navigateToLoginPage() {
        await this.page.goto('/login');
        await this.dismissCookieBanner();
    }

    async loginAsTestUser() {
        await this.fillText(locators.emailTextBox, 'kfctestuserautomation001@gmail.com');
        await this.clickOnElement(locators.signInSignUpButton);
        await this.page.waitForTimeout(10000); // wait for email to be received
    }

    async enterOTP(otp) {
        if (!otp || otp.length !== 6) {
            console.error('Invalid OTP format:', otp);
            return;
        }

        const digits = otp.split('');
        console.log('Entering OTP:', otp);

        for (let i = 0; i < digits.length; i++) {
            const inputLocator = this.page.locator(`(//div[contains(@class, "ConfirmOTPModal") or contains(@class, "ConfirmCode")]//input)[${i + 1}]`);
            await inputLocator.waitFor({ state: 'visible', timeout: 5000 });
            await inputLocator.click(); // Ensure focus on the input
            await inputLocator.press(digits[i]); // Simulates actual keypress
            await this.page.waitForTimeout(200); // Optional delay
        }     
    }
}