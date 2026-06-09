import { test, expect } from '@playwright/test';

// ✅ TC-REG-001
test('TC-REG-001 – Register new user', async ({ page }) => {

  await page.goto('https://parabank.parasoft.com/parabank/register.htm');

  await page.fill('[name="customer.firstName"]', 'Mark');
  await page.fill('[name="customer.lastName"]', 'Labiseg');
  await page.fill('[name="customer.address.street"]', 'Quezon City');
  await page.fill('[name="customer.address.city"]', 'Quezon City');
  await page.fill('[name="customer.address.state"]', 'NCR');
  await page.fill('[name="customer.address.zipCode"]', '1101');
  await page.fill('[name="customer.phoneNumber"]', '09123456789');
  await page.fill('[name="customer.ssn"]', '123456789');

  const username = `user_${Date.now()}`;

  await page.fill('[name="customer.username"]', username);
  await page.fill('[name="customer.password"]', 'Password123');
  await page.fill('[name="repeatedPassword"]', 'Password123');

  await page.click('input[value="Register"]');

  await expect(page.locator('#rightPanel')).toContainText('Welcome');
});
