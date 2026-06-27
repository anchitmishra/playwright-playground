import { test, expect } from '@playwright/test';
import { ParaBankLoginPage } from '../pages/ParaBankLoginPage';

test('Parabank Home Page Title', async ({ page }) => {
    const parabanLoginPage = new ParaBankLoginPage(page);

    await parabanLoginPage.navigateToParabank();

    const title = await parabanLoginPage.getPageTitle();

    expect(title).toBe('ParaBank | Welcome | Online Banking');
});

test('Navigate to Register Page', async ({ page }) => {
    const parabanLoginPage = new ParaBankLoginPage(page);

    await parabanLoginPage.registerLink.click();

    await parabanLoginPage.bringToFront();

    const title = await parabanLoginPage.getPageTitle();
    // expect(title).toContain('Register');
});

test('Register New User', async ({ page }) => {
    const parabanLoginPage = new ParaBankLoginPage(page);

    await parabanLoginPage.gotoRegister();

    await parabanLoginPage.register({
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        phone: '2125551234',
        ssn: '123456789',
        username: 'johndoe',
        password: 'Password123',
        confirmPassword: 'Password123',
    });
});