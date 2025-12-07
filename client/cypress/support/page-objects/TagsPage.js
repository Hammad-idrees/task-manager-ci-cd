/**
 * Tags Page Object Model
 * Contains selectors and methods for the Tags page
 */
class TagsPage {
  // Selectors
  get addTagButton() {
    return cy.contains("button", "Add Tag");
  }

  get tagNameInput() {
    return cy.get(
      'input[type="text"][placeholder*="tag" i], input[name="name"]'
    );
  }

  get createTagButton() {
    return cy.contains("button", "Create");
  }

  get tagCard() {
    return cy.get('[data-testid="tag-card"], .tag-card, [class*="tag"]');
  }

  get editTagButton() {
    return cy.get('[data-testid="edit-tag"], button[aria-label*="edit" i]');
  }

  get deleteTagButton() {
    return cy.get('[data-testid="delete-tag"], button[aria-label*="delete" i]');
  }

  get filterTasksButton() {
    return cy.contains("button", "Filter Tasks");
  }

  get searchInput() {
    return cy.get('input[placeholder*="search" i], input[name="search"]');
  }

  get confirmDeleteButton() {
    return cy
      .contains("button", "Delete")
      .or(cy.get('[data-testid="confirm-delete"]'));
  }

  get cancelDeleteButton() {
    return cy.contains("button", "Cancel");
  }

  // Methods
  visit() {
    // Use loginAndVisit to ensure token is set before page loads
    cy.loginAndVisit("/tags").then(() => {
      this.waitForPageLoad();
    });
  }

  waitForPageLoad() {
    cy.get("body").should("be.visible");
    
    // Wait for the page to fully load and check if we're on the right page
    cy.url({ timeout: 15000 }).should("include", "/tags");
    
    // Wait for Tags heading to appear - this confirms the page loaded correctly
    // If we're redirected to login, this will timeout and show a clear error
    cy.contains("Tags", { timeout: 15000 }).should("be.visible");
    
    // Additional check - verify we're not on login page
    cy.url().should("not.include", "/login");
  }

  clickAddTag() {
    this.addTagButton.click();
    return this;
  }

  fillTagName(name) {
    this.tagNameInput.clear().type(name);
    return this;
  }

  clickCreate() {
    this.createTagButton.click();
    return this;
  }

  createTag(tagName) {
    this.clickAddTag();
    this.fillTagName(tagName);
    this.clickCreate();
  }

  editTag(tagIndex, newName) {
    this.editTagButton.eq(tagIndex).click();
    cy.get("input[value]").clear().type(newName);
    cy.contains("button", "Save").click();
    return this;
  }

  deleteTag(tagIndex) {
    this.deleteTagButton.eq(tagIndex).click();
    this.confirmDeleteButton.click();
    return this;
  }

  filterTasksByTag(tagIndex) {
    this.filterTasksButton.eq(tagIndex).click();
    return this;
  }

  searchTasks(searchTerm) {
    this.searchInput.clear().type(searchTerm);
    return this;
  }

  verifyTagExists(tagName) {
    cy.contains(tagName).should("be.visible");
  }

  verifyTagCount(count) {
    this.tagCard.should("have.length", count);
  }

  verifyNoTags() {
    cy.contains("No tags created yet").should("be.visible");
  }
}

export default new TagsPage();
