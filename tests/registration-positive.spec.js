const { test, expect } = require('@playwright/test');
const { RegistrationPage } = require('../pages/registration.page');
const { generateTestEmail } = require('../utils/generateEmail');

test('Positive: Successful registration', async ({ page }) => {
    const registration = new RegistrationPage(page);
    await registration.goto();

    const email = generateTestEmail();
    await registration.register({
        name: 'John',
        lastName: 'Doe',
        email,
        password: 'Test1234',
        repeatPassword: 'Test1234',
    });

    await expect(page).toHaveURL(/garage/);
});
