# Cypress Authentication Fixes

## Issue Description

Tests were failing because:
1. `cy.login()` was setting localStorage AFTER the page loaded
2. When visiting protected routes (`/tasks`, `/tags`), the app would redirect to `/login` because it couldn't find the token
3. Page objects were looking for "Tasks" or "Tags" but the page had redirected to login

## Root Cause

The React app's `AuthContext` checks for a token in localStorage when it initializes. If no token is found, it redirects to `/login`. The original `cy.login()` command was setting localStorage in the Cypress context, but when `cy.visit()` created a new browser context, the localStorage wasn't properly set before the page loaded.

## Solution

### 1. Created `cy.loginAndVisit()` Command

This new command:
- Logs in via API
- Sets localStorage **BEFORE** the page loads using `onBeforeLoad` callback
- Ensures the token is available when React app initializes

```javascript
cy.loginAndVisit('/tasks')
```

### 2. Updated Page Objects

Updated `TasksPage.visit()` and `TagsPage.visit()` to use `cy.loginAndVisit()` instead of separate login and visit calls.

### 3. Fixed Token Access in Commands

Updated `createTask`, `createTag`, `clearTasks`, and `clearTags` to properly access localStorage from the window object:

```javascript
cy.window().then((win) => {
  const token = win.localStorage.getItem('token')
  // Use token...
})
```

## Changes Made

### Files Modified:

1. **`cypress/support/commands.js`**
   - Added `cy.loginAndVisit()` command
   - Updated `cy.login()` to use `cy.window()` for localStorage
   - Fixed all API commands to properly access localStorage

2. **`cypress/support/page-objects/TasksPage.js`**
   - Updated `visit()` to use `cy.loginAndVisit()`
   - Simplified `waitForPageLoad()`

3. **`cypress/support/page-objects/TagsPage.js`**
   - Updated `visit()` to use `cy.loginAndVisit()`
   - Simplified `waitForPageLoad()`

4. **`cypress/e2e/tasks.cy.js`**
   - Removed redundant `cy.login()` from `beforeEach`
   - Now relies on `TasksPage.visit()` to handle login

5. **`cypress/e2e/tags.cy.js`**
   - Removed redundant `cy.login()` from `beforeEach`
   - Now relies on `TagsPage.visit()` to handle login

6. **`cypress/e2e/export.cy.js`**
   - Removed redundant `cy.login()` from `beforeEach`
   - Now relies on `TasksPage.visit()` to handle login

## How It Works Now

1. **Test starts:**
   ```javascript
   beforeEach(() => {
     TasksPage.visit() // This calls cy.loginAndVisit('/tasks')
   })
   ```

2. **`cy.loginAndVisit()` executes:**
   - Makes API call to login
   - Gets token and user data
   - Visits page with `onBeforeLoad` callback
   - Sets localStorage BEFORE page loads

3. **React app initializes:**
   - Reads token from localStorage
   - Makes API call to `/auth/profile`
   - User is authenticated
   - Page renders correctly

4. **Test continues:**
   - Page objects can interact with the page
   - Tests execute successfully

## Testing the Fix

Run the tests again:

```bash
npm run cypress:open
```

Or headless:

```bash
npm run cypress:run
```

The tests should now:
- ✅ Successfully login
- ✅ Visit protected routes without redirect
- ✅ Find "Tasks" and "Tags" text on pages
- ✅ Execute all test steps

## Additional Notes

- The `cy.login()` command still exists for cases where you need to login without visiting a page
- Use `cy.loginAndVisit()` when you need to login and visit a protected route
- All API commands (`createTask`, `createTag`, etc.) now properly access localStorage

## Troubleshooting

If tests still fail:

1. **Check if backend is running:**
   ```bash
   # Backend should be on http://localhost:5000
   ```

2. **Check if frontend is running:**
   ```bash
   # Frontend should be on http://localhost:5173
   ```

3. **Verify test user exists:**
   - The default test user is `test@example.com` / `password123`
   - If it doesn't exist, tests will create it automatically

4. **Check browser console:**
   - Open Cypress and check for JavaScript errors
   - Verify localStorage has token after login

5. **Check network requests:**
   - Verify `/api/auth/login` returns 200
   - Verify `/api/auth/profile` returns 200 (not 401)

---

**Last Updated:** 2024

