import { test } from '@playwright/test';

test('Login to Parabank', async ({ page }) => {
    
await page.goto('https://parabank.parasoft.com/parabank/index.htm');

const title = await page.title();

console.log('Page Title:', title);

});