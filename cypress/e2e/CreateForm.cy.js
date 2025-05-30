describe('Drag and Drop Editor E2E', () => {
  beforeEach(() => {
    // Login first
    cy.visit('/login');
    cy.get('[data-cy="login-email"]').type('test@mail.com');
    cy.get('[data-cy="login-password"]').type('password123');
    cy.get('[data-cy="login-submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard').should('exist');
    //redirect to form overview and access first folder
    cy.visit('/form-overview/');
    cy.get ('[data-cy="create-folder"]').first().click();
    cy.get('[data-cy="open-create-form-modal-btn"').click();
    cy.get('[data-cy="form-name-input"').type('Test Skema');
    cy.get('[data-cy="next-create-form-modal-btn"]').click();
    cy.get('[data-cy="next-create-form-modal-btn"]').click();
    //cy.visit('/form-editor/liqwC3KrFzmrhskGFRs7');
    cy.contains('Skema Titel').should('exist');
  });

  it('can drag title palette item into drop-zone and edit title', () => {
    // Use Cypress drag-drop plugin for more reliable drag and drop
    // First, install the plugin: npm install --save-dev @4tw/cypress-drag-drop
    // Then, in cypress/support/e2e.js: import '@4tw/cypress-drag-drop'

    cy.get('[data-cy="palette-item-title"]').drag('[data-cy="drop-zone"]');
    cy.get('[data-cy="drop-zone"]').should('contain', 'Overskrift');

    // Edit the title field
    cy.get('[data-cy="form-title-input"]').first().clear();
    cy.get('[data-cy="form-title-input"]').first().type('Mit nye skema');
    cy.get('[data-cy="form-title-input"]').should('have.value', 'Mit nye skema');

    cy.get('[data-cy="save-form-btn"]').click();

    // Assert redirect or success message (adjust as needed)
    cy.url().should('include', '/form-overview');
    cy.contains('Skemaoversigt').should('exist');
  });
});
