describe('User Registration', () => {
    beforeEach(() => {
        cy.visit('https://qauto.forstudy.space/', {
            auth: {
                username: 'guest',
                password: 'welcome2auto'
            }

        });
    });

    it('Should show validation errors for empty fields', () => {
        cy.get('button[type="submit"]').click();

        cy.get('input[name="name"]')
            .parent()
            .should('contain', 'Name is required');

        cy.get('input[name="lastName"]')
            .parent()
            .should('contain', 'Last name is required');

        cy.get('input[name="email"]')
            .parent()
            .should('contain', 'Email required');

        cy.get('input[name="password"]')
            .parent()
            .should('contain', 'Password required');

        cy.get('input[name="confirmPassword"]')
            .parent()
            .should('contain', 'Re-enter password required');
    });

    it('Should register a new user with valid credentials', () => {
        const email = `test+${Date.now()}@example.com`; // Унікальний email

        cy.get('input[name="name"]').type('John');
        cy.get('input[name="lastName"]').type('Doe');
        cy.get('input[name="email"]').type(email);
        cy.get('input[name="password"]').type('Test1234');
        cy.get('input[name="confirmPassword"]').type('Test1234');

        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/dashboard'); // Або інша сторінка після успішної реєстрації
    });

    it('Should show error for password mismatch', () => {
        cy.get('input[name="password"]').type('Test1234');
        cy.get('input[name="confirmPassword"]').type('Test5678');
        cy.get('button[type="submit"]').click();

        cy.get('input[name="confirmPassword"]')
            .parent()
            .should('contain', 'Passwords do not match');
    });

    it('Should show error for invalid email', () => {
        cy.get('input[name="email"]').type('invalid-email');
        cy.get('button[type="submit"]').click();

        cy.get('input[name="email"]')
            .parent()
            .should('contain', 'Email is incorrect');
    });

    it('Should show error for weak password', () => {
        cy.get('input[name="password"]').type('123');
        cy.get('button[type="submit"]').click();

        cy.get('input[name="password"]')
            .parent()
            .should('contain', 'Password has to be from 8 to 15 characters long');
    });
});
