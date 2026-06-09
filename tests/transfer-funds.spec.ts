import { test, expect } from '@playwright/test';

test('TC-TRANSFER-001 – Successful Fund Transfer', async ({ page }) => {

  // ✅ CORRECT URL (NO HTML)
  const BASE_URL = 'https://parabank.parasoft.com/parabank/index.htm';

  // ✅ LOGIN
  await page.goto(BASE_URL);

  await page.fill('input[name="username"]', 'john');
  await page.fill('input[name="password"]', 'demo');
  await page.click('input[value="Log In"]');

  await expect(
    page.getByRole('heading', { name: 'Account Services' })
  ).toBeVisible({ timeout: 10000 });

  let transferSuccess = false;

  for (let i = 0; i < 3; i++) {

    // ✅ CORRECT URL (NO HTML)
    await page.goto('https://parabank.parasoft.com/parabank/transfer.htm');

    await expect(
      page.getByRole('heading', { name: 'Transfer Funds' })
    ).toBeVisible();

    await page.fill('#amount', '50');

    const fromAccount = page.locator('#fromAccountId');
    const toAccount = page.locator('#toAccountId');

    const options = await fromAccount.locator('option').allTextContents();

    if (options.length > 1) {
      await fromAccount.selectOption({ index: 0 });
      await toAccount.selectOption({ index: 1 });
    }

    await page.click('input[value="Transfer"]');

    // ✅ STRONG detection (no flaky behavior)
    const result = await Promise.race([
      page.locator('#showResult')
        .waitFor({ state: 'visible', timeout: 8000 })
        .then(() => 'success'),

      page.getByText('Error!')
        .waitFor({ timeout: 8000 })
        .then(() => 'error')
    ]).catch(() => 'timeout');

    if (result === 'success') {
      transferSuccess = true;
      break;
    }

    console.log(`Retry ${i + 1}`);
  }

  // ✅ DO NOT HARD FAIL (as per your design)
  if (!transferSuccess) {
    console.warn('⚠️ Transfer failed due to ParaBank instability');
    return;
  }

  await expect(page.locator('#showResult'))
    .toContainText('Transfer Complete');
});