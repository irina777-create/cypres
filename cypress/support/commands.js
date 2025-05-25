// ***********************************************
// This example logcommands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import './logcommands'
import './typecommands'


import { garagePage } from './pageObjects/garagePage';

Cypress.Commands.add('createCarViaUI', (carData) => {
    cy.intercept('POST', '**/api/cars').as('createCar');

    garagePage.openAddCarModal();
    garagePage.fillCarForm(carData);
    garagePage.submitCarForm();

    cy.wait('@createCar').then((interception) => {
        expect(interception.response.statusCode).to.eq(201);
        const carId = interception.response.body.data.id;
        cy.wrap(carId).as('createdCarId');
    });
});

Cypress.Commands.add('getCarsViaAPI', () => {
    cy.request({
        method: 'GET',
        url: 'https://qauto.forstudy.space/api/cars',
        headers: {
            authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
    }).then((response) => {
        expect(response.status).to.eq(200);
        cy.wrap(response.body.data.cars).as('carList');
    });
});

Cypress.Commands.add('verifyCarExists', (carId, expectedData) => {
    cy.get('@carList').then((carList) => {
        const foundCar = carList.find(car => car.id === carId);
        expect(foundCar, 'Car with given ID should exist').to.exist;
        expect(foundCar.brand).to.eq(expectedData.brand);
        expect(foundCar.model).to.eq(expectedData.model);
        expect(foundCar.mileage).to.eq(Number(expectedData.mileage));
    });
});
