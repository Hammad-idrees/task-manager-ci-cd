/**
 * Tags Management E2E Tests
 * Tests for tag creation, editing, deletion, and filtering
 */

import TagsPage from '../support/page-objects/TagsPage'
import TasksPage from '../support/page-objects/TasksPage'

describe('Tags Management Tests', () => {
  beforeEach(() => {
    // Login and visit is handled by TagsPage.visit()
    TagsPage.visit()
  })

  describe('Tag Creation', () => {
    it('UI-TC-022: Should create tag', () => {
      const tagName = `Work Tag ${Date.now()}`
      
      TagsPage.createTag(tagName)
      
      cy.waitForToast('Tag created successfully', 'success')
      TagsPage.verifyTagExists(tagName)
    })

    it('Should show error for empty tag name', () => {
      TagsPage.clickAddTag()
      TagsPage.clickCreate()
      
      // Should show validation error
      cy.contains('required', { matchCase: false }).should('be.visible')
    })
  })

  describe('Tag Editing', () => {
    let tagId

    beforeEach(() => {
      cy.createTag('Tag to Edit').then((response) => {
        tagId = response.body.tag._id
      })
      cy.reload()
    })

    it('UI-TC-023: Should edit tag', () => {
      TagsPage.visit()
      cy.wait(1000)
      
      TagsPage.editTag(0, 'Updated Tag Name')
      
      cy.waitForToast('Tag updated successfully', 'success')
      TagsPage.verifyTagExists('Updated Tag Name')
    })
  })

  describe('Tag Deletion', () => {
    beforeEach(() => {
      cy.createTag('Tag to Delete')
      cy.reload()
    })

    it('UI-TC-024: Should delete tag', () => {
      TagsPage.visit()
      cy.wait(1000)
      
      TagsPage.verifyTagExists('Tag to Delete')
      
      TagsPage.deleteTag(0)
      
      cy.waitForToast('Tag deleted successfully', 'success')
      cy.contains('Tag to Delete').should('not.exist')
    })
  })

  describe('Tag Filtering', () => {
    let tagId, taskId

    beforeEach(() => {
      // Create tag and task with tag
      cy.createTag('Filter Tag').then((response) => {
        tagId = response.body.tag._id
        
        cy.createTask({
          title: 'Task with Tag',
          tags: [tagId],
        }).then((taskResponse) => {
          taskId = taskResponse.body.task._id
        })
      })
      cy.reload()
    })

    it('UI-TC-025: Should filter tasks by tag', () => {
      TagsPage.visit()
      cy.wait(1000)
      
      TagsPage.filterTasksByTag(0)
      cy.wait(1000)
      
      // Should show tasks with the selected tag
      cy.contains('Task with Tag').should('be.visible')
    })
  })

  describe('Tag Usage Count', () => {
    let tagId

    beforeEach(() => {
      cy.createTag('Usage Tag').then((response) => {
        tagId = response.body.tag._id
        
        // Create multiple tasks with this tag
        cy.createTask({ title: 'Task 1', tags: [tagId] })
        cy.createTask({ title: 'Task 2', tags: [tagId] })
      })
      cy.reload()
    })

    it('Should display correct tag usage count', () => {
      TagsPage.visit()
      cy.wait(1000)
      
      // Verify tag shows usage count
      cy.contains('Usage Tag').parent().should('contain', '2 tasks')
    })
  })

  describe('Empty State', () => {
    beforeEach(() => {
      cy.clearTags()
      cy.reload()
    })

    it('Should display empty state when no tags exist', () => {
      TagsPage.visit()
      cy.wait(1000)
      
      TagsPage.verifyNoTags()
      cy.contains('Create your first tag').should('be.visible')
    })
  })
})

