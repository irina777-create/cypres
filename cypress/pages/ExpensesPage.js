class ExpensesPage {
    visit() {
        cy.visit('/expenses');
    }

    addFuelExpense(carName, amount, price) {
        cy.contains(carName).click();
        cy.contains('Add expense').click();
        cy.get('input[name="amount"]').type(amount);
        cy.get('input[name="price"]').type(price);
        cy.contains('Save').click();
    }
}

export const expensesPage = new ExpensesPage();
