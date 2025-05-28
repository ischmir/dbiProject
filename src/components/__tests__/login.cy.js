import LoginComp from "@/LoginComp.vue";

describe('Login flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });
  
  it('shows error message when the credentials are wrong', () => {
    cy.get('input[type="email"]').type('wrong@mail.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.contains('Forkert email eller adgangskode.').should('be.visible');
  });

  it('logs in using the right credentials', () => {
    cy.get('input[type="email"]').type('test@mail.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Expect redirect to dashboard page
    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard').should('exist');
  });
});