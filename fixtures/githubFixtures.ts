import { test as base } from '@playwright/test';
import { GitHubLoginPage } from '../pages/GitHubLoginPage';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type GitHubFixtures = {
  /** A fresh GitHubLoginPage instance, already navigated to /login */
  githubLoginPage: GitHubLoginPage;

  /** A GitHubLoginPage where login() has already been called with env credentials */
  authenticatedPage: GitHubLoginPage;
};

// ---------------------------------------------------------------------------
// Extended test object
// ---------------------------------------------------------------------------

export const test = base.extend<GitHubFixtures>({
  /**
   * Provides a GitHubLoginPage navigated to the login URL.
   * Use this when you want to control the login step yourself.
   */
  githubLoginPage: async ({ page }, use) => {
    const loginPage = new GitHubLoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  /**
   * Provides a GitHubLoginPage that is already logged in.
   * Credentials are read from environment variables:
   *   GITHUB_USERNAME
   *   GITHUB_PASSWORD
   *
   * Set them in a .env file and load via dotenv, or pass them directly
   * in your CI environment.
   */
  authenticatedPage: async ({ page }, use) => {
    const username = process.env.GITHUB_USERNAME;
    const password = process.env.GITHUB_PASSWORD;

    if (!username || !password) {
      throw new Error(
        'Missing credentials: set GITHUB_USERNAME and GITHUB_PASSWORD env vars.'
      );
    }

    const loginPage = new GitHubLoginPage(page);
    await loginPage.goto();
    await loginPage.login(username, password);

    await use(loginPage);
  },
});

export { expect } from '@playwright/test';
