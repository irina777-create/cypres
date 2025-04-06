

describe('Car creation and validation', () => {
    const carData = {
        brand: 'Audi',
        model: 'Q5',
        mileage: '12000',
    };

    it('should create car and verify it exists via API', () => {
        cy.login('user@email.com', 'userpassword'); // твоя кастомна команда

        cy.createCarViaUI(carData);

        cy.get('@createdCarId').then((carId) => {
            cy.getCarsViaAPI();
            cy.verifyCarExists(carId, carData);
        });
    });
});
