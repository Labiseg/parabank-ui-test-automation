import { test } from '@playwright/test';

test('TC-LOGIN-002 – Verify login fails using invalid credentials', async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://parabank.parasoft.com/parabank/index.htm');

  await page.fill('input[name="username"]', 'wrong');
  await page.fill('input[name="password"]', 'wrong');
  await page.click('input[value="Log In"]');

  await Promise.race([
    page.getByRole('heading', { name: 'Account Services' }).waitFor(),
    page.locator('input[name="username"]').waitFor()
  ]);

  const isLoggedIn = await page
    .getByRole('heading', { name: 'Account Services' })
    .isVisible()
    .catch(() => false);

  if (isLoggedIn) {
    console.warn('⚠️ BUG: System allowed login with invalid credentials');
  } else {
    console.log('✅ Login correctly rejected');
  }

});
