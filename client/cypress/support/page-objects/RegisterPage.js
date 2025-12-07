/**
 * Register Page Object Model
 * Contains selectors and methods for the Register page
 */
class RegisterPage {
  // Selectors
  get nameInput() {
    return cy.get('input[name="name"]')
  }

  get emailInput() {
    return cy.get('input[name="email"]')
  }

  get passwordInput() {
    return cy.get('input[name="password"]')
  }

  get confirmPasswordInput() {
    return cy.get('input[name="confirmPassword"]')
  }

  get registerButton() {
    return cy.contains('button', 'Create Your Account')
  }

  get loginLink() {
    return cy.contains('a', 'Sign In')
  }

  get errorMessage() {
    return cy.get('.text-red-300, .text-red-500, [data-testid="error-message"]')
  }

  // Methods
  visit() {
    cy.visit('/register')
    this.waitForPageLoad()
  }

  waitForPageLoad() {
    cy.get('input[name="name"]').should('be.visible')
  }

  fillName(name) {
    this.nameInput.clear().type(name)
    return this
  }

  fillEmail(email) {
    this.emailInput.clear().type(email)
    return this
  }

  fillPassword(password) {
    this.passwordInput.clear().type(password)
    return this
  }

  fillConfirmPassword(password) {
    this.confirmPasswordInput.clear().type(password)
    return this
  }

  clickRegister() {
    this.registerButton.click()
    return this
  }

  clickLoginLink() {
    this.loginLink.click()
    return this
  }

  register(name, email, password, confirmPassword) {
    this.fillName(name)
    this.fillEmail(email)
    this.fillPassword(password)
    this.fillConfirmPassword(confirmPassword || password)
    this.clickRegister()
  }

  verifyErrorMessage(message) {
    this.errorMessage.should('be.visible').and('contain', message)
  }

  verifyRegistrationSuccess() {
    cy.url().should('include', '/login')
    cy.waitForToast('Account created successfully! Please sign in.', 'success')
  }
}

export default new RegisterPage()

