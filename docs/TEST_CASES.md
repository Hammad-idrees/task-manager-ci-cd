# Test Cases Document
## Task Manager Application - Comprehensive Test Cases

**Document Version:** 1.0  
**Date:** 2024  
**Prepared By:** Testing Team  
**Status:** Draft

---

## Table of Contents

1. [Test Case Overview](#1-test-case-overview)
2. [UI Test Cases](#2-ui-test-cases)
3. [Backend API Test Cases](#3-backend-api-test-cases)
4. [Unit Test Cases](#4-unit-test-cases)
5. [Integration Test Cases](#5-integration-test-cases)
6. [Security Test Cases](#6-security-test-cases)
7. [Performance Test Cases](#7-performance-test-cases)

---

## 1. Test Case Overview

### 1.1 Test Case Naming Convention

- **UI Test Cases:** UI-TC-XXX (e.g., UI-TC-001)
- **API Test Cases:** API-TC-XXX (e.g., API-TC-001)
- **Unit Test Cases:** UNIT-TC-XXX (e.g., UNIT-TC-001)
- **Integration Test Cases:** INT-TC-XXX (e.g., INT-TC-001)
- **Security Test Cases:** SEC-TC-XXX (e.g., SEC-TC-001)
- **Performance Test Cases:** PERF-TC-XXX (e.g., PERF-TC-001)

### 1.2 Priority Levels

- **P0 (Critical):** Must pass for release
- **P1 (High):** Important functionality
- **P2 (Medium):** Standard functionality
- **P3 (Low):** Nice to have

### 1.3 Test Case Status

- **Not Executed:** Test case not yet run
- **Pass:** Test case passed
- **Fail:** Test case failed
- **Blocked:** Test case cannot be executed
- **Skipped:** Test case skipped

---

## 2. UI Test Cases

### 2.1 Authentication UI Test Cases

#### UI-TC-001: User Registration with Valid Data

**Priority:** P0 (Critical)  
**Test Type:** Functional, UI, Black-Box  
**Module:** Authentication

**Preconditions:**
- Application is running and accessible
- User is on the registration page (`/register`)
- No user exists with the test email

**Test Data:**
```javascript
{
  name: "John Doe",
  email: "john.doe@example.com",
  password: "password123",
  confirmPassword: "password123"
}
```

**Test Steps:**
1. Navigate to `/register` page
2. Verify registration form is displayed
3. Enter name: "John Doe"
4. Enter email: "john.doe@example.com"
5. Enter password: "password123"
6. Enter confirm password: "password123"
7. Click "Create Your Account" button
8. Wait for API response

**Expected Result:**
- Form validation passes
- Success toast notification appears: "Account created successfully! Please sign in."
- User is redirected to `/login` page
- User account is created in database

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### UI-TC-002: User Registration with Invalid Email Format

**Priority:** P1 (High)  
**Test Type:** Functional, UI, Black-Box  
**Module:** Authentication

**Preconditions:**
- Application is running
- User is on the registration page (`/register`)

**Test Data:**
```javascript
{
  name: "John Doe",
  email: "invalid-email",
  password: "password123",
  confirmPassword: "password123"
}
```

**Test Steps:**
1. Navigate to `/register` page
2. Enter name: "John Doe"
3. Enter email: "invalid-email"
4. Enter password: "password123"
5. Enter confirm password: "password123"
6. Click "Create Your Account" button

**Expected Result:**
- Email validation error is displayed: "Please enter a valid email address"
- Form submission is prevented
- User remains on registration page
- No API request is sent

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### UI-TC-003: User Registration with Password Mismatch

**Priority:** P1 (High)  
**Test Type:** Functional, UI, Black-Box  
**Module:** Authentication

**Preconditions:**
- Application is running
- User is on the registration page (`/register`)

**Test Data:**
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  password: "password123",
  confirmPassword: "password456"
}
```

**Test Steps:**
1. Navigate to `/register` page
2. Enter name: "John Doe"
3. Enter email: "john@example.com"
4. Enter password: "password123"
5. Enter confirm password: "password456"
6. Click "Create Your Account" button

**Expected Result:**
- Password mismatch error is displayed: "Passwords do not match"
- Form submission is prevented
- User remains on registration page
- No API request is sent

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### UI-TC-004: User Registration with Duplicate Email

**Priority:** P1 (High)  
**Test Type:** Functional, UI, Black-Box  
**Module:** Authentication

**Preconditions:**
- Application is running
- User account with email "existing@example.com" already exists
- User is on the registration page (`/register`)

**Test Data:**
```javascript
{
  name: "Jane Doe",
  email: "existing@example.com",
  password: "password123",
  confirmPassword: "password123"
}
```

**Test Steps:**
1. Navigate to `/register` page
2. Enter name: "Jane Doe"
3. Enter email: "existing@example.com"
4. Enter password: "password123"
5. Enter confirm password: "password123"
6. Click "Create Your Account" button
7. Wait for API response

**Expected Result:**
- Error toast notification appears: "An account with this email already exists"
- User remains on registration page
- No new user account is created

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### UI-TC-005: User Login with Valid Credentials

**Priority:** P0 (Critical)  
**Test Type:** Functional, UI, Black-Box  
**Module:** Authentication

**Preconditions:**
- Application is running
- User account exists with email "test@example.com" and password "password123"
- User is on the login page (`/login`)

**Test Data:**
```javascript
{
  email: "test@example.com",
  password: "password123"
}
```

**Test Steps:**
1. Navigate to `/login` page
2. Verify login form is displayed
3. Enter email: "test@example.com"
4. Enter password: "password123"
5. Click "Sign In to TaskFlow" button
6. Wait for API response

**Expected Result:**
- Form validation passes
- Success toast notification appears: "Welcome back! Login successful"
- JWT token is stored in localStorage/sessionStorage
- User is redirected to `/dashboard` page
- Navbar displays user information

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### UI-TC-006: User Login with Invalid Email

**Priority:** P1 (High)  
**Test Type:** Functional, UI, Black-Box  
**Module:** Authentication

**Preconditions:**
- Application is running
- User is on the login page (`/login`)

**Test Data:**
```javascript
{
  email: "nonexistent@example.com",
  password: "password123"
}
```

**Test Steps:**
1. Navigate to `/login` page
2. Enter email: "nonexistent@example.com"
3. Enter password: "password123"
4. Click "Sign In to TaskFlow" button
5. Wait for API response

**Expected Result:**
- Error toast notification appears: "Invalid email or password" or "Account not found. Please check your email."
- User remains on login page
- No JWT token is stored
- User is not redirected

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### UI-TC-007: User Login with Invalid Password

**Priority:** P1 (High)  
**Test Type:** Functional, UI, Black-Box  
**Module:** Authentication

**Preconditions:**
- Application is running
- User account exists with email "test@example.com" and password "password123"
- User is on the login page (`/login`)

**Test Data:**
```javascript
{
  email: "test@example.com",
  password: "wrongpassword"
}
```

**Test Steps:**
1. Navigate to `/login` page
2. Enter email: "test@example.com"
3. Enter password: "wrongpassword"
4. Click "Sign In to TaskFlow" button
5. Wait for API response

**Expected Result:**
- Error toast notification appears: "Invalid email or password"
- User remains on login page
- No JWT token is stored
- User is not redirected

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### UI-TC-008: User Logout

**Priority:** P1 (High)  
**Test Type:** Functional, UI, Black-Box  
**Module:** Authentication

**Preconditions:**
- Application is running
- User is logged in
- User is on any authenticated page (e.g., `/dashboard`)

**Test Steps:**
1. Verify user is logged in (check navbar for user info)
2. Click logout button in navbar
3. Wait for logout to complete

**Expected Result:**
- JWT token is removed from storage
- User is redirected to `/login` page
- Protected routes are no longer accessible
- User session is terminated

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### UI-TC-009: Protected Route Access Without Authentication

**Priority:** P1 (High)  
**Test Type:** Functional, UI, Black-Box  
**Module:** Authentication

**Preconditions:**
- Application is running
- User is not logged in (no JWT token in storage)

**Test Steps:**
1. Navigate directly to `/dashboard` (or any protected route)
2. Observe application behavior

**Expected Result:**
- User is redirected to `/login` page
- Protected route is not accessible
- Error message or notification may appear (optional)

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

### 2.2 Task Management UI Test Cases

#### UI-TC-010: Create Task with All Fields

**Priority:** P0 (Critical)  
**Test Type:** Functional, UI, Black-Box  
**Module:** Task Management

**Preconditions:**
- User is logged in
- User is on the tasks page (`/tasks`)
- At least one tag exists in the system

**Test Data:**
```javascript
{
  title: "Complete Project Documentation",
  description: "Write comprehensive documentation for the project",
  dueDate: "2024-12-31",
  priority: "High",
  tags: ["tag_id_1"]
}
```

**Test Steps:**
1. Navigate to `/tasks` page
2. Click "Create New Task" button
3. Verify task form modal opens
4. Enter title: "Complete Project Documentation"
5. Enter description: "Write comprehensive documentation for the project"
6. Select due date: "2024-12-31"
7. Select priority: "High"
8. Select tag(s) from dropdown
9. Click "Create Task" button
10. Wait for API response

**Expected Result:**
- Form validation passes
- Task is created successfully
- Success toast notification appears: "Task created successfully"
- Task form modal closes
- New task appears in the task list
- Task displays with correct priority badge and tags

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### UI-TC-011: Create Task with Only Required Fields

**Priority:** P0 (Critical)  
**Test Type:** Functional, UI, Black-Box  
**Module:** Task Management

**Preconditions:**
- User is logged in
- User is on the tasks page (`/tasks`)

**Test Data:**
```javascript
{
  title: "Minimal Task"
}
```

**Test Steps:**
1. Navigate to `/tasks` page
2. Click "Create New Task" button
3. Enter title: "Minimal Task"
4. Click "Create Task" button
5. Wait for API response

**Expected Result:**
- Task is created successfully with default values
- Priority defaults to "Medium"
- Task status defaults to "Pending" (not completed)
- Success toast notification appears
- Task appears in the task list

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### UI-TC-012: Create Task with Missing Required Field

**Priority:** P1 (High)  
**Test Type:** Functional, UI, Black-Box  
**Module:** Task Management

**Preconditions:**
- User is logged in
- User is on the tasks page (`/tasks`)

**Test Steps:**
1. Navigate to `/tasks` page
2. Click "Create New Task" button
3. Leave title field empty
4. Enter description: "Test description"
5. Click "Create Task" button

**Expected Result:**
- Form validation error appears for title field
- Form submission is prevented
- Error message: "Title is required" or similar
- Task is not created
- User remains on task form

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### UI-TC-013: View All Tasks

**Priority:** P0 (Critical)  
**Test Type:** Functional, UI, Black-Box  
**Module:** Task Management

**Preconditions:**
- User is logged in
- User has at least 3 tasks in the system
- User is on the tasks page (`/tasks`)

**Test Steps:**
1. Navigate to `/tasks` page
2. Wait for tasks to load
3. Verify task list is displayed
4. Check task count matches expected number

**Expected Result:**
- All user's tasks are displayed
- Task list shows correct number of tasks
- Each task displays:
  - Title
  - Description (if available)
  - Due date
  - Priority badge
  - Status badge
  - Tags (if any)
- Loading indicator appears while fetching
- No error messages

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### UI-TC-014: Filter Tasks by Status (Completed)

**Priority:** P1 (High)  
**Test Type:** Functional, UI, Black-Box  
**Module:** Task Management

**Preconditions:**
- User is logged in
- User has both completed and pending tasks
- User is on the tasks page (`/tasks`)

**Test Steps:**
1. Navigate to `/tasks` page
2. Wait for tasks to load
3. Locate status filter dropdown
4. Select "Completed" from status filter
5. Observe task list

**Expected Result:**
- Only completed tasks are displayed
- Pending tasks are hidden
- Task count updates to show filtered count
- Filter selection is visually indicated

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### UI-TC-015: Filter Tasks by Priority (High)

**Priority:** P1 (High)  
**Test Type:** Functional, UI, Black-Box  
**Module:** Task Management

**Preconditions:**
- User is logged in
- User has tasks with different priorities
- User is on the tasks page (`/tasks`)

**Test Steps:**
1. Navigate to `/tasks` page
2. Wait for tasks to load
3. Locate priority filter dropdown
4. Select "High Priority" from priority filter
5. Observe task list

**Expected Result:**
- Only high priority tasks are displayed
- Tasks with other priorities are hidden
- Task count updates to show filtered count
- Filter selection is visually indicated

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### UI-TC-016: Search Tasks by Title

**Priority:** P1 (High)  
**Test Type:** Functional, UI, Black-Box  
**Module:** Task Management

**Preconditions:**
- User is logged in
- User has tasks with various titles
- User is on the tasks page (`/tasks`)

**Test Data:**
```javascript
{
  searchTerm: "Project"
}
```

**Test Steps:**
1. Navigate to `/tasks` page
2. Wait for tasks to load
3. Locate search input field
4. Enter search term: "Project"
5. Wait for search results

**Expected Result:**
- Only tasks with "Project" in title or description are displayed
- Search is case-insensitive
- Task count updates to show filtered count
- Search term is displayed in input field

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### UI-TC-017: Sort Tasks by Due Date

**Priority:** P2 (Medium)  
**Test Type:** Functional, UI, Black-Box  
**Module:** Task Management

**Preconditions:**
- User is logged in
- User has tasks with different due dates
- User is on the tasks page (`/tasks`)

**Test Steps:**
1. Navigate to `/tasks` page
2. Wait for tasks to load
3. Locate sort dropdown
4. Select "Due Date" from sort options
5. Observe task list order

**Expected Result:**
- Tasks are sorted by due date (ascending)
- Tasks with earlier due dates appear first
- Tasks without due dates appear at the end (or beginning, depending on implementation)
- Sort selection is visually indicated

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### UI-TC-018: Toggle Task Completion Status

**Priority:** P0 (Critical)  
**Test Type:** Functional, UI, Black-Box  
**Module:** Task Management

**Preconditions:**
- User is logged in
- User has at least one pending task
- User is on the tasks page (`/tasks`)

**Test Steps:**
1. Navigate to `/tasks` page
2. Wait for tasks to load
3. Locate a pending task
4. Click the completion checkbox
5. Wait for API response

**Expected Result:**
- Task completion status toggles to "Completed"
- Task is visually marked as completed (strikethrough, different color)
- Task moves to completed section (if filtered)
- Success toast notification appears: "Task status updated"
- API request is sent successfully

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### UI-TC-019: Edit Task

**Priority:** P0 (Critical)  
**Test Type:** Functional, UI, Black-Box  
**Module:** Task Management

**Preconditions:**
- User is logged in
- User has at least one task
- User is on the tasks page (`/tasks`)

**Test Data:**
```javascript
{
  updatedTitle: "Updated Task Title",
  updatedDescription: "Updated description",
  updatedPriority: "Low"
}
```

**Test Steps:**
1. Navigate to `/tasks` page
2. Wait for tasks to load
3. Click on a task card/title
4. Verify edit form opens (or navigate to edit page)
5. Update title: "Updated Task Title"
6. Update description: "Updated description"
7. Update priority: "Low"
8. Click "Update Task" or "Save" button
9. Wait for API response

**Expected Result:**
- Task is updated successfully
- Success toast notification appears
- Updated task information is displayed in task list
- Changes are persisted in database

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### UI-TC-020: Delete Task

**Priority:** P0 (Critical)  
**Test Type:** Functional, UI, Black-Box  
**Module:** Task Management

**Preconditions:**
- User is logged in
- User has at least one task
- User is on the tasks page (`/tasks`)

**Test Steps:**
1. Navigate to `/tasks` page
2. Wait for tasks to load
3. Locate delete button on a task
4. Click delete button
5. Confirm deletion (if confirmation dialog appears)
6. Wait for API response

**Expected Result:**
- Task is deleted successfully
- Task is removed from task list
- Success toast notification appears: "Task deleted successfully"
- Task count decreases
- Task is removed from database

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### UI-TC-021: Switch Between List and Grid View

**Priority:** P2 (Medium)  
**Test Type:** Functional, UI, Black-Box  
**Module:** Task Management

**Preconditions:**
- User is logged in
- User has at least 3 tasks
- User is on the tasks page (`/tasks`)

**Test Steps:**
1. Navigate to `/tasks` page
2. Wait for tasks to load
3. Verify current view (list or grid)
4. Click view toggle button
5. Observe task display

**Expected Result:**
- View switches between list and grid
- All tasks are still visible
- View preference is maintained (if implemented)
- UI layout adapts to selected view

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

### 2.3 Tag Management UI Test Cases

#### UI-TC-022: Create Tag

**Priority:** P0 (Critical)  
**Test Type:** Functional, UI, Black-Box  
**Module:** Tag Management

**Preconditions:**
- User is logged in
- User is on the tags page (`/tags`)

**Test Data:**
```javascript
{
  tagName: "Work"
}
```

**Test Steps:**
1. Navigate to `/tags` page
2. Click "Add Tag" button
3. Verify tag creation form appears
4. Enter tag name: "Work"
5. Click "Create" button
6. Wait for API response

**Expected Result:**
- Tag is created successfully
- Success toast notification appears: "Tag created successfully"
- New tag appears in the tags list
- Tag creation form closes or resets
- Tag count increases

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### UI-TC-023: Edit Tag

**Priority:** P1 (High)  
**Test Type:** Functional, UI, Black-Box  
**Module:** Tag Management

**Preconditions:**
- User is logged in
- User has at least one tag
- User is on the tags page (`/tags`)

**Test Data:**
```javascript
{
  updatedTagName: "Personal"
}
```

**Test Steps:**
1. Navigate to `/tags` page
2. Wait for tags to load
3. Hover over a tag card
4. Click edit icon
5. Verify tag name becomes editable
6. Update tag name: "Personal"
7. Click "Save" button
8. Wait for API response

**Expected Result:**
- Tag name is updated successfully
- Success toast notification appears: "Tag updated successfully"
- Updated tag name is displayed
- Edit mode closes
- Changes are persisted in database

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### UI-TC-024: Delete Tag

**Priority:** P1 (High)  
**Test Type:** Functional, UI, Black-Box  
**Module:** Tag Management

**Preconditions:**
- User is logged in
- User has at least one tag
- User is on the tags page (`/tags`)

**Test Steps:**
1. Navigate to `/tags` page
2. Wait for tags to load
3. Hover over a tag card
4. Click delete icon
5. Confirm deletion in confirmation modal
6. Wait for API response

**Expected Result:**
- Tag is deleted successfully
- Success toast notification appears: "Tag deleted successfully"
- Tag is removed from tags list
- Tag count decreases
- Tag is removed from database

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### UI-TC-025: Filter Tasks by Tag

**Priority:** P1 (High)  
**Test Type:** Functional, UI, Black-Box  
**Module:** Tag Management

**Preconditions:**
- User is logged in
- User has at least one tag
- User has tasks with tags assigned
- User is on the tags page (`/tags`)

**Test Steps:**
1. Navigate to `/tags` page
2. Wait for tags to load
3. Click "Filter Tasks" button on a tag
4. Observe tasks section

**Expected Result:**
- Only tasks with the selected tag are displayed
- Filter indicator shows active filter
- Task count updates to show filtered count
- Clear filter option is available

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

### 2.4 Export UI Test Cases

#### UI-TC-026: Export Tasks to CSV

**Priority:** P1 (High)  
**Test Type:** Functional, UI, Black-Box  
**Module:** Export

**Preconditions:**
- User is logged in
- User has at least one task
- User is on the tasks page (`/tasks`)

**Test Steps:**
1. Navigate to `/tasks` page
2. Wait for tasks to load
3. Click "Export CSV" button
4. Wait for file download

**Expected Result:**
- CSV file download is triggered
- File name is "tasks.csv"
- File contains all user's tasks
- CSV format is correct (comma-separated values)
- Success toast notification appears: "Tasks exported to CSV successfully"

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### UI-TC-027: Export Tasks to PDF

**Priority:** P1 (High)  
**Test Type:** Functional, UI, Black-Box  
**Module:** Export

**Preconditions:**
- User is logged in
- User has at least one task
- User is on the tasks page (`/tasks`)

**Test Steps:**
1. Navigate to `/tasks` page
2. Wait for tasks to load
3. Click "Export PDF" button
4. Wait for file download

**Expected Result:**
- PDF file download is triggered
- File name is "tasks.pdf"
- File contains all user's tasks
- PDF format is correct and readable
- Success toast notification appears: "Tasks exported to PDF successfully"

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

### 2.5 Navigation UI Test Cases

#### UI-TC-028: Navigate Between Pages

**Priority:** P1 (High)  
**Test Type:** Functional, UI, Black-Box  
**Module:** Navigation

**Preconditions:**
- User is logged in
- User is on any page

**Test Steps:**
1. Click "Dashboard" link in navbar
2. Verify navigation to dashboard
3. Click "Tasks" link in navbar
4. Verify navigation to tasks page
5. Click "Tags" link in navbar
6. Verify navigation to tags page
7. Click "Profile" link in navbar
8. Verify navigation to profile page

**Expected Result:**
- All navigation links work correctly
- User is navigated to correct pages
- URL updates correctly
- Page content loads correctly
- No errors occur

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

## 3. Backend API Test Cases

### 3.1 Authentication API Test Cases

#### API-TC-001: Register User with Valid Data

**Priority:** P0 (Critical)  
**Test Type:** Functional, API, Black-Box  
**Module:** Authentication

**Preconditions:**
- Backend server is running
- Database is accessible
- No user exists with test email

**Test Data:**
```json
{
  "name": "Test User",
  "email": "testuser@example.com",
  "password": "password123"
}
```

**Test Steps:**
1. Send POST request to `/api/auth/register`
2. Include request body with name, email, and password
3. Verify response

**Expected Result:**
- Status code: 201 (Created)
- Response contains:
  - `token`: Valid JWT token
  - `user`: Object with id, email, name
- User is created in database
- Password is hashed (not plain text)
- Response time < 500ms

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### API-TC-002: Register User with Duplicate Email

**Priority:** P1 (High)  
**Test Type:** Functional, API, Black-Box  
**Module:** Authentication

**Preconditions:**
- Backend server is running
- User with email "existing@example.com" already exists

**Test Data:**
```json
{
  "name": "Another User",
  "email": "existing@example.com",
  "password": "password123"
}
```

**Test Steps:**
1. Send POST request to `/api/auth/register`
2. Include request body with existing email
3. Verify response

**Expected Result:**
- Status code: 400 (Bad Request)
- Response contains error message: "User already exists"
- No new user is created
- Response time < 500ms

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### API-TC-003: Register User with Invalid Email Format

**Priority:** P1 (High)  
**Test Type:** Functional, API, Black-Box  
**Module:** Authentication

**Test Data:**
```json
{
  "name": "Test User",
  "email": "invalid-email",
  "password": "password123"
}
```

**Test Steps:**
1. Send POST request to `/api/auth/register`
2. Include request body with invalid email
3. Verify response

**Expected Result:**
- Status code: 400 (Bad Request)
- Response contains validation error message
- No user is created
- Response time < 500ms

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### API-TC-004: Login with Valid Credentials

**Priority:** P0 (Critical)  
**Test Type:** Functional, API, Black-Box  
**Module:** Authentication

**Preconditions:**
- Backend server is running
- User exists with email "test@example.com" and password "password123"

**Test Data:**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Test Steps:**
1. Send POST request to `/api/auth/login`
2. Include request body with email and password
3. Verify response

**Expected Result:**
- Status code: 200 (OK)
- Response contains:
  - `token`: Valid JWT token
  - `user`: Object with id, email, name
- Token is valid and can be decoded
- Response time < 500ms

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### API-TC-005: Login with Invalid Email

**Priority:** P1 (High)  
**Test Type:** Functional, API, Black-Box  
**Module:** Authentication

**Test Data:**
```json
{
  "email": "nonexistent@example.com",
  "password": "password123"
}
```

**Test Steps:**
1. Send POST request to `/api/auth/login`
2. Include request body with non-existent email
3. Verify response

**Expected Result:**
- Status code: 400 (Bad Request)
- Response contains error message: "Invalid credentials"
- No token is returned
- Response time < 500ms

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### API-TC-006: Login with Invalid Password

**Priority:** P1 (High)  
**Test Type:** Functional, API, Black-Box  
**Module:** Authentication

**Preconditions:**
- User exists with email "test@example.com" and password "password123"

**Test Data:**
```json
{
  "email": "test@example.com",
  "password": "wrongpassword"
}
```

**Test Steps:**
1. Send POST request to `/api/auth/login`
2. Include request body with wrong password
3. Verify response

**Expected Result:**
- Status code: 400 (Bad Request)
- Response contains error message: "Invalid credentials"
- No token is returned
- Response time < 500ms

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### API-TC-007: Get User Profile with Valid Token

**Priority:** P1 (High)  
**Test Type:** Functional, API, Black-Box  
**Module:** Authentication

**Preconditions:**
- User is authenticated
- Valid JWT token is available

**Test Steps:**
1. Send GET request to `/api/auth/profile`
2. Include JWT token in Authorization header: `Bearer <token>`
3. Verify response

**Expected Result:**
- Status code: 200 (OK)
- Response contains user object with id, email, name
- Password is not included in response
- Response time < 500ms

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### API-TC-008: Get User Profile without Token

**Priority:** P1 (High)  
**Test Type:** Functional, API, Black-Box  
**Module:** Authentication

**Test Steps:**
1. Send GET request to `/api/auth/profile`
2. Do not include Authorization header
3. Verify response

**Expected Result:**
- Status code: 401 (Unauthorized)
- Response contains error message
- No user data is returned
- Response time < 500ms

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

### 3.2 Task Management API Test Cases

#### API-TC-009: Create Task with Valid Data

**Priority:** P0 (Critical)  
**Test Type:** Functional, API, Black-Box  
**Module:** Task Management

**Preconditions:**
- User is authenticated
- Valid JWT token is available

**Test Data:**
```json
{
  "title": "API Test Task",
  "description": "Task created via API",
  "dueDate": "2024-12-31",
  "priority": "High",
  "tags": []
}
```

**Test Steps:**
1. Send POST request to `/api/tasks`
2. Include JWT token in Authorization header
3. Include request body with task data
4. Verify response

**Expected Result:**
- Status code: 201 (Created)
- Response contains task object with:
  - `_id`: Task ID
  - `title`: "API Test Task"
  - `description`: "Task created via API"
  - `dueDate`: Valid date
  - `priority`: "High"
  - `completed`: false
  - `user`: User ID
- Task is saved in database
- Notification is created (if applicable)
- Response time < 500ms

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### API-TC-010: Create Task with Missing Required Field

**Priority:** P1 (High)  
**Test Type:** Functional, API, Black-Box  
**Module:** Task Management

**Preconditions:**
- User is authenticated
- Valid JWT token is available

**Test Data:**
```json
{
  "description": "Task without title"
}
```

**Test Steps:**
1. Send POST request to `/api/tasks`
2. Include JWT token in Authorization header
3. Include request body without title
4. Verify response

**Expected Result:**
- Status code: 400 (Bad Request)
- Response contains validation error message
- Task is not created
- Response time < 500ms

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### API-TC-011: Get All Tasks

**Priority:** P0 (Critical)  
**Test Type:** Functional, API, Black-Box  
**Module:** Task Management

**Preconditions:**
- User is authenticated
- User has at least 3 tasks
- Valid JWT token is available

**Test Steps:**
1. Send GET request to `/api/tasks`
2. Include JWT token in Authorization header
3. Verify response

**Expected Result:**
- Status code: 200 (OK)
- Response contains `tasks` array
- Array contains all user's tasks
- Each task has required fields
- Tasks are sorted by creation date (newest first)
- Response time < 500ms

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### API-TC-012: Get Tasks with Status Filter

**Priority:** P1 (High)  
**Test Type:** Functional, API, Black-Box  
**Module:** Task Management

**Preconditions:**
- User is authenticated
- User has both completed and pending tasks
- Valid JWT token is available

**Test Steps:**
1. Send GET request to `/api/tasks?status=completed`
2. Include JWT token in Authorization header
3. Verify response

**Expected Result:**
- Status code: 200 (OK)
- Response contains only completed tasks
- Pending tasks are not included
- Response time < 500ms

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### API-TC-013: Get Tasks with Priority Filter

**Priority:** P1 (High)  
**Test Type:** Functional, API, Black-Box  
**Module:** Task Management

**Preconditions:**
- User is authenticated
- User has tasks with different priorities
- Valid JWT token is available

**Test Steps:**
1. Send GET request to `/api/tasks?priority=High`
2. Include JWT token in Authorization header
3. Verify response

**Expected Result:**
- Status code: 200 (OK)
- Response contains only high priority tasks
- Tasks with other priorities are not included
- Response time < 500ms

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### API-TC-014: Get Tasks with Search Query

**Priority:** P1 (High)  
**Test Type:** Functional, API, Black-Box  
**Module:** Task Management

**Preconditions:**
- User is authenticated
- User has tasks with various titles
- Valid JWT token is available

**Test Steps:**
1. Send GET request to `/api/tasks?search=Project`
2. Include JWT token in Authorization header
3. Verify response

**Expected Result:**
- Status code: 200 (OK)
- Response contains only tasks matching search term
- Search is case-insensitive
- Response time < 500ms

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### API-TC-015: Get Single Task by ID

**Priority:** P0 (Critical)  
**Test Type:** Functional, API, Black-Box  
**Module:** Task Management

**Preconditions:**
- User is authenticated
- User has at least one task
- Valid JWT token is available
- Valid task ID is known

**Test Steps:**
1. Send GET request to `/api/tasks/:id`
2. Include JWT token in Authorization header
3. Replace `:id` with valid task ID
4. Verify response

**Expected Result:**
- Status code: 200 (OK)
- Response contains single task object
- Task belongs to authenticated user
- All task fields are present
- Response time < 500ms

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### API-TC-016: Get Task with Invalid ID

**Priority:** P1 (High)  
**Test Type:** Functional, API, Black-Box  
**Module:** Task Management

**Preconditions:**
- User is authenticated
- Valid JWT token is available

**Test Steps:**
1. Send GET request to `/api/tasks/invalid_id`
2. Include JWT token in Authorization header
3. Verify response

**Expected Result:**
- Status code: 404 (Not Found)
- Response contains error message: "Task not found"
- Response time < 500ms

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### API-TC-017: Update Task

**Priority:** P0 (Critical)  
**Test Type:** Functional, API, Black-Box  
**Module:** Task Management

**Preconditions:**
- User is authenticated
- User has at least one task
- Valid JWT token is available
- Valid task ID is known

**Test Data:**
```json
{
  "title": "Updated Task Title",
  "description": "Updated description",
  "priority": "Low"
}
```

**Test Steps:**
1. Send PUT request to `/api/tasks/:id`
2. Include JWT token in Authorization header
3. Include request body with updated data
4. Replace `:id` with valid task ID
5. Verify response

**Expected Result:**
- Status code: 200 (OK)
- Response contains updated task object
- Task fields are updated correctly
- `updatedAt` timestamp is updated
- Response time < 500ms

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### API-TC-018: Delete Task

**Priority:** P0 (Critical)  
**Test Type:** Functional, API, Black-Box  
**Module:** Task Management

**Preconditions:**
- User is authenticated
- User has at least one task
- Valid JWT token is available
- Valid task ID is known

**Test Steps:**
1. Send DELETE request to `/api/tasks/:id`
2. Include JWT token in Authorization header
3. Replace `:id` with valid task ID
4. Verify response
5. Verify task is deleted from database

**Expected Result:**
- Status code: 200 (OK)
- Response contains message: "Task deleted"
- Task is removed from database
- Associated notifications are deleted
- Response time < 500ms

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### API-TC-019: Toggle Task Completion

**Priority:** P0 (Critical)  
**Test Type:** Functional, API, Black-Box  
**Module:** Task Management

**Preconditions:**
- User is authenticated
- User has at least one pending task
- Valid JWT token is available
- Valid task ID is known

**Test Steps:**
1. Send PATCH request to `/api/tasks/:id/toggle`
2. Include JWT token in Authorization header
3. Replace `:id` with valid task ID
4. Verify response

**Expected Result:**
- Status code: 200 (OK)
- Response contains task object
- Task `completed` status is toggled (false → true or true → false)
- Response time < 500ms

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

### 3.3 Tag Management API Test Cases

#### API-TC-020: Create Tag

**Priority:** P0 (Critical)  
**Test Type:** Functional, API, Black-Box  
**Module:** Tag Management

**Preconditions:**
- User is authenticated
- Valid JWT token is available

**Test Data:**
```json
{
  "name": "Work"
}
```

**Test Steps:**
1. Send POST request to `/api/tags`
2. Include JWT token in Authorization header
3. Include request body with tag name
4. Verify response

**Expected Result:**
- Status code: 201 (Created)
- Response contains tag object with:
  - `_id`: Tag ID
  - `name`: "Work"
  - `user`: User ID
- Tag is saved in database
- Response time < 500ms

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### API-TC-021: Get All Tags

**Priority:** P0 (Critical)  
**Test Type:** Functional, API, Black-Box  
**Module:** Tag Management

**Preconditions:**
- User is authenticated
- User has at least 2 tags
- Valid JWT token is available

**Test Steps:**
1. Send GET request to `/api/tags`
2. Include JWT token in Authorization header
3. Verify response

**Expected Result:**
- Status code: 200 (OK)
- Response contains `tags` array
- Array contains all user's tags
- Each tag has required fields
- Response time < 500ms

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### API-TC-022: Update Tag

**Priority:** P1 (High)  
**Test Type:** Functional, API, Black-Box  
**Module:** Tag Management

**Preconditions:**
- User is authenticated
- User has at least one tag
- Valid JWT token is available
- Valid tag ID is known

**Test Data:**
```json
{
  "name": "Updated Tag Name"
}
```

**Test Steps:**
1. Send PUT request to `/api/tags/:id`
2. Include JWT token in Authorization header
3. Include request body with updated name
4. Replace `:id` with valid tag ID
5. Verify response

**Expected Result:**
- Status code: 200 (OK)
- Response contains updated tag object
- Tag name is updated correctly
- `updatedAt` timestamp is updated
- Response time < 500ms

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### API-TC-023: Delete Tag

**Priority:** P1 (High)  
**Test Type:** Functional, API, Black-Box  
**Module:** Tag Management

**Preconditions:**
- User is authenticated
- User has at least one tag
- Valid JWT token is available
- Valid tag ID is known

**Test Steps:**
1. Send DELETE request to `/api/tags/:id`
2. Include JWT token in Authorization header
3. Replace `:id` with valid tag ID
4. Verify response
5. Verify tag is deleted from database

**Expected Result:**
- Status code: 200 (OK)
- Response contains message: "Tag deleted"
- Tag is removed from database
- Response time < 500ms

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

### 3.4 Export API Test Cases

#### API-TC-024: Export Tasks to CSV

**Priority:** P1 (High)  
**Test Type:** Functional, API, Black-Box  
**Module:** Export

**Preconditions:**
- User is authenticated
- User has at least one task
- Valid JWT token is available

**Test Steps:**
1. Send GET request to `/api/export/csv`
2. Include JWT token in Authorization header
3. Verify response

**Expected Result:**
- Status code: 200 (OK)
- Content-Type: `text/csv`
- Response body contains CSV formatted data
- CSV includes all user's tasks
- Headers include: `Content-Disposition: attachment; filename="tasks.csv"`
- Response time < 1000ms

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### API-TC-025: Export Tasks to PDF

**Priority:** P1 (High)  
**Test Type:** Functional, API, Black-Box  
**Module:** Export

**Preconditions:**
- User is authenticated
- User has at least one task
- Valid JWT token is available

**Test Steps:**
1. Send GET request to `/api/export/pdf`
2. Include JWT token in Authorization header
3. Verify response

**Expected Result:**
- Status code: 200 (OK)
- Content-Type: `application/pdf`
- Response body contains PDF binary data
- PDF includes all user's tasks
- Headers include: `Content-Disposition: attachment; filename="tasks.pdf"`
- Response time < 2000ms

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

## 4. Unit Test Cases

### 4.1 Backend Unit Test Cases

#### UNIT-TC-001: User Model - Password Hashing

**Priority:** P0 (Critical)  
**Test Type:** Unit, White-Box  
**Module:** User Model

**Preconditions:**
- Test database is set up
- User model is available

**Test Steps:**
1. Create a new user instance with password
2. Save user to database
3. Retrieve user from database
4. Verify password is hashed

**Expected Result:**
- Password is hashed (not plain text)
- Password hash is different from original password
- `comparePassword` method works correctly
- Password comparison returns true for correct password
- Password comparison returns false for incorrect password

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### UNIT-TC-002: User Model - Email Validation

**Priority:** P1 (High)  
**Test Type:** Unit, White-Box  
**Module:** User Model

**Test Steps:**
1. Attempt to create user with invalid email format
2. Verify validation error

**Expected Result:**
- Validation error is thrown for invalid email
- Error message indicates email format issue
- User is not created

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### UNIT-TC-003: Task Model - Default Values

**Priority:** P1 (High)  
**Test Type:** Unit, White-Box  
**Module:** Task Model

**Test Steps:**
1. Create task with only required fields (title, user)
2. Save task to database
3. Retrieve task from database
4. Verify default values

**Expected Result:**
- `priority` defaults to "Medium"
- `completed` defaults to false
- `order` defaults to 0
- `tags` defaults to empty array

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### UNIT-TC-004: Auth Controller - Register Function

**Priority:** P0 (Critical)  
**Test Type:** Unit, White-Box  
**Module:** Auth Controller

**Preconditions:**
- Mock database is set up
- Auth controller is available

**Test Data:**
```javascript
{
  name: "Test User",
  email: "test@example.com",
  password: "password123"
}
```

**Test Steps:**
1. Call `register` function with valid data
2. Verify function execution
3. Verify return value

**Expected Result:**
- User is created in database
- JWT token is generated
- Response contains token and user object
- Status code is 201

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### UNIT-TC-005: Auth Controller - Login Function

**Priority:** P0 (Critical)  
**Test Type:** Unit, White-Box  
**Module:** Auth Controller

**Preconditions:**
- Mock database is set up
- User exists in database
- Auth controller is available

**Test Steps:**
1. Call `login` function with valid credentials
2. Verify function execution
3. Verify return value

**Expected Result:**
- Credentials are validated
- JWT token is generated
- Response contains token and user object
- Status code is 200

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### UNIT-TC-006: Task Controller - Create Task Function

**Priority:** P0 (Critical)  
**Test Type:** Unit, White-Box  
**Module:** Task Controller

**Preconditions:**
- Mock database is set up
- User is authenticated
- Task controller is available

**Test Steps:**
1. Call `createTask` function with valid task data
2. Verify function execution
3. Verify return value

**Expected Result:**
- Task is created in database
- Task is associated with correct user
- Notification is created (if applicable)
- Response contains task object
- Status code is 201

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### UNIT-TC-007: Auth Middleware - Token Validation

**Priority:** P0 (Critical)  
**Test Type:** Unit, White-Box  
**Module:** Auth Middleware

**Test Steps:**
1. Call auth middleware with valid token
2. Verify middleware execution
3. Call auth middleware with invalid token
4. Verify error handling

**Expected Result:**
- Valid token allows request to proceed
- User ID is extracted from token
- Invalid token returns 401 error
- Missing token returns 401 error

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### UNIT-TC-008: Validation Middleware - Input Validation

**Priority:** P1 (High)  
**Test Type:** Unit, White-Box  
**Module:** Validation Middleware

**Test Steps:**
1. Call validation middleware with valid data
2. Verify middleware execution
3. Call validation middleware with invalid data
4. Verify error handling

**Expected Result:**
- Valid data allows request to proceed
- Invalid data returns 400 error
- Error messages are descriptive
- Validation errors are properly formatted

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

## 5. Integration Test Cases

### 5.1 Authentication Integration Test Cases

#### INT-TC-001: Complete Registration and Login Flow

**Priority:** P0 (Critical)  
**Test Type:** Integration, Black-Box  
**Module:** Authentication

**Preconditions:**
- Backend server is running
- Database is accessible
- Frontend is running (if testing full flow)

**Test Steps:**
1. Register new user via API
2. Verify user is created in database
3. Login with registered credentials via API
4. Verify JWT token is received
5. Use token to access protected endpoint

**Expected Result:**
- User registration succeeds
- User is stored in database with hashed password
- Login succeeds with correct credentials
- JWT token is valid and can be used
- Protected endpoint is accessible with token

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### INT-TC-002: Task Creation with Tag Assignment

**Priority:** P0 (Critical)  
**Test Type:** Integration, Black-Box  
**Module:** Task and Tag Management

**Preconditions:**
- User is authenticated
- Tag exists in database

**Test Steps:**
1. Create a tag via API
2. Create a task via API
3. Assign tag to task
4. Retrieve task via API
5. Verify tag is associated with task

**Expected Result:**
- Tag is created successfully
- Task is created successfully
- Tag is assigned to task
- Task retrieval includes tag information
- Tag and task are properly linked in database

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### INT-TC-003: Task Creation Triggers Notification

**Priority:** P1 (High)  
**Test Type:** Integration, Black-Box  
**Module:** Task and Notification Management

**Preconditions:**
- User is authenticated
- Notification system is active

**Test Steps:**
1. Create a task with due date (within 24 hours) via API
2. Wait for notification scheduler to run
3. Retrieve notifications via API
4. Verify notification is created

**Expected Result:**
- Task is created successfully
- Notification is created automatically
- Notification type is "created" or "due_soon"
- Notification is associated with correct user and task
- Notification message is correct

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### INT-TC-004: Task Deletion Cascades to Notifications

**Priority:** P1 (High)  
**Test Type:** Integration, Black-Box  
**Module:** Task and Notification Management

**Preconditions:**
- User is authenticated
- Task exists with associated notifications

**Test Steps:**
1. Create a task via API
2. Verify notification is created
3. Delete task via API
4. Retrieve notifications via API
5. Verify notifications are deleted

**Expected Result:**
- Task is created successfully
- Notification is created
- Task deletion succeeds
- Associated notifications are deleted
- No orphaned notifications remain

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### INT-TC-005: Export Functionality Integration

**Priority:** P1 (High)  
**Test Type:** Integration, Black-Box  
**Module:** Export

**Preconditions:**
- User is authenticated
- User has multiple tasks with various data

**Test Steps:**
1. Create multiple tasks via API
2. Export tasks to CSV via API
3. Verify CSV format and content
4. Export tasks to PDF via API
5. Verify PDF format and content

**Expected Result:**
- Multiple tasks are created
- CSV export succeeds
- CSV contains all tasks with correct format
- PDF export succeeds
- PDF contains all tasks with correct format

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

## 6. Security Test Cases

### 6.1 Authentication Security Test Cases

#### SEC-TC-001: Password Hashing Verification

**Priority:** P0 (Critical)  
**Test Type:** Security, White-Box  
**Module:** Authentication

**Test Steps:**
1. Create a user with password
2. Retrieve user from database
3. Verify password is hashed
4. Verify password is not stored in plain text

**Expected Result:**
- Password is hashed using bcrypt
- Password hash is different from original password
- Plain text password is not stored in database
- Password comparison works correctly

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### SEC-TC-002: JWT Token Expiration

**Priority:** P0 (Critical)  
**Test Type:** Security, Black-Box  
**Module:** Authentication

**Test Steps:**
1. Login and receive JWT token
2. Wait for token expiration (or use expired token)
3. Attempt to access protected endpoint with expired token
4. Verify access is denied

**Expected Result:**
- Expired token is rejected
- 401 Unauthorized error is returned
- Error message indicates token expiration
- User must re-authenticate

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### SEC-TC-003: SQL Injection Prevention

**Priority:** P0 (Critical)  
**Test Type:** Security, Black-Box  
**Module:** Input Validation

**Test Data:**
```javascript
{
  email: "test@example.com'; DROP TABLE users;--",
  password: "password123"
}
```

**Test Steps:**
1. Attempt to register with SQL injection in email field
2. Verify database is not affected
3. Attempt to login with SQL injection in email field
4. Verify database is not affected

**Expected Result:**
- SQL injection is prevented
- Input is sanitized or rejected
- Database structure is not affected
- Error message is returned (not database error)

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### SEC-TC-004: XSS Prevention

**Priority:** P0 (Critical)  
**Test Type:** Security, Black-Box  
**Module:** Input Validation

**Test Data:**
```javascript
{
  title: "<script>alert('XSS')</script>",
  description: "<img src=x onerror=alert('XSS')>"
}
```

**Test Steps:**
1. Create task with XSS payload in title
2. Create task with XSS payload in description
3. Retrieve tasks via API
4. Verify XSS is prevented

**Expected Result:**
- XSS payload is sanitized or escaped
- Script tags are not executed
- Data is stored safely
- No JavaScript execution occurs

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### SEC-TC-005: Rate Limiting on Login

**Priority:** P1 (High)  
**Test Type:** Security, Black-Box  
**Module:** Authentication

**Test Steps:**
1. Attempt multiple login requests rapidly (10+ requests)
2. Verify rate limiting is applied
3. Verify error message for rate limit exceeded

**Expected Result:**
- Rate limiting is enforced
- After threshold, requests are rejected
- Status code: 429 (Too Many Requests)
- Error message indicates rate limit exceeded
- Rate limit resets after time window

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### SEC-TC-006: Unauthorized Access Prevention

**Priority:** P0 (Critical)  
**Test Type:** Security, Black-Box  
**Module:** Authentication

**Test Steps:**
1. Attempt to access protected endpoint without token
2. Attempt to access protected endpoint with invalid token
3. Attempt to access another user's tasks
4. Verify access is denied

**Expected Result:**
- Requests without token return 401
- Requests with invalid token return 401
- Users cannot access other users' data
- Proper error messages are returned

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

## 7. Performance Test Cases

### 7.1 API Performance Test Cases

#### PERF-TC-001: API Response Time - Login

**Priority:** P1 (High)  
**Test Type:** Performance, Black-Box  
**Module:** Authentication

**Test Steps:**
1. Send POST request to `/api/auth/login`
2. Measure response time
3. Repeat 10 times
4. Calculate average response time

**Expected Result:**
- Average response time < 500ms
- 95th percentile response time < 1000ms
- No timeouts occur
- Response time is consistent

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### PERF-TC-002: API Response Time - Get Tasks

**Priority:** P1 (High)  
**Test Type:** Performance, Black-Box  
**Module:** Task Management

**Preconditions:**
- User has 100+ tasks

**Test Steps:**
1. Send GET request to `/api/tasks`
2. Measure response time
3. Repeat 10 times
4. Calculate average response time

**Expected Result:**
- Average response time < 500ms
- 95th percentile response time < 1000ms
- All tasks are returned correctly
- Response time scales reasonably with task count

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

#### PERF-TC-003: Concurrent Request Handling

**Priority:** P2 (Medium)  
**Test Type:** Performance, Black-Box  
**Module:** General

**Test Steps:**
1. Send 50 concurrent requests to `/api/tasks`
2. Measure response times
3. Verify all requests are handled
4. Check for errors

**Expected Result:**
- All requests are handled successfully
- No errors occur
- Response times remain acceptable
- Server remains stable

**Actual Result:** [To be filled during execution]  
**Status:** [Not Executed/Pass/Fail/Blocked/Skipped]  
**Notes:** [Any additional notes]

---

## Test Case Summary

### Summary Statistics

| Category | Total | P0 | P1 | P2 | P3 |
|----------|-------|----|----|----|----|
| UI Test Cases | 28 | 6 | 15 | 7 | 0 |
| API Test Cases | 25 | 8 | 14 | 3 | 0 |
| Unit Test Cases | 8 | 4 | 4 | 0 | 0 |
| Integration Test Cases | 5 | 2 | 3 | 0 | 0 |
| Security Test Cases | 6 | 4 | 2 | 0 | 0 |
| Performance Test Cases | 3 | 0 | 2 | 1 | 0 |
| **Total** | **75** | **24** | **40** | **11** | **0** |

### Test Coverage

- **Authentication:** 15 test cases
- **Task Management:** 25 test cases
- **Tag Management:** 8 test cases
- **Export:** 4 test cases
- **Security:** 6 test cases
- **Performance:** 3 test cases
- **Navigation:** 1 test case
- **Other:** 13 test cases

---

## Test Execution Tracking

### Execution Status

- **Not Executed:** 75
- **Pass:** 0
- **Fail:** 0
- **Blocked:** 0
- **Skipped:** 0

### Priority Breakdown

- **P0 (Critical):** 24 test cases - Must pass for release
- **P1 (High):** 40 test cases - Important functionality
- **P2 (Medium):** 11 test cases - Standard functionality

---

**End of Test Cases Document**

