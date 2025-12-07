/**
 * Login Page Object Model
 * Contains selectors and methods for the Login page
 */
class LoginPage {
  // Selectors
  get emailInput() {
    return cy.get('input[name="email"]')
  }

  get passwordInput() {
    return cy.get('input[name="password"]')
  }

  get loginButton() {
    return cy.contains('button', 'Sign In to TaskFlow')
  }

  get registerLink() {
    return cy.contains('a', 'Create Account')
  }

  get passwordToggle() {
    return cy.get('button[type="button"]').within(() => {
      cy.get('svg').first()
    })
  }

  get errorMessage() {
    return cy.get('.text-red-300, .text-red-500, [data-testid="error-message"]')
  }

  // Methods
  visit() {
    cy.visit('/login')
    this.waitForPageLoad()
  }

  waitForPageLoad() {
    cy.get('input[name="email"]').should('be.visible')
  }

  fillEmail(email) {
    this.emailInput.clear().type(email)
    return this
  }

  fillPassword(password) {
    this.passwordInput.clear().type(password)
    return this
  }

  clickLogin() {
    this.loginButton.click()
    return this
  }

  clickRegisterLink() {
    this.registerLink.click()
    return this
  }

  togglePasswordVisibility() {
    this.passwordToggle.click()
    return this
  }

  login(email, password) {
    this.fillEmail(email)
    this.fillPassword(password)
    this.clickLogin()
  }

  verifyErrorMessage(message) {
    this.errorMessage.should('be.visible').and('contain', message)
  }

  verifyLoginSuccess() {
    cy.url().should('include', '/dashboard')
    cy.waitForToast('Welcome back! Login successful', 'success')
  }
}

export default new LoginPage()

