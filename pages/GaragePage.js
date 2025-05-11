class GaragePage {
    constructor(page) {
        this.page = page;
        this.title = page.locator('h1');
    }

    async getTitleText() {
        return this.title.textContent();
    }

    async isLoaded() {
        await this.title.waitFor({ state: 'visible' });
    }
}

module.exports = { GaragePage };
