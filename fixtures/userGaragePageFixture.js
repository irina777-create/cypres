const base = require('@playwright/test');
const { GaragePage } = require('../pages/GaragePage');

exports.test = base.test.extend({
    userGaragePage: async ({ browser }, use) => {
        const context = await browser.newContext({
            storageState: 'storageState.json',
        });
        const page = await context.newPage();
        const garagePage = new GaragePage(page);
        await page.goto('https://qauto.forstudy.space/panel/garage');
        await garagePage.isLoaded();
        await use(garagePage);
        await context.close();
    },
});
