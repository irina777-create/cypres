describe('User Registration', () => {
    beforeEach(() => {
        cy.visit('https://qauto.forstudy.space/', {
            auth: {
                username: 'guest',
                password: 'welcome2auto'
            }
        });
    });

    it('Should register a new user with valid credentials', () => {
        const email = `test+${Date.now()}@example.com`;

        cy.get('input[name="name"]').type('Oleg');
        cy.get('input[name="lastName"]').type('Doga');
        cy.get('input[name="email"]').type(email);

        // Використовуємо { sensitive: true } для приховування пароля в логах
        cy.get('input[name="password"]').type('Test1234', { sensitive: true });
        cy.get('input[name="confirmPassword"]').type('Test1234', { sensitive: true });

        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/qauto.forstudy.space/'); // Перевірка успішної реєстрації
    });
});
