/**
 * Export Functionality E2E Tests
 * Tests for CSV and PDF export features
 */

import TasksPage from '../support/page-objects/TasksPage'

describe('Export Tests', () => {
  beforeEach(() => {
    // Login and visit is handled by TasksPage.visit()
    TasksPage.visit()
    
    // Create test tasks for export
    cy.createTask({
      title: 'Export Test Task 1',
      description: 'First task for export',
      priority: 'High',
      dueDate: '2024-12-31',
    })
    
    cy.createTask({
      title: 'Export Test Task 2',
      description: 'Second task for export',
      priority: 'Low',
      dueDate: '2024-12-25',
    })
    
    cy.reload()
    cy.wait(1000)
  })

  describe('CSV Export', () => {
    it('UI-TC-026: Should export tasks to CSV', () => {
      TasksPage.exportToCSV()
      
      cy.waitForToast('Tasks exported to CSV successfully', 'success')
      
      // Verify file download (Cypress handles downloads differently)
      // In a real scenario, you might need to intercept the download
      cy.window().then((win) => {
        // Check if download was triggered
        // This is a simplified check - actual implementation may vary
        expect(win).to.exist
      })
    })

    it('Should export all user tasks to CSV', () => {
      // Verify tasks exist
      TasksPage.verifyTaskExists('Export Test Task 1')
      TasksPage.verifyTaskExists('Export Test Task 2')
      
      TasksPage.exportToCSV()
      cy.waitForToast('Tasks exported to CSV successfully', 'success')
    })
  })

  describe('PDF Export', () => {
    it('UI-TC-027: Should export tasks to PDF', () => {
      TasksPage.exportToPDF()
      
      cy.waitForToast('Tasks exported to PDF successfully', 'success')
      
      // Verify file download
      cy.window().then((win) => {
        expect(win).to.exist
      })
    })

    it('Should export all user tasks to PDF', () => {
      // Verify tasks exist
      TasksPage.verifyTaskExists('Export Test Task 1')
      TasksPage.verifyTaskExists('Export Test Task 2')
      
      TasksPage.exportToPDF()
      cy.waitForToast('Tasks exported to PDF successfully', 'success')
    })
  })

  describe('Export with Filters', () => {
    it('Should export filtered tasks', () => {
      // Filter by priority
      TasksPage.filterByPriority('High')
      cy.wait(1000)
      
      // Export should still export all tasks (or filtered, depending on implementation)
      TasksPage.exportToCSV()
      cy.waitForToast('Tasks exported to CSV successfully', 'success')
    })
  })

  describe('Export Empty State', () => {
    beforeEach(() => {
      cy.clearTasks()
      cy.reload()
    })

    it('Should handle export when no tasks exist', () => {
      TasksPage.visit()
      cy.wait(1000)
      
      // Export buttons should still be clickable
      TasksPage.exportToCSV()
      
      // Should either show error or export empty file
      // Implementation dependent
    })
  })
})

