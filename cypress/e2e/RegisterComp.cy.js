describe('Redirect from login to register view', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should redirect to register page when clicking on register link', () => {
    cy.get('[data-cy="register-link"]').click();
    cy.url().should('include', '/register');
  });
});

describe('Register password validation', () => {
  beforeEach(() => {
    cy.visit('/register');
    cy.get('[data-cy="register-name"]').type('Test User');
    cy.get('[data-cy="register-email"]').type(`testuser${Date.now()}@example.com`);
  });

  it('shows error for missing lowercase letter', () => {
    cy.get('[data-cy="register-password"]').type('PASSWORD123!@#PASSWORD');
    cy.get('[data-cy="register-confirm-password"]').type('PASSWORD123!@#PASSWORD');
    cy.get('[data-cy="register-submit"]').click();
    cy.contains('Adgangskode skal indeholde mindst ét lille bogstav.').should('be.visible');
  });

  it('shows error for missing uppercase letter', () => {
    cy.get('[data-cy="register-password"]').type('password123!@#password');
    cy.get('[data-cy="register-confirm-password"]').type('password123!@#password');
    cy.get('[data-cy="register-submit"]').click();
    cy.contains('Adgangskode skal indeholde mindst ét stort bogstav.').should('be.visible');
  });

  it('shows error for missing number', () => {
    cy.get('[data-cy="register-password"]').type('Password!@#Password!');
    cy.get('[data-cy="register-confirm-password"]').type('Password!@#Password!');
    cy.get('[data-cy="register-submit"]').click();
    cy.contains('Adgangskode skal indeholde mindst ét tal.').should('be.visible');
  });

  it('shows error for missing special character', () => {
    cy.get('[data-cy="register-password"]').type('Password1234Password');
    cy.get('[data-cy="register-confirm-password"]').type('Password1234Password');
    cy.get('[data-cy="register-submit"]').click();
    cy.contains('Adgangskode skal indeholde minst et specialtegn.').should('be.visible');
  });

  it('shows error for password too short', () => {
    cy.get('[data-cy="register-password"]').type('Pass1!');
    cy.get('[data-cy="register-confirm-password"]').type('Pass1!');
    cy.get('[data-cy="register-submit"]').click();
    cy.contains('Adgangskode skal indeholde mindst 16 tegn.').should('be.visible');
  });

  it('shows multiple errors for a very weak password', () => {
    cy.get('[data-cy="register-password"]').type('abc');
    cy.get('[data-cy="register-confirm-password"]').type('abc');
    cy.get('[data-cy="register-submit"]').click();
    cy.contains('Adgangskode skal indeholde mindst ét stort bogstav.').should('be.visible');
    cy.contains('Adgangskode skal indeholde mindst ét tal.').should('be.visible');
    cy.contains('Adgangskode skal indeholde minst et specialtegn.').should('be.visible');
    cy.contains('Adgangskode skal indeholde mindst 16 tegn.').should('be.visible');
  });

  it('shows error if passwords do not match', () => {
    cy.get('[data-cy="register-password"]').type('ValidPassword123!@#');
    cy.get('[data-cy="register-confirm-password"]').type('DifferentPassword123!@#');
    cy.get('[data-cy="register-submit"]').click();
    cy.contains('Adgangskoder stemmer ikke overens.').should('be.visible');
  });
});

describe('Register flow', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('shows error for email  already in use', () => {
    cy.get('[data-cy="register-name"]').type('Test User');
    cy.get('[data-cy="register-email"]').type('test@mail.com');
    cy.get('[data-cy="register-password"]').type('ValidPassword123!@#');
    cy.get('[data-cy="register-confirm-password"]').type('ValidPassword123!@#');
    cy.get('[data-cy="register-submit"]').click();
    cy.contains('Ugyldig email').should('be.visible');
  });

  it('registers a new user with valid data', () => {
    const uniqueEmail = `testuser${Date.now()}@example.com`;
    cy.get('[data-cy="register-name"]').type('Test User');
    cy.get('[data-cy="register-email"]').type(uniqueEmail);
    cy.get('[data-cy="register-password"]').type('ValidPassword123!@#');
    cy.get('[data-cy="register-confirm-password"]').type('ValidPassword123!@#');
    cy.get('[data-cy="register-submit"]').click();
    cy.url().should('include', '/dashboard');
  });
});