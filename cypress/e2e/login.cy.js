/*
Skenatio login:
- Harus menampilkan halaman login secara benar
- Saat di submit dan email kosong, maka harus ada pesan
- Saat di submit dan password kosong, maka harus ada pesan
- Jika email dan password sesuai maka pergi ke halaman beranda
- Jika email dan password sesuai maka harus ada pesan
*/

describe('login page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should show page correctly', () => {
    cy.get('#email').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should warn when email empty', () => {
    cy.get('button[type="submit"]').click();
    cy.get('p').contains('Email tidak boleh kosong').should('be.visible');
  });

  it('should warn when password wrong', () => {
    cy.get('button[type="submit"]').click();
    cy.get('p').contains('Sandi tidak boleh kosong').should('be.visible');
  });

  it('should go to home when email and password match', () => {
    cy.intercept(
      {
        method: 'POST', // Route all GET requests
        url: '/v1/login', // that have a URL that matches '/users/*'
      },
      {
        data: {
          token: '1234567890',
        },
      }, // and force the response to be: []
    ).as('login');
    cy.intercept({ method: 'GET', url: '/v1/users/me' }, {
      data: {
        user: {
          id: 'test',
          name: 'Test 12345',
          email: 'john@example.com',
          avatar: '',
        },
      },
    });
    cy.get('#email').type('test12345@mail.com');
    cy.get('#password').type('ThisIsAPassword');
    cy.get('button[type="submit"]').click();
    cy.get('h2').contains('Diskusi Tersedia').should('be.visible');
  });

  it('should shown login error', () => {
    const errorMessage = 'wrong password';
    cy.intercept(
      {
        method: 'POST', // Route all GET requests
        url: '/v1/login', // that have a URL that matches '/users/*'
      },
      {
        statusCode: 401,
        body: {
          message: errorMessage,
        },
      }, // and force the response to be: []
    ).as('login');
    cy.get('#email').type('test12345@mail.com');
    cy.get('#password').type('ThisIsAPassword');
    cy.get('button[type="submit"]').click();
    cy.get('p').contains(errorMessage).should('be.visible');
  });
});
