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

    it('should create car via UI and add expense via API', () => {
        cy.login('user@email.com', 'userpassword');

        cy.createCarViaUI(carData);

        cy.get('@createdCarId').then((carId) => {
            cy.createExpenseViaAPI(carId, expenseData);

            // (опційно) використання створеної витрати
            cy.get('@createdExpense').then((expense) => {
                cy.log('Created expense ID:', expense.id);
            });
        });
    });
});