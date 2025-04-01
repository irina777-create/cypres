import { garagePage } from '../pages/GaragePage';
import { expensesPage } from '../pages/ExpensesPage';

describe('Garage and Expenses Tests', () => {
    beforeEach(() => {
        cy.login('user@example.com', 'Password123');
    });

    it('Should add a car to the garage', () => {
        garagePage.visit();
        garagePage.addCar('Audi', 'TT', '5000');
        cy.contains('Audi TT').should('exist');
    });

    it('Should add fuel expenses for the car', () => {
        expensesPage.visit();
        expensesPage.addFuelExpense('Audi TT', '50', '1.5');
        cy.contains('50 L').should('exist');
    });
});
