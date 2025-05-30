describe('create form modal flow', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('[data-cy="login-email"]').type('test@mail.com');
    cy.get('[data-cy="login-password"]').type('password123');
    cy.get('[data-cy="login-submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard').should('exist');
  });

  it('edit form in form editor', () => {
    cy.visit('/form-editor/liqwC3KrFzmrhskGFRs7');
    cy.contains('Skema Titel').should('exist');
    cy.get('[data-cy="form-title-input"]').clear();
    cy.get('[data-cy="form-title-input"]').type('Mit nye skema');
    cy.get('[data-cy="save-form-btn"]').click();
  });
});