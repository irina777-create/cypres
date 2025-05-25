describe('User Login', () => {
    it('Should log in successfully', () => {
        cy.login('testuser@example.com', 'Test1234');
    });
});
it('Should register and log in a new user', () => {
    const email = `test+${Date.now()}@example.com`;

    cy.get('input[name="name"]').type('Oleg');
    cy.get('input[name="lastName"]').type('Doga');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type('Test1234');
    cy.get('input[name="confirmPassword"]').type('Test1234');

    cy.get('button[type="submit"]').click();

    // Логін після реєстрації
    cy.login(email, 'Test1234');
});
