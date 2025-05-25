const { chromium } = require('@playwright/test');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto('https://qauto.forstudy.space/');
    await page.click('text=Sign In');
    await page.fill('input[formcontrolname="email"]', 'aqa_user@example.com');
    await page.fill('input[formcontrolname="password"]', 'password123');
    await page.click('button[type="submit"]');

    await page.waitForURL('**/panel/garage');

    await page.context().storageState({ path: 'storageState.json' });
    await browser.close();
})();
