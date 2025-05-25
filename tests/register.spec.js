const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../pages/registerPage');
const { generateValidUser } = require('../utils/generateUser');

test.describe('User Registration', () => {

    test('Positive: successful registration', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        await registerPage.goto();
        const user = generateValidUser();
        await registerPage.register(user);
        await expect(page).toHaveURL(/garage/);
    });

    test('Negative: empty required fields', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        await registerPage.goto();
        await registerPage.register({ name: '', lastName: '', email: '', password: '', repeatPassword: '' });

        const errors = await registerPage.getErrors();
        expect(errors).toContain('Name is required');
        expect(errors).toContain('Last name is required');
        expect(errors).toContain('Email required');
        expect(errors).toContain('Password required');
        expect(errors).toContain('Re-enter password required');
    });

    test('Negative: invalid email format', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        await registerPage.goto();
        const user = generateValidUser();
        user.email = 'invalidemail';
        await registerPage.register(user);

        const errors = await registerPage.getErrors();
        expect(errors).toContain('Email is incorrect');
    });

    test('Negative: passwords do not match', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        await registerPage.goto();
        const user = generateValidUser();
        user.repeatPassword = 'WrongPass123';
        await registerPage.register(user);

        const errors = await registerPage.getErrors();
        expect(errors).toContain('Passwords do not match');
    });

    test('Negative: weak password', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        await registerPage.goto();
        const user = generateValidUser();
        user.password = 'abc';
        user.repeatPassword = 'abc';
        await registerPage.register(user);

        const errors = await registerPage.getErrors();
        expect(errors[0]).toContain('Password has to be from 8 to 15 characters long');
    });

    test('Negative: too short name', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        await registerPage.goto();
        const user = generateValidUser();
        user.name = 'A';
        await registerPage.register(user);

        const errors = await registerPage.getErrors();
        expect(errors).toContain('Name has to be from 2 to 20 characters long');
    });

});
