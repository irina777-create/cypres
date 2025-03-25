
describe('Перевірка кнопок ', () => {
    beforeEach(() => {
        cy.visit('https://qauto.forstudy.space/', {
            auth: {
                username: 'guest',
                password: 'welcome2qauto'
            }

            });
        it('Перевіряє, що кнопки соцмереж у футері існують і мають правильні посилання', () => {
            cy.get('.socials_link a[href="https://www.facebook.com"]').should('be.visible');
            cy.get('.socials_link a[href="https://t.me/"]').should('be.visible');
            cy.get('.socials_link a[href="https://www.youtube.com"]').should('be.visible');
            cy.get('.socials_link a[href="https://www.instagram.com"]').should('be.visible');
            cy.get('.socials_link a[href="https://www.linkedin.com"]').should('be.visible');
            cy.get('.socials_link a[href="mailto:support@ithillel.ua"]').should('be.visible');
            cy.get('.contacts_link a[href="https://ithillel.ua"]').should('be.visible');
        });

        it('Перевіряє кнопку Sign up', () => {
            cy.get('.section.hero a').should('be.visible').and('contain.text', 'Sign up');
        });
    });

});