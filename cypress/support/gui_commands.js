Cypress.Commands.add('login', (nome, senha) => {
    //defaultCommandTimeout: 10000
    cy.get('input[formcontrolname="userName"]').type(nome);
    cy.get('input[formcontrolname="password"]').type(senha);
    cy.contains('button', 'login').click();
})


Cypress.Commands.add('register', (email, fullname, username, senha) => {
    //defaultCommandTimeout: 10000
    cy.contains('a', 'Register now').click();
    cy.get('input[formcontrolname="email"]').type(email);
    cy.get('input[formcontrolname="fullName"]').type(fullname);
    cy.get('input[formcontrolname="userName"]').type(username);
    cy.get('input[formcontrolname="password"]').type(senha);
    cy.contains('small', 'User available').should('be.visible');
    cy.contains('button', 'Register').click();
})