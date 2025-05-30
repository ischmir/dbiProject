describe('Login flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('shows error message when the credentials are wrong', () => {
    cy.get('[data-cy="login-email"]').type('wrong@mail.com');
    cy.get('[data-cy="login-password"]').type('wrongpassword');
    cy.get('[data-cy="login-submit"]').click();
    cy.contains('Forkert email eller adgangskode.').should('be.visible');
  });

  it('logs in using the right credentials', () => {
    cy.get('[data-cy="login-email"]').type('test@mail.com');
    cy.get('[data-cy="login-password"]').type('password123');
    cy.get('[data-cy="login-submit"]').click();

    // Expect redirect to dashboard page
    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard').should('exist');
  });
});