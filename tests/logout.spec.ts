import { test, expect } from '@playwright/test';

// ✅ TC-LOGOUT-001
test('TC-LOGOUT-001 – Logout', async ({ page }) => {

  await page.goto('https://parabank.parasoft.com/parabank/index.htm');

  await page.fill('input[name="username"]', 'john');
  await page.fill('input[name="password"]', 'demo');

  await page.click('input[value="Log In"]');

  // Step 1: Logout
  await page.getByRole('link', { name: 'Log Out' }).click();

  // Expected
  await expect(page).toHaveURL(/index\.htm/);
});
``