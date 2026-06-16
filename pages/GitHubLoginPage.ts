import { type Page, type Locator } from '@playwright/test';

export class GitHubLoginPage {
  readonly page: Page;

  // Locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly userAvatar: Locator;
  readonly errorBanner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel('Username or email address');
    this.passwordInput = page.getByLabel('Password');
    this.signInButton = page.getByRole('button', { name: 'Sign in', exact: true });
    this.userAvatar = page.locator('img.avatar.avatar-user');
    this.errorBanner = page.locator('.flash-error');
  }

  /** Navigate to the GitHub login page */
  async goto(): Promise<void> {
    await this.page.goto('https://github.com/login');
  }

  /** Fill in credentials and submit the login form */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  /** Returns true when the user avatar is visible (successful login) */
  async isLoggedIn(): Promise<boolean> {
    try {
      await this.userAvatar.waitFor({ state: 'visible', timeout: 5_000 });
      return true;
    } catch {
      return false;
    }
  }

  /** Returns the error message text if login failed, otherwise null */
  async getErrorMessage(): Promise<string | null> {
    const visible = await this.errorBanner.isVisible();
    return visible ? this.errorBanner.innerText() : null;
  }
}
