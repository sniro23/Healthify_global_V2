describe('Onboarding Flow', () => {
  beforeEach(() => {
    // Visit the onboarding page
    cy.visit('/onboarding');

    // Mock Supabase authentication
    cy.window().then((win) => {
      win.localStorage.setItem('supabase.auth.token', JSON.stringify({
        currentSession: {
          access_token: 'fake-token',
          user: {
            id: 'test-user-id',
            email: 'test@example.com',
          },
        },
      }));
    });
  });

  it('allows completing the onboarding process', () => {
    // Step 1: Personal Info
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.get('input[name="phone"]').type('123-456-7890');
    cy.get('input[name="dob"]').type('1990-01-01');
    cy.get('select[name="gender"]').select('male');
    cy.get('input[name="address"]').type('123 Main St');
    cy.get('input[name="city"]').type('Anytown');
    cy.get('input[name="state"]').type('CA');
    cy.get('input[name="zipCode"]').type('12345');
    
    // Navigate to next step
    cy.contains('button', 'Next').click();
    
    // Step 2: Medical History
    cy.contains('Medical History').should('be.visible');
    cy.get('input[name="conditions"]').type('None');
    cy.get('input[name="allergies"]').type('Penicillin');
    
    // Navigate to next step
    cy.contains('button', 'Next').click();
    
    // Step 3: Healthcare Providers
    cy.contains('Healthcare Providers').should('be.visible');
    cy.get('input[name="name"]').type('Dr. Smith');
    cy.get('input[name="phone"]').type('987-654-3210');
    
    // Navigate to next step
    cy.contains('button', 'Next').click();
    
    // Step 4: Insurance
    cy.contains('Insurance').should('be.visible');
    cy.get('input[name="provider"]').type('Blue Cross');
    cy.get('input[name="policyNumber"]').type('BC123456789');
    cy.get('select[name="coverageType"]').select('ppo');
    
    // Complete onboarding
    cy.contains('button', 'Complete').click();
    
    // Should be redirected to dashboard
    cy.url().should('include', '/patient/dashboard');
  });

  it('allows navigation between steps', () => {
    // Navigate to next step
    cy.contains('button', 'Next').click();
    
    // Verify we're on step 2
    cy.contains('Medical History').should('be.visible');
    
    // Go back to step 1
    cy.contains('button', 'Back').click();
    
    // Verify we're back on step 1
    cy.contains('Personal Info').should('be.visible');
    
    // Click on the step indicator to go to step 3
    cy.contains('Healthcare Providers').click();
    
    // Verify cannot go to step 3 without completing previous steps
    cy.contains('Personal Info').should('be.visible');
  });

  it('validates required fields', () => {
    // Try to proceed without filling required fields
    cy.contains('button', 'Next').click();
    
    // Should show validation errors
    cy.get('input:invalid').should('have.length.at.least', 1);
    
    // Fill one required field
    cy.get('input[name="firstName"]').type('John');
    
    // Still have validation errors
    cy.contains('button', 'Next').click();
    cy.get('input:invalid').should('have.length.at.least', 1);
  });
}); 