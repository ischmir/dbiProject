describe('create form modal flow', () => {
  beforeEach(() => {
    // Login first
    cy.visit('/login');
    cy.get('[data-cy="login-email"]').type('test@mail.com');
    cy.get('[data-cy="login-password"]').type('password123');
    cy.get('[data-cy="login-submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard').should('exist');
  });

  it('edit form in form editor', () => {
    // Navigate to form overview and access the first form in the first folder
    cy.visit('/form-overview/');
    cy.get ('[data-cy="create-folder"]').first().click();
    cy.get ('[data-cy="first-form"]').first().click();
    cy.contains('Skema Titel').should('exist');
    // Drag and drop the title palette item into the drop zone
    cy.get('[data-cy="palette-item-title"]').drag('[data-cy="drop-zone"]');
    cy.get('[data-cy="drop-zone"]').should('contain', 'Overskrift');
    // Edit the title field
    cy.get('[data-cy="form-title-input"]').first().clear();
    cy.get('[data-cy="form-title-input"]').first().type('Mit nye skema');
    cy.get('[data-cy="form-title-input"]').should('have.value', 'Mit nye skema');
    cy.get('[data-cy="save-form-btn"]').click();
    // Assert redirect or success message (adjust as needed)
  });
});