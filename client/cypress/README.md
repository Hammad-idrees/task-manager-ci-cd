# Cypress E2E Testing Documentation

## Overview

This directory contains end-to-end (E2E) tests for the Task Manager Application using Cypress. The tests cover UI functionality, user interactions, and complete user workflows.

## Test Structure

```
cypress/
├── e2e/                    # E2E test files
│   ├── authentication.cy.js
│   ├── tasks.cy.js
│   ├── tags.cy.js
│   ├── export.cy.js
│   └── navigation.cy.js
├── fixtures/              # Test data
│   └── test-data.json
├── support/               # Support files
│   ├── commands.js        # Custom Cypress commands
│   ├── e2e.js            # E2E support file
│   └── page-objects/     # Page Object Models
│       ├── LoginPage.js
│       ├── RegisterPage.js
│       ├── TasksPage.js
│       └── TagsPage.js
├── screenshots/           # Screenshots on failure
└── videos/               # Test execution videos
```

## Prerequisites

1. **Node.js** (v18 or higher)
2. **Application running:**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:5000`
3. **Database:** MongoDB accessible

## Installation

Install Cypress and dependencies:

```bash
cd client
npm install --save-dev cypress
```

Or if using yarn:

```bash
yarn add -D cypress
```

## Configuration

Cypress configuration is in `cypress.config.js`. Key settings:

- **Base URL:** `http://localhost:5173`
- **Viewport:** 1280x720
- **Video:** Enabled
- **Screenshots:** Enabled on failure
- **API URL:** `http://localhost:5000/api` (via environment variable)

## Running Tests

### Open Cypress Test Runner (Interactive Mode)

```bash
npm run cypress:open
```

This opens the Cypress Test Runner where you can:

- Select and run individual tests
- Watch tests execute in real-time
- Debug tests interactively

### Run Tests in Headless Mode

```bash
npm run cypress:run
```

This runs all tests in headless mode (no browser UI).

### Run Specific Test File

```bash
npx cypress run --spec "cypress/e2e/authentication.cy.js"
```

### Run Tests in Specific Browser

```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge
```

## Test Files

### 1. Authentication Tests (`authentication.cy.js`)

Tests for user registration, login, logout, and protected routes:

- User registration with valid/invalid data
- User login with valid/invalid credentials
- Logout functionality
- Protected route access
- Navigation between login/register pages

**Test Cases Covered:**

- UI-TC-001 to UI-TC-009

### 2. Tasks Tests (`tasks.cy.js`)

Tests for task management functionality:

- Task creation (with all fields, minimal fields)
- Task viewing and display
- Task filtering (by status, priority, search)
- Task sorting
- Task completion toggle
- Task editing
- Task deletion
- View mode switching

**Test Cases Covered:**

- UI-TC-010 to UI-TC-021

### 3. Tags Tests (`tags.cy.js`)

Tests for tag management functionality:

- Tag creation
- Tag editing
- Tag deletion
- Tag filtering
- Tag usage count

**Test Cases Covered:**

- UI-TC-022 to UI-TC-025

### 4. Export Tests (`export.cy.js`)

Tests for data export functionality:

- CSV export
- PDF export
- Export with filters
- Empty state handling

**Test Cases Covered:**

- UI-TC-026 to UI-TC-027

### 5. Navigation Tests (`navigation.cy.js`)

Tests for navigation functionality:

- Page navigation via links
- Browser back/forward navigation
- Direct URL navigation

**Test Cases Covered:**

- UI-TC-028

## Page Object Model (POM)

We use the Page Object Model pattern to organize test code:

### Benefits:

- **Reusability:** Page objects can be reused across multiple tests
- **Maintainability:** Changes to UI only require updates in one place
- **Readability:** Tests are more readable and easier to understand

### Available Page Objects:

1. **LoginPage** - Login page interactions
2. **RegisterPage** - Registration page interactions
3. **TasksPage** - Tasks page interactions
4. **TagsPage** - Tags page interactions

### Example Usage:

```javascript
import LoginPage from "../support/page-objects/LoginPage";

LoginPage.visit();
LoginPage.login("user@example.com", "password123");
LoginPage.verifyLoginSuccess();
```

## Custom Commands

Custom Cypress commands are defined in `cypress/support/commands.js`:

### Available Commands:

1. **`cy.login(email, password)`** - Login a user via API
2. **`cy.register(name, email, password)`** - Register a new user via API
3. **`cy.logout()`** - Logout current user
4. **`cy.createTask(taskData)`** - Create a task via API
5. **`cy.createTag(tagName)`** - Create a tag via API
6. **`cy.waitForToast(message, type)`** - Wait for toast notification
7. **`cy.clearTasks()`** - Clear all tasks for current user
8. **`cy.clearTags()`** - Clear all tags for current user

### Example Usage:

```javascript
// Login before test
cy.login("test@example.com", "password123");

// Create test data
cy.createTask({
  title: "Test Task",
  priority: "High",
});

// Wait for toast
cy.waitForToast("Task created successfully", "success");
```

## Test Data

Test data is stored in `cypress/fixtures/test-data.json`:

```json
{
  "users": {
    "validUser": { ... },
    "invalidUser": { ... }
  },
  "tasks": { ... },
  "tags": { ... }
}
```

### Loading Fixtures:

```javascript
cy.fixture("test-data").then((data) => {
  const user = data.users.validUser;
  // Use user data
});
```

## Best Practices

### 1. Use Page Objects

Always use Page Objects for UI interactions instead of direct selectors.

### 2. Use Custom Commands

Use custom commands for common operations (login, create data, etc.).

### 3. Clean Up Test Data

Use `beforeEach` and `afterEach` hooks to set up and clean up test data.

### 4. Wait for Elements

Use Cypress's built-in waiting mechanisms instead of hard-coded `cy.wait()`.

### 5. Use Data Attributes

Prefer `data-testid` attributes for selectors when possible.

### 6. Isolate Tests

Each test should be independent and not rely on other tests.

## Debugging

### Debug Mode

Run tests with debug output:

```bash
DEBUG=cypress:* npm run cypress:open
```

### Pause Execution

Add `cy.pause()` in your test to pause execution:

```javascript
it("should do something", () => {
  cy.visit("/tasks");
  cy.pause(); // Execution pauses here
  // Continue test
});
```

### Screenshots and Videos

- Screenshots are automatically taken on test failure
- Videos are recorded for all test runs
- Located in `cypress/screenshots/` and `cypress/videos/`

## CI/CD Integration

### GitHub Actions Example

```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm install
      - run: npm run build
      - run: npm run cypress:run
```

## Troubleshooting

### Tests Failing Due to Timing

- Use Cypress's built-in waiting (`.should('be.visible')`)
- Avoid hard-coded `cy.wait()` when possible

### Element Not Found

- Check if element is visible (not hidden by CSS)
- Verify selector is correct
- Use Cypress's selector playground

### API Requests Failing

- Verify backend server is running
- Check API URL in `cypress.config.js`
- Verify authentication token is valid

## Test Coverage

Current test coverage:

- **Authentication:** 9 test cases
- **Tasks Management:** 12 test cases
- **Tags Management:** 4 test cases
- **Export:** 2 test cases
- **Navigation:** 1 test case

**Total:** 28 UI test cases covered

## Next Steps

1. Add more edge case tests
2. Add visual regression tests
3. Add performance tests
4. Add accessibility tests
5. Integrate with CI/CD pipeline

## Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Page Object Model Pattern](https://docs.cypress.io/guides/references/best-practices#Organizing-Tests-Logging-In-Controlling-State)

---

**Last Updated:** 2024
