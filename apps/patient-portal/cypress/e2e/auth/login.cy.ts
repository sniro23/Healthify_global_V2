describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login form', () => {
    cy.get('form').should('exist');
    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('should show validation errors for empty fields', () => {
    cy.get('button[type="submit"]').click();
    cy.get('[data-testid="email-error"]').should('be.visible');
    cy.get('[data-testid="password-error"]').should('be.visible');
  });

  it('should show error for invalid credentials', () => {
    cy.get('input[type="email"]').type('invalid@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.get('[data-testid="login-error"]').should('be.visible');
  });

  it('should successfully log in with valid credentials', () => {
    // Mock successful login
    cy.intercept('POST', '/api/auth/*', {
      statusCode: 200,
      body: {
        data: {
          user: {
            id: 'test-user-id',
            email: 'test@example.com',
          },
        },
      },
    }).as('loginRequest');

    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('validpassword');
    cy.get('button[type="submit"]').click();

    // Wait for login request to complete
    cy.wait('@loginRequest');

    // Should redirect to dashboard
    cy.url().should('include', '/dashboard');
  });

  it('should navigate to registration page', () => {
    cy.get('a').contains('Create an account').click();
    cy.url().should('include', '/register');
  });

  it('should navigate to forgot password page', () => {
    cy.get('a').contains('Forgot password?').click();
    cy.url().should('include', '/forgot-password');
  });
}); 