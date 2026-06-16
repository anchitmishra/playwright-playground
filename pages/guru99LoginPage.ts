import { type Page, type Locator } from '@playwright/test';

export class Guru99LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input#email');
    this.passwordInput = page.locator('input#passwd');
    this.loginButton = page.locator('button#SubmitLogin');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.demo.guru99.com/test/login.html');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await Promise.all([
      this.page.waitForURL('**/success.html', { timeout: 10_000 }),
      this.loginButton.click(),
    ]);
  }

  async isOnLoginPage(): Promise<boolean> {
    return this.page.url().includes('/test/login.html');
  }
}
