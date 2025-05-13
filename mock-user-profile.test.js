
import { test, expect } from '@playwright/test';

test('Підміна профілю користувача через route.fulfill', async ({ page }) => {
    await page.route('**/api/users/profile', async route => {
        const fakeProfileResponse = {
            data: {
                firstName: 'QA',
                lastName: 'Tester'
            }
        };

        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(fakeProfileResponse)
        });
    });

    // Перехід на сторінку профілю
    await page.goto('https://qauto.forstudy.space/profile');

    // Очікуємо, що на сторінці зʼявиться підмінене імʼя
    await expect(page.locator('text=QA Tester')).toBeVisible();
});
