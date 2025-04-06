describe('Add car and intercept API response', () => {
    it('should add a car and validate response', () => {
        cy.visit('/');
        cy.login('your@email.com', 'yourPassword');

        cy.intercept('POST', '**/api/cars').as('createCar');

        // Відкриваю додавання машини (натискаю на кнопку )
        cy.get('button').contains('Add car').click();

        cy.get('select[formcontrolname="brand"]').select('Audi');

        cy.get('button').contains('Add').click();


        cy.wait('@createCar').then((interception) => {
            expect(interception.response.statusCode).to.eq(201);

            const carId = interception.response.body.data.id;
            
            cy.wrap(carId).as('createdCarId');
        });
    });
});
