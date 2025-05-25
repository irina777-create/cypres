const { test, expect } = require('@playwright/test');
const { RegistrationPage } = require('../pages/registration.page');

test.describe('Negative registration tests', () => {
    test('Empty name field', async ({ page }) => {
        const registration = new RegistrationPage(page);
        await registration.goto();

        await registration.register({
            name: '',
            lastName: 'Doe',
            email: 'aqa-emptyname@test.com',
            password: 'Test1234',
            repeatPassword: 'Test1234',
        });

        await expect(page.getByText('Name is required')).toBeVisible();
    });

    test('Invalid email format', async ({ page }) => {
        const registration = new RegistrationPage(page);
        await registration.goto();

        await registration.register({
            name: 'John',
            lastName: 'Doe',
            email: 'aqa-invalidemail.com',
            password: 'Test1234',
            repeatPassword: 'Test1234',
        });

        await expect(page.getByText('Email is incorrect')).toBeVisible();
    });

    test('Short password', async ({ page }) => {
        const registration = new RegistrationPage(page);
        await registration.goto();

        await registration.register({
            name: 'John',
            lastName: 'Doe',
            email: 'aqa-shortpass@test.com',
            password: 'Tes1',
            repeatPassword: 'Tes1',
        });

        await expect(page.getByText(/Password has to be/)).toBeVisible();
    });

    test('Password mismatch', async ({ page }) => {
        const registration = new RegistrationPage(page);
        await registration.goto();

        await registration.register({
            name: 'John',
            lastName: 'Doe',
            email: 'aqa-mismatch@test.com',
            password: 'Test1234',
            repeatPassword: 'Test12345',
        });

        await expect(page.getByText('Passwords do not match')).toBeVisible();
    });

    test('Name with special characters', async ({ page }) => {
        const registration = new RegistrationPage(page);
        await registration.goto();

        await registration.register({
            name: ' Jo#hn ',
            lastName: 'Doe',
            email: 'aqa-invalidname@test.com',
            password: 'Test1234',
            repeatPassword: 'Test1234',
        });

        await expect(page.getByText('Name is invalid')).toBeVisible();
    });
});
