import { garagePage } from './pageObjects/garagePage';
Cypress.Commands.add('createExpenseViaAPI', (carId, expenseData) => {
    cy.request({
        method: 'POST',
        url: 'https://qauto.forstudy.space/api-docs/#/Expenses/postExpense.',
        headers: {
            authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
        body: {
            carId,
            ...expenseData,
        },
    }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.status).to.eq('ok');

        const createdExpense = response.body.data;
        expect(createdExpense.carId).to.eq(carId);
        expect(createdExpense.type).to.eq(expenseData.type);
        expect(createdExpense.amount).to.eq(expenseData.amount);
        expect(createdExpense.date).to.eq(expenseData.date);
        if (expenseData.comment) {
            expect(createdExpense.comment).to.eq(expenseData.comment);
        }

        cy.wrap(createdExpense).as('createdExpense');
    });
});
