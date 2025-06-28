import { defineConfig } from "cypress";

describe('Halaman Login', () => {
  it('Berhasil login dengan kredensial benar', () => {
    cy.visit('http://localhost:8100/login');
    cy.get('input[name=email]').type('test@example.com');
    cy.get('input[name=password]').type('password123');
    cy.get('ion-button[type=submit]').click();
    cy.contains('Beranda').should('exist');
  });
});

