exports.RegisterPage = class RegisterPage {
    constructor(page) {
        this.page = page;
        this.nameInput = page.locator('input[formcontrolname="name"]');
        this.lastNameInput = page.locator('input[formcontrolname="lastName"]');
        this.emailInput = page.locator('input[formcontrolname="email"]');
        this.passwordInput = page.locator('input[formcontrolname="password"]');
        this.repeatPasswordInput = page.locator('input[formcontrolname="repeatPassword"]');
        this.registerButton = page.locator('button[type="submit"]');
        this.errorMessages = page.locator('.invalid-feedback');
    }

    async goto() {
        await this.page.goto('https://qauto.forstudy.space/');
        await this.page.locator('button:has-text("Sign up")').click();
    }

    async fillRegistrationForm(user) {
        await this.nameInput.fill(user.name);
        await this.lastNameInput.fill(user.lastName);
        await this.emailInput.fill(user.email);
        await this.passwordInput.fill(user.password);
        await this.repeatPasswordInput.fill(user.repeatPassword);
    }

    async submit() {
        await this.registerButton.click();
    }

    async register(user) {
        await this.fillRegistrationForm(user);
        await this.submit();
    }

    async getErrors() {
        return await this.errorMessages.allTextContents();
    }
};
