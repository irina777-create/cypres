class GaragePage {
    visit() {
        cy.visit('/garage');
    }

    addCar(brand, model, mileage) {
        cy.contains('Add car').click();
        cy.get('select[name="brand"]').select(brand);
        cy.get('select[name="model"]').select(model);
        cy.get('input[name="mileage"]').type(mileage);
        cy.contains('Add').click();
    }
}

export const garagePage = new GaragePage();
