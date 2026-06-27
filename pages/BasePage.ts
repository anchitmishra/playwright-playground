import { Page } from '@playwright/test';

export class BasePage {
  baseUrl = process.env.PARABANK_URL || 'https://parabank.parasoft.com/parabank/index.htm';

  constructor(protected page: Page) {}

  async navigate(path: string) {
    await this.page.goto(this.baseUrl + path);
  }

  // ── Utility Methods ──────────────────────────────────────────────────────────

  async bringToFront() {
    await this.page.bringToFront();
  }

  async pause() {
    await this.page.pause();
  }

  async waitForTimeout(ms: number) {
    await this.page.waitForTimeout(ms);
  }

  async screenshot(name: string) {
    await this.page.screenshot({ path: name });
  }
}
