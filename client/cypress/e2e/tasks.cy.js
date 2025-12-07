/**
 * Tasks Management E2E Tests
 * Tests for task creation, viewing, editing, deletion, and filtering
 */

import TasksPage from '../support/page-objects/TasksPage'

describe('Tasks Management Tests', () => {
  beforeEach(() => {
    // Login and visit is handled by TasksPage.visit()
    TasksPage.visit()
  })

  describe('Task Creation', () => {
    it('UI-TC-010: Should create task with all fields', () => {
      const taskTitle = `Complete Project Documentation ${Date.now()}`
      
      TasksPage.createTask({
        title: taskTitle,
        description: 'Write comprehensive documentation for the project',
        dueDate: '2024-12-31',
        priority: 'High',
      })

      cy.waitForToast('Task created successfully', 'success')
      TasksPage.verifyTaskExists(taskTitle)
    })

    it('UI-TC-011: Should create task with only required fields', () => {
      const taskTitle = `Minimal Task ${Date.now()}`
      
      TasksPage.createTask({
        title: taskTitle,
      })

      cy.waitForToast('Task created successfully', 'success')
      TasksPage.verifyTaskExists(taskTitle)
    })

    it('UI-TC-012: Should show error for missing required field', () => {
      TasksPage.clickCreateTask()
      // Don't fill title
      TasksPage.fillTaskDescription('Test description')
      TasksPage.submitTask()

      // Should show validation error
      cy.contains('required', { matchCase: false }).should('be.visible')
    })

    it('Should create task with different priorities', () => {
      const priorities = ['Low', 'Medium', 'High']
      
      priorities.forEach((priority) => {
        const taskTitle = `${priority} Priority Task ${Date.now()}`
        TasksPage.createTask({
          title: taskTitle,
          priority: priority,
        })
        
        TasksPage.verifyTaskExists(taskTitle)
      })
    })
  })

  describe('Task Viewing', () => {
    beforeEach(() => {
      // Create test tasks
      cy.createTask({
        title: 'Test Task 1',
        description: 'First test task',
        priority: 'High',
        dueDate: '2024-12-31',
      })
      
      cy.createTask({
        title: 'Test Task 2',
        description: 'Second test task',
        priority: 'Low',
        dueDate: '2024-12-25',
      })
      
      cy.reload()
    })

    it('UI-TC-013: Should display all tasks', () => {
      TasksPage.visit()
      cy.wait(1000) // Wait for tasks to load
      
      TasksPage.verifyTaskExists('Test Task 1')
      TasksPage.verifyTaskExists('Test Task 2')
    })

    it('Should display task details correctly', () => {
      TasksPage.visit()
      cy.wait(1000)
      
      // Verify task displays title, description, priority, due date
      cy.contains('Test Task 1').should('be.visible')
      cy.contains('First test task').should('be.visible')
      cy.contains('High').should('be.visible')
    })
  })

  describe('Task Filtering', () => {
    beforeEach(() => {
      // Create tasks with different statuses
      cy.createTask({
        title: 'Completed Task',
        completed: true,
      })
      
      cy.createTask({
        title: 'Pending Task',
        completed: false,
      })
      
      cy.reload()
    })

    it('UI-TC-014: Should filter tasks by status (Completed)', () => {
      TasksPage.visit()
      cy.wait(1000)
      
      TasksPage.filterByStatus('completed')
      cy.wait(1000)
      
      TasksPage.verifyTaskExists('Completed Task')
      cy.contains('Pending Task').should('not.exist')
    })

    it('UI-TC-015: Should filter tasks by priority (High)', () => {
      TasksPage.visit()
      cy.wait(1000)
      
      TasksPage.filterByPriority('high')
      cy.wait(1000)
      
      // Should only show high priority tasks
      cy.contains('High').should('be.visible')
    })

    it('UI-TC-016: Should search tasks by title', () => {
      TasksPage.visit()
      cy.wait(1000)
      
      TasksPage.searchTasks('Completed')
      cy.wait(1000)
      
      TasksPage.verifyTaskExists('Completed Task')
    })
  })

  describe('Task Sorting', () => {
    beforeEach(() => {
      // Create tasks with different due dates
      cy.createTask({
        title: 'Task Due Later',
        dueDate: '2024-12-31',
      })
      
      cy.createTask({
        title: 'Task Due Earlier',
        dueDate: '2024-12-01',
      })
      
      cy.reload()
    })

    it('UI-TC-017: Should sort tasks by due date', () => {
      TasksPage.visit()
      cy.wait(1000)
      
      TasksPage.sortTasks('dueDate')
      cy.wait(1000)
      
      // Verify tasks are sorted (earlier dates first)
      cy.get('[data-testid="task-card"]').first().should('contain', 'Task Due Earlier')
    })
  })

  describe('Task Completion', () => {
    beforeEach(() => {
      cy.createTask({
        title: 'Task to Complete',
        completed: false,
      })
      cy.reload()
    })

    it('UI-TC-018: Should toggle task completion status', () => {
      TasksPage.visit()
      cy.wait(1000)
      
      TasksPage.toggleTaskCompletion(0)
      cy.waitForToast('Task status updated', 'success')
      
      // Verify task is marked as completed
      cy.get('input[type="checkbox"]').first().should('be.checked')
    })
  })

  describe('Task Editing', () => {
    let taskId

    beforeEach(() => {
      cy.createTask({
        title: 'Task to Edit',
        description: 'Original description',
        priority: 'Medium',
      }).then((response) => {
        taskId = response.body.task._id
      })
      cy.reload()
    })

    it('UI-TC-019: Should edit task', () => {
      TasksPage.visit()
      cy.wait(1000)
      
      TasksPage.editTask(0)
      
      // Update task fields
      TasksPage.fillTaskTitle('Updated Task Title')
      TasksPage.fillTaskDescription('Updated description')
      TasksPage.selectPriority('Low')
      TasksPage.submitTask()
      
      cy.waitForToast('Task updated', 'success')
      TasksPage.verifyTaskExists('Updated Task Title')
    })
  })

  describe('Task Deletion', () => {
    beforeEach(() => {
      cy.createTask({
        title: 'Task to Delete',
      })
      cy.reload()
    })

    it('UI-TC-020: Should delete task', () => {
      TasksPage.visit()
      cy.wait(1000)
      
      TasksPage.verifyTaskExists('Task to Delete')
      
      TasksPage.deleteTask(0)
      
      // Confirm deletion if confirmation dialog appears
      cy.get('body').then(($body) => {
        if ($body.find('[data-testid="confirm-delete"]').length > 0) {
          cy.get('[data-testid="confirm-delete"]').click()
        }
      })
      
      cy.waitForToast('Task deleted', 'success')
      cy.contains('Task to Delete').should('not.exist')
    })
  })

  describe('View Modes', () => {
    beforeEach(() => {
      cy.createTask({ title: 'View Test Task 1' })
      cy.createTask({ title: 'View Test Task 2' })
      cy.reload()
    })

    it('UI-TC-021: Should switch between list and grid view', () => {
      TasksPage.visit()
      cy.wait(1000)
      
      // Toggle to grid view
      TasksPage.toggleView()
      cy.wait(500)
      
      // Toggle back to list view
      TasksPage.toggleView()
      cy.wait(500)
      
      // Verify tasks are still visible
      TasksPage.verifyTaskExists('View Test Task 1')
    })
  })

  describe('Empty State', () => {
    beforeEach(() => {
      cy.clearTasks()
      cy.reload()
    })

    it('Should display empty state when no tasks exist', () => {
      TasksPage.visit()
      cy.wait(1000)
      
      TasksPage.verifyNoTasks()
      cy.contains('Create your first task').should('be.visible')
    })
  })
})

