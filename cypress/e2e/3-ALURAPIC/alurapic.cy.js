describe('Testes na pagina Alura Pic', () => {
    beforeEach(() => {
        cy.visit('http://alura-fotos.herokuapp.com');
    })
    
    it('Validação mensagens campos vazios', () => {
        //defaultCommandTimeout: 10000
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Email is required!').should('be.visible');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Full name is required!').should('be.visible');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'User name is required!').should('be.visible');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Password is required!').should('be.visible');
    })

    it('Verifica mensagem e-mail invalido', () => {
        //defaultCommandTimeout: 10000
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="email"]').type('nicole');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Invalid e-mail').should('be.visible');
    })

    it('Verifica mensagem caracteres minimos campo nome', () => {
        //defaultCommandTimeout: 10000
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="fullName"]').type('q');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Mininum length is 2').should('be.visible');
    })

    it('Verifica mensagem caracteres minimos campo user name', () => {
        //defaultCommandTimeout: 10000
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="userName"]').type('q');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Mininum length is 2').should('be.visible');
    })

    it('Verifica mensagem caracteres minimos campo password', () => {
        //defaultCommandTimeout: 10000
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="password"]').type('111');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Mininum length is 8').should('be.visible');
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

    
    it('Tentativa login invalido', () => {
        //defaultCommandTimeout: 10000
        cy.login('flavio', '12a');
        cy.on('window:alert', (str) => {
        expect(str).to.equal('Invalid user name or password')
        });
    })  

    it('Tentativa login correto', () => {
        //defaultCommandTimeout: 10000
        cy.login('flavio', '123');
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
        it.only('Tentativa registro correto', () => {
            //defaultCommandTimeout: 10000
            cy.register(usuario.email, usuario.fullName, usuario.userName, usuario.password);
            cy.contains('h4', 'Login').should('be.visible');
        })  
    })

})