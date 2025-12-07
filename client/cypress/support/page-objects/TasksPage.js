/**
 * Tasks Page Object Model
 * Contains selectors and methods for the Tasks page
 */
class TasksPage {
  // Selectors
  get createTaskButton() {
    return cy.contains("button", "Create New Task");
  }

  get taskForm() {
    return cy.get('[data-testid="task-form"], form');
  }

  get taskTitleInput() {
    return cy.get('input[name="title"], input[placeholder*="title" i]');
  }

  get taskDescriptionInput() {
    return cy.get(
      'textarea[name="description"], textarea[placeholder*="description" i]'
    );
  }

  get taskDueDateInput() {
    return cy.get('input[name="dueDate"], input[type="date"]');
  }

  get taskPrioritySelect() {
    return cy.get('select[name="priority"], [data-testid="priority-select"]');
  }

  get taskTagsSelect() {
    return cy.get('[data-testid="tags-select"], select[name="tags"]');
  }

  get submitTaskButton() {
    return cy
      .contains("button", "Create Task")
      .or(cy.contains("button", "Update Task"))
      .or(cy.contains("button", "Save"));
  }

  get taskList() {
    return cy.get('[data-testid="task-list"], .task-list, [class*="task"]');
  }

  get taskCard() {
    return cy.get(
      '[data-testid="task-card"], .task-card, [class*="task-card"]'
    );
  }

  get statusFilter() {
    return cy.get('select[name="status"], [data-testid="status-filter"]');
  }

  get priorityFilter() {
    return cy.get('select[name="priority"], [data-testid="priority-filter"]');
  }

  get searchInput() {
    return cy.get('input[name="search"], input[placeholder*="search" i]');
  }

  get sortSelect() {
    return cy.get('select[name="sortBy"], [data-testid="sort-select"]');
  }

  get viewToggle() {
    return cy.get('[data-testid="view-toggle"], button[aria-label*="view" i]');
  }

  get exportPDFButton() {
    return cy.contains("button", "Export PDF");
  }

  get exportCSVButton() {
    return cy.contains("button", "Export CSV");
  }

  get taskCheckbox() {
    return cy.get('input[type="checkbox"]');
  }

  get deleteTaskButton() {
    return cy.get(
      '[data-testid="delete-task"], button[aria-label*="delete" i]'
    );
  }

  get editTaskButton() {
    return cy.get('[data-testid="edit-task"], a[href*="/edit"]');
  }

  // Methods
  visit() {
    // Use loginAndVisit to ensure token is set before page loads
    cy.loginAndVisit("/tasks").then(() => {
      this.waitForPageLoad();
    });
  }

  waitForPageLoad() {
    cy.get("body").should("be.visible");
    
    // Wait for the page to fully load and check if we're on the right page
    cy.url({ timeout: 15000 }).should("include", "/tasks");
    
    // Wait for Tasks heading to appear - this confirms the page loaded correctly
    // If we're redirected to login, this will timeout and show a clear error
    cy.contains("Tasks", { timeout: 15000 }).should("be.visible");
    
    // Additional check - verify we're not on login page
    cy.url().should("not.include", "/login");
  }

  clickCreateTask() {
    this.createTaskButton.click();
    return this;
  }

  fillTaskTitle(title) {
    this.taskTitleInput.clear().type(title);
    return this;
  }

  fillTaskDescription(description) {
    this.taskDescriptionInput.clear().type(description);
    return this;
  }

  selectDueDate(date) {
    this.taskDueDateInput.clear().type(date);
    return this;
  }

  selectPriority(priority) {
    this.taskPrioritySelect.select(priority);
    return this;
  }

  selectTags(tags) {
    // Handle multi-select or checkbox selection
    if (Array.isArray(tags)) {
      tags.forEach((tag) => {
        cy.contains("label", tag).click();
      });
    }
    return this;
  }

  submitTask() {
    this.submitTaskButton.click();
    return this;
  }

  createTask(taskData) {
    this.clickCreateTask();
    if (taskData.title) this.fillTaskTitle(taskData.title);
    if (taskData.description) this.fillTaskDescription(taskData.description);
    if (taskData.dueDate) this.selectDueDate(taskData.dueDate);
    if (taskData.priority) this.selectPriority(taskData.priority);
    if (taskData.tags) this.selectTags(taskData.tags);
    this.submitTask();
  }

  filterByStatus(status) {
    this.statusFilter.select(status);
    return this;
  }

  filterByPriority(priority) {
    this.priorityFilter.select(priority);
    return this;
  }

  searchTasks(searchTerm) {
    this.searchInput.clear().type(searchTerm);
    return this;
  }

  sortTasks(sortBy) {
    this.sortSelect.select(sortBy);
    return this;
  }

  toggleView() {
    this.viewToggle.click();
    return this;
  }

  exportToPDF() {
    this.exportPDFButton.click();
    return this;
  }

  exportToCSV() {
    this.exportCSVButton.click();
    return this;
  }

  toggleTaskCompletion(taskIndex = 0) {
    this.taskCheckbox.eq(taskIndex).click();
    return this;
  }

  deleteTask(taskIndex = 0) {
    this.deleteTaskButton.eq(taskIndex).click();
    return this;
  }

  editTask(taskIndex = 0) {
    this.editTaskButton.eq(taskIndex).click();
    return this;
  }

  verifyTaskExists(taskTitle) {
    cy.contains(taskTitle).should("be.visible");
  }

  verifyTaskCount(count) {
    this.taskCard.should("have.length", count);
  }

  verifyNoTasks() {
    cy.contains("No tasks found").should("be.visible");
  }
}

export default new TasksPage();
