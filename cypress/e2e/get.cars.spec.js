describe('Create expense via API', () => {
    const carData = {
        brand: 'Audi',
        model: 'Q5',
        mileage: '12000',
    };

    const expenseData = {
        type: 'FUEL',
        amount: 150,
        date: '2025-04-06',
        comment: 'API test expense',
    };

    it('should create car via UI, add expense', () => {
        cy.login('user@email.com', 'userpassword');

        cy.createCarViaUI(carData);

        cy.get('@createdCarId').then((carId) => {
            cy.createExpenseViaAPI(carId, expenseData);

            cy.get('@createdExpense').then((createdExpense) => {
                cy.getExpensesViaAPI();

                cy.get('@expenseList').then((expenses) => {
                    const foundExpense = expenses.find(exp => exp.id === createdExpense.id);

                    expect(foundExpense).to.exist;
                    expect(foundExpense.carId).to.eq(carId);
                    expect(foundExpense.type).to.eq(expenseData.type);
                    expect(foundExpense.amount).to.eq(expenseData.amount);
                    expect(foundExpense.date).to.eq(expenseData.date);
                    expect(foundExpense.comment).to.eq(expenseData.comment);
                });
            });
        });
    });
});
