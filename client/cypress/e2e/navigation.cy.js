/**
 * Navigation E2E Tests
 * Tests for navigation between pages
 */

describe('Navigation Tests', () => {
  beforeEach(() => {
    cy.login()
  })

  describe('Page Navigation', () => {
    it('UI-TC-028: Should navigate between pages', () => {
      // Navigate to Dashboard
      cy.visit('/dashboard')
      cy.contains('Dashboard', { matchCase: false }).should('be.visible')
      
      // Navigate to Tasks
      cy.contains('a', 'Tasks').or(cy.get('[href="/tasks"]')).click()
      cy.url().should('include', '/tasks')
      cy.contains('Tasks').should('be.visible')
      
      // Navigate to Tags
      cy.contains('a', 'Tags').or(cy.get('[href="/tags"]')).click()
      cy.url().should('include', '/tags')
      cy.contains('Tags').should('be.visible')
      
      // Navigate to Profile
      cy.contains('a', 'Profile').or(cy.get('[href="/profile"]')).click()
      cy.url().should('include', '/profile')
      
      // Navigate back to Dashboard
      cy.contains('a', 'Dashboard').or(cy.get('[href="/dashboard"]')).click()
      cy.url().should('include', '/dashboard')
    })

    it('Should maintain navigation state', () => {
      cy.visit('/tasks')
      cy.contains('Tasks').should('be.visible')
      
      // Navigate away and back
      cy.visit('/tags')
      cy.visit('/tasks')
      
      // Should still be on tasks page
      cy.url().should('include', '/tasks')
    })
  })

  describe('Breadcrumb Navigation', () => {
    it('Should navigate using browser back button', () => {
      cy.visit('/dashboard')
      cy.visit('/tasks')
      cy.visit('/tags')
      
      cy.go('back')
      cy.url().should('include', '/tasks')
      
      cy.go('back')
      cy.url().should('include', '/dashboard')
    })

    it('Should navigate using browser forward button', () => {
      cy.visit('/dashboard')
      cy.visit('/tasks')
      cy.go('back')
      cy.go('forward')
      cy.url().should('include', '/tasks')
    })
  })

  describe('Direct URL Navigation', () => {
    it('Should navigate to page via direct URL', () => {
      cy.visit('/tasks')
      cy.url().should('include', '/tasks')
      cy.contains('Tasks').should('be.visible')
      
      cy.visit('/tags')
      cy.url().should('include', '/tags')
      cy.contains('Tags').should('be.visible')
    })
  })
})

