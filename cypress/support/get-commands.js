import { garagePage } from './pageObjects/garagePage';
Cypress.Commands.add('getExpensesViaAPI', () => {
    cy.request({
        method: 'GET',
        url: 'https://qauto.forstudy.space/api/expenses',
        headers: {
            authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
    }).then((response) => {
        expect(response.status).to.eq(200);
        cy.wrap(response.body.data.expenses).as('expenseList');
    });
});
