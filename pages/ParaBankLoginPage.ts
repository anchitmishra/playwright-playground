import { type Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ParaBankLoginPage extends BasePage {
  // Navigation link (already exists - kept)
  readonly registerLink = this.page.getByRole('link', { name: 'Register' });
  
  // Form fields
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly phoneInput: Locator;
  readonly ssnInput: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;

  // Actions
  readonly registerButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Form fields
    this.firstNameInput = page.getByLabel('First Name:');
    this.lastNameInput = page.getByLabel('Last Name:');
    this.addressInput = page.getByLabel('Address:');
    this.cityInput = page.getByLabel('City:');
    this.stateInput = page.getByLabel('State:');
    this.zipCodeInput = page.getByLabel('Zip Code:');
    this.phoneInput = page.getByLabel('Phone #:');
    this.ssnInput = page.getByLabel('SSN:');
    this.usernameInput = page.getByLabel('Username:');
    this.passwordInput = page.getByLabel('Password:');
    this.confirmPasswordInput = page.getByLabel('Confirm:');

    // Actions
    this.registerButton = page.getByRole('button', { name: 'Register' });
  }

  // ── Navigation ──────────────────────────────────────────────────────────────

  async navigateToParabank() {
    await this.navigate('/index.htm');
  }

  async gotoRegister() {
    await this.navigate('/register.htm');
  }

  // ── Info Retrieval ───────────────────────────────────────────────────────────

  async getPageTitle() {
    return await this.page.title();
  }

  // ── Actions ──────────────────────────────────────────────────────────────────

  async fillPersonalInfo({
    firstName,
    lastName,
    address,
    city,
    state,
    zipCode,
    phone,
    ssn,
  }: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    ssn: string;
  }) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.addressInput.fill(address);
    await this.cityInput.fill(city);
    await this.stateInput.fill(state);
    await this.zipCodeInput.fill(zipCode);
    await this.phoneInput.fill(phone);
    await this.ssnInput.fill(ssn);
  }

  async fillCredentials({
    username,
    password,
    confirmPassword,
  }: {
    username: string;
    password: string;
    confirmPassword: string;
  }) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  async register({
    firstName,
    lastName,
    address,
    city,
    state,
    zipCode,
    phone,
    ssn,
    username,
    password,
    confirmPassword,
  }: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    ssn: string;
    username: string;
    password: string;
    confirmPassword: string;
  }) {
    await this.fillPersonalInfo({ firstName, lastName, address, city, state, zipCode, phone, ssn });
    await this.fillCredentials({ username, password, confirmPassword });
    await this.registerButton.click();
  }
}
