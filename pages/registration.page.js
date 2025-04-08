export class RegistrationPage {
    constructor(page) {
        this.page = page;
        this.nameInput = page.locator('input[formcontrolname="name"]');
        this.lastNameInput = page.locator('input[formcontrolname="lastName"]');
        this.emailInput = page.locator('input[formcontrolname="email"]');
        this.passwordInput = page.locator('input[formcontrolname="password"]');
        this.reenterPasswordInput = page.locator('input[formcontrolname="repeatPassword"]');
        this.registerButton = page.locator('button[type="submit"]');
    }

    async goto() {
        await this.page.goto('https://qauto.forstudy.space/');
        await this.page.getByText('Sign Up').click();
    }

    async register(user) {
        await this.nameInput.fill(user.name);
        await this.lastNameInput.fill(user.lastName);
        await this.emailInput.fill(user.email);
        await this.passwordInput.fill(user.password);
        await this.reenterPasswordInput.fill(user.repeatPassword);
        await this.registerButton.click();
    }
}
