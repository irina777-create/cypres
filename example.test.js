const { test, expect } = require('./fixtures/userGaragePageFixture');

test('Garage page should show the title', async ({ userGaragePage }) => {
    const title = await userGaragePage.getTitleText();
    expect(title).toContain('Garage');
});
