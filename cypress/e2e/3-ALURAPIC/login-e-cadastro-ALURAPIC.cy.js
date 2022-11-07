describe('Testes de login e cadastro na pagina Alura Pic', () => {
    beforeEach(() => {
        cy.visit('http://alura-fotos.herokuapp.com');
        
        cy.intercept('POST' , 'https://apialurapic.herokuapp.com/user/login', {
            statusCode: 400
        }).as('stubPOST')
    })

    it('Tentativa login invalido', () => {
        //defaultCommandTimeout: 10000
        cy.login('flavio', '12a');
        cy.on('window:alert', (str) => {
        expect(str).to.equal('Invalid user name or password')
        });
    })  

    it.only('Tentativa login correto', () => {
        //defaultCommandTimeout: 10000
        cy.login(Cypress.env('userName'), Cypress.env('password'));
        cy.wait('@stubPOST')
        cy.contains('a', '(Logout)').should('be.visible');
    })  

    //jeito anterior, sem massa de dados em JSON
    /*it.only('Tentativa registro correto', () => {
        //defaultCommandTimeout: 10000
        cy.register('nicole1431@hotmail.com', 'Nicole Silva', 'nicsilva1999', '1234567@');
        cy.contains('h4', 'Login').should('be.visible');
    }) */ 

    const usuarios = require('../../fixtures/usuarios.json');
    usuarios.forEach(usuario => {
        it('Tentativa registro correto do usuário ' + usuario.fullName, () => {
            //defaultCommandTimeout: 10000
            cy.register(usuario.email, usuario.fullName, usuario.userName, usuario.password);
            cy.contains('h4', 'Login').should('be.visible');
        })  
    })

})