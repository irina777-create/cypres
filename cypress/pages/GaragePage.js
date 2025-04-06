// class GaragePage {
//     visit() {
//         cy.visit('/garage');
//     }
//
//     addCar(brand, model, mileage) {
//         cy.contains('Add car').click();
//         cy.get('select[name="brand"]').select(brand);
//         cy.get('select[name="model"]').select(model);
//         cy.get('input[name="mileage"]').type(mileage);
//         cy.contains('Add').click();
//     }
// }

// export const garagePage = new GaragePage();


class GaragePage {
    openAddCarModal() {
        cy.get('button').contains('Add car').click();
    }

    fillCarForm({ brand, model, mileage }) {
        cy.get('select[formcontrolname="brand"]').select(brand);
        cy.get('select[formcontrolname="model"]').select(model);
        cy.get('input[formcontrolname="mileage"]').type(mileage);
    }

    submitCarForm() {
        cy.get('button').contains('Add').click();
    }
}

export const garagePage = new GaragePage();
