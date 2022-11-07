describe('Testes utilizando caracteres especiais na página alura Pic', () => {
    beforeEach(() => {
        cy.visit('http://alura-fotos.herokuapp.com');
    })

    it('Verifica caracteres numéricos no campo full name', () => {
        //defaultCommandTimeout: 10000
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="password"]').type('11111');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Numbers are not allowed').should('be.visible');
    })

    it('Verifica caracteres especiais no campo full name', () => {
        //defaultCommandTimeout: 10000
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="fullName"]').type('####');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Special characters are not allowed').should('be.visible');
    })

    it('Verifica caracteres caixa baixa no campo user name', () => {
        //defaultCommandTimeout: 10000
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="userName"]').type('Aa');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Must be lower case').should('be.visible');
    })
    
})