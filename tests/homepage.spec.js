import { test, expect} from '@playwright/test';
import {LoginPage} from '../lib/pages/loginPage';

test("login", async({page}) => {
 const loginPage = new LoginPage(page)
 await loginPage.navigateToLoginPage()
});