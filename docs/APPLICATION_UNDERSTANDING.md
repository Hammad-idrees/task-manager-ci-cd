# Application Understanding Document
## Task Manager Application - Functionality & Flows

**Document Version:** 1.0  
**Date:** 2024  
**Purpose:** Comprehensive understanding of application functionality and user flows for testing purposes

---

## Table of Contents

1. [Application Overview](#1-application-overview)
2. [Technology Stack](#2-technology-stack)
3. [Application Architecture](#3-application-architecture)
4. [UI Flows](#4-ui-flows)
5. [Backend API Endpoints](#5-backend-api-endpoints)
6. [Data Models](#6-data-models)
7. [Authentication Flow](#7-authentication-flow)
8. [Key Features](#8-key-features)
9. [User Workflows](#9-user-workflows)

---

## 1. Application Overview

The Task Manager Application is a full-featured web application that allows users to manage their personal tasks efficiently. It provides a modern, responsive user interface built with React and a robust backend API built with Node.js and Express.

### 1.1 Core Functionality

- **User Authentication:** Secure registration and login with JWT tokens
- **Task Management:** Create, read, update, delete, and toggle tasks
- **Task Organization:** Priority levels, due dates, tags, and status tracking
- **Tag Management:** Create and manage tags to categorize tasks
- **Data Export:** Export tasks to CSV and PDF formats
- **Notifications:** Automatic notifications for tasks due soon or overdue
- **Dashboard:** Overview of tasks with statistics

### 1.2 Application Type

- **Type:** Full-Stack Web Application
- **Architecture:** MERN Stack (MongoDB, Express, React, Node.js)
- **Deployment:** Web-based (browser accessible)

---

## 2. Technology Stack

### 2.1 Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI framework |
| Vite | 5.1.0 | Build tool and dev server |
| React Router DOM | 6.30.1 | Client-side routing |
| Material-UI (MUI) | 7.1.1 | UI component library |
| Tailwind CSS | 3.4.1 | Utility-first CSS framework |
| Axios | 1.10.0 | HTTP client for API calls |
| React Query | 5.24.1 | Data fetching and state management |
| React Hook Form | 7.57.0 | Form management |
| Yup | 1.6.1 | Schema validation |
| Framer Motion | 12.18.1 | Animation library |
| React Hot Toast | 2.4.1 | Toast notifications |

### 2.2 Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | Latest | Runtime environment |
| Express.js | 4.18.2 | Web framework |
| MongoDB | 7.3.4 | Database (via Mongoose) |
| Mongoose | 7.3.4 | MongoDB ODM |
| JWT | 9.0.0 | Authentication tokens |
| Bcryptjs | 2.4.3 | Password hashing |
| Express Validator | 6.15.0 | Input validation |
| Helmet | 7.0.0 | Security headers |
| CORS | 2.8.5 | Cross-origin resource sharing |
| Express Rate Limit | 6.8.0 | Rate limiting |
| Node Cron | 3.0.3 | Task scheduling |
| PDFKit | 0.17.1 | PDF generation |
| json2csv | 5.0.6 | CSV generation |
| Winston | 3.17.0 | Logging |
| Morgan | 1.10.0 | HTTP request logger |

### 2.3 Testing Technologies

| Technology | Purpose |
|------------|---------|
| Jest | Unit and integration testing |
| Supertest | API endpoint testing |
| Cypress/Selenium | E2E and UI testing |
| React Testing Library | React component testing |

---

## 3. Application Architecture

### 3.1 Frontend Structure

```
client/
├── src/
│   ├── api/              # API service functions
│   ├── components/       # React components
│   │   ├── auth/         # Authentication components
│   │   ├── tasks/        # Task-related components
│   │   ├── chat/         # Chatbot component
│   │   └── layout/       # Layout components
│   ├── context/          # React Context providers
│   ├── pages/            # Page components
│   ├── services/         # Business logic services
│   ├── styles/           # Styling files
│   └── utils/            # Utility functions
```

### 3.2 Backend Structure

```
server/
├── controllers/          # Request handlers
├── models/              # Database models
├── routes/              # API route definitions
├── middleware/          # Custom middleware
├── validations/         # Input validation schemas
├── utils/               # Utility functions
├── jobs/                # Scheduled jobs
├── schedulers/          # Task schedulers
└── tests/               # Test files
```

### 3.3 Data Flow

1. **User Interaction** → React Component
2. **Component** → Service Function (API call)
3. **Service** → Axios HTTP Request
4. **Request** → Express Route
5. **Route** → Controller
6. **Controller** → Model (Database)
7. **Response** → Component → UI Update

---

## 4. UI Flows

### 4.1 Authentication Flows

#### 4.1.1 User Registration Flow

**Path:** `/register`

**Steps:**
1. User navigates to registration page
2. User fills in form:
   - Full Name (required, min 2 characters)
   - Email Address (required, valid email format)
   - Password (required, min 6 characters)
   - Confirm Password (required, must match password)
3. User clicks "Create Your Account" button
4. Frontend validates form data
5. If valid, sends POST request to `/api/auth/register`
6. Backend creates user account
7. Backend returns JWT token
8. Frontend stores token
9. User is redirected to `/login` page
10. Success toast notification displayed

**Validation:**
- Name: Required, minimum 2 characters
- Email: Required, valid email format, unique
- Password: Required, minimum 6 characters
- Confirm Password: Required, must match password

**Error Handling:**
- Duplicate email: "An account with this email already exists"
- Invalid data: Field-specific error messages
- Network error: "Registration failed. Please try again."

#### 4.1.2 User Login Flow

**Path:** `/login`

**Steps:**
1. User navigates to login page
2. User enters:
   - Email address
   - Password
3. User clicks "Sign In to TaskFlow" button
4. Frontend validates form (email format, password length)
5. If valid, sends POST request to `/api/auth/login`
6. Backend validates credentials
7. Backend returns JWT token and user data
8. Frontend stores token in localStorage/sessionStorage
9. User is redirected to `/dashboard` (or intended page)
10. Success toast notification displayed

**Validation:**
- Email: Required, valid email format
- Password: Required, minimum 6 characters

**Error Handling:**
- Invalid credentials: "Invalid email or password"
- Account not found: "Account not found. Please check your email."
- Rate limiting: "Too many login attempts. Please try again later."
- Network error: "Login failed. Please try again."

#### 4.1.3 Logout Flow

**Steps:**
1. User clicks logout button (in Navbar)
2. Frontend clears stored JWT token
3. User is redirected to `/login`
4. Protected routes become inaccessible

### 4.2 Task Management Flows

#### 4.2.1 Create Task Flow

**Path:** `/tasks` → Click "Create New Task" button

**Steps:**
1. User navigates to Tasks page
2. User clicks "Create New Task" button
3. Task form modal opens
4. User fills in task details:
   - Title (required)
   - Description (optional)
   - Due Date (optional, date picker)
   - Priority (optional: Low, Medium, High)
   - Tags (optional, multi-select)
5. User clicks "Create Task" button
6. Frontend validates form
7. If valid, sends POST request to `/api/tasks`
8. Backend creates task in database
9. Backend creates notification (if applicable)
10. Frontend refreshes task list
11. Modal closes
12. Success toast notification displayed

**Validation:**
- Title: Required
- Due Date: Must be valid date (if provided)
- Priority: Must be one of: Low, Medium, High

#### 4.2.2 View Tasks Flow

**Path:** `/tasks`

**Steps:**
1. User navigates to Tasks page
2. Frontend sends GET request to `/api/tasks`
3. Backend retrieves user's tasks from database
4. Tasks are displayed in list or grid view
5. User can:
   - Filter by status (all, completed, pending, overdue)
   - Filter by priority (all, high, medium, low)
   - Search by title/description
   - Sort by due date, title, or priority
   - Toggle between list and grid view

**Task Display Information:**
- Task title
- Description (if available)
- Due date
- Priority badge
- Status badge (Completed, Pending, Overdue)
- Tags (if any)
- Days until due / Days overdue
- Completion checkbox

#### 4.2.3 Edit Task Flow

**Path:** `/tasks/:id/edit` or Click on task card

**Steps:**
1. User clicks on a task (in list or grid view)
2. User is navigated to task edit page (or modal opens)
3. Task form is pre-filled with existing data
4. User modifies task details
5. User clicks "Update Task" button
6. Frontend validates form
7. If valid, sends PUT request to `/api/tasks/:id`
8. Backend updates task in database
9. Frontend refreshes task list
10. Success toast notification displayed

#### 4.2.4 Delete Task Flow

**Steps:**
1. User clicks delete button on a task
2. Confirmation dialog appears (if implemented)
3. User confirms deletion
4. Frontend sends DELETE request to `/api/tasks/:id`
5. Backend deletes task from database
6. Backend deletes associated notifications
7. Frontend refreshes task list
8. Success toast notification displayed

#### 4.2.5 Toggle Task Completion Flow

**Steps:**
1. User clicks checkbox on a task
2. Frontend sends PATCH request to `/api/tasks/:id/toggle`
3. Backend toggles task completion status
4. Frontend updates UI immediately
5. Task moves between completed/pending sections

### 4.3 Tag Management Flows

#### 4.3.1 Create Tag Flow

**Path:** `/tags` → Click "Add Tag" button

**Steps:**
1. User navigates to Tags page
2. User clicks "Add Tag" button
3. Tag creation form appears
4. User enters tag name
5. User clicks "Create" button
6. Frontend validates (name required)
7. If valid, sends POST request to `/api/tags`
8. Backend creates tag in database
9. Frontend refreshes tag list
10. Success toast notification displayed

#### 4.3.2 Edit Tag Flow

**Steps:**
1. User hovers over a tag card
2. User clicks edit icon
3. Tag name becomes editable (inline edit)
4. User modifies tag name
5. User clicks "Save" button
6. Frontend sends PUT request to `/api/tags/:id`
7. Backend updates tag in database
8. Frontend updates tag display
9. Success toast notification displayed

#### 4.3.3 Delete Tag Flow

**Steps:**
1. User hovers over a tag card
2. User clicks delete icon
3. Confirmation modal appears
4. User confirms deletion
5. Frontend sends DELETE request to `/api/tags/:id`
6. Backend deletes tag from database
7. Frontend refreshes tag list
8. Success toast notification displayed

#### 4.3.4 Filter Tasks by Tag Flow

**Steps:**
1. User navigates to Tags page
2. User clicks "Filter Tasks" button on a tag
3. Tasks list filters to show only tasks with that tag
4. User can clear filter to show all tasks

### 4.4 Export Flows

#### 4.4.1 Export to PDF Flow

**Path:** `/tasks` → Click "Export PDF" button

**Steps:**
1. User navigates to Tasks page
2. User clicks "Export PDF" button
3. Frontend sends GET request to `/api/export/pdf`
4. Backend generates PDF with all user's tasks
5. Backend returns PDF as blob
6. Frontend triggers browser download
7. PDF file downloads to user's device
8. Success toast notification displayed

#### 4.4.2 Export to CSV Flow

**Path:** `/tasks` → Click "Export CSV" button

**Steps:**
1. User navigates to Tasks page
2. User clicks "Export CSV" button
3. Frontend sends GET request to `/api/export/csv`
4. Backend generates CSV with all user's tasks
5. Backend returns CSV as blob
6. Frontend triggers browser download
7. CSV file downloads to user's device
8. Success toast notification displayed

### 4.5 Dashboard Flow

**Path:** `/dashboard`

**Steps:**
1. User logs in successfully
2. User is redirected to dashboard
3. Frontend displays:
   - Task statistics (total, completed, pending, overdue)
   - Recent tasks
   - Upcoming due tasks
   - Quick actions

### 4.6 Navigation Flow

**Navigation Structure:**
- **Navbar:** Always visible when authenticated
  - Dashboard link
  - Tasks link
  - Tags link
  - Notifications link
  - Profile link
  - Settings link
  - Logout button

**Route Protection:**
- Public routes: `/login`, `/register`
- Protected routes: All other routes require authentication
- Redirect: Unauthenticated users redirected to `/login`

---

## 5. Backend API Endpoints

### 5.1 Authentication Endpoints

#### POST `/api/auth/register`
**Purpose:** Register a new user

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

**Error Responses:**
- 400: User already exists / Invalid data
- 500: Server error

#### POST `/api/auth/login`
**Purpose:** Authenticate user and get JWT token

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

**Error Responses:**
- 400: Invalid credentials
- 500: Server error

#### GET `/api/auth/profile`
**Purpose:** Get authenticated user's profile

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "user_id",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

**Error Responses:**
- 401: Unauthorized (no/invalid token)
- 404: User not found
- 500: Server error

### 5.2 Task Management Endpoints

#### GET `/api/tasks`
**Purpose:** Get all tasks for authenticated user

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `status`: completed, pending, all (default: all)
- `priority`: low, medium, high, all (default: all)
- `search`: Search term for title/description
- `page`: Page number (for pagination)
- `limit`: Items per page (for pagination)

**Response (200 OK):**
```json
{
  "tasks": [
    {
      "_id": "task_id",
      "title": "Task Title",
      "description": "Task Description",
      "dueDate": "2024-12-31T00:00:00.000Z",
      "priority": "High",
      "completed": false,
      "tags": [
        {
          "_id": "tag_id",
          "name": "Work"
        }
      ],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### GET `/api/tasks/:id`
**Purpose:** Get single task by ID

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "task": {
    "_id": "task_id",
    "title": "Task Title",
    "description": "Task Description",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "priority": "High",
    "completed": false,
    "tags": [],
    "user": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- 401: Unauthorized
- 404: Task not found
- 500: Server error

#### POST `/api/tasks`
**Purpose:** Create a new task

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Task Title",
  "description": "Task Description",
  "dueDate": "2024-12-31",
  "priority": "High",
  "tags": ["tag_id_1", "tag_id_2"]
}
```

**Response (201 Created):**
```json
{
  "task": {
    "_id": "task_id",
    "title": "Task Title",
    "description": "Task Description",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "priority": "High",
    "completed": false,
    "tags": [],
    "user": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- 400: Invalid data / Validation error
- 401: Unauthorized
- 500: Server error

#### PUT `/api/tasks/:id`
**Purpose:** Update an existing task

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated Description",
  "dueDate": "2024-12-31",
  "priority": "Medium",
  "completed": false,
  "tags": ["tag_id_1"]
}
```

**Response (200 OK):**
```json
{
  "task": {
    "_id": "task_id",
    "title": "Updated Title",
    "description": "Updated Description",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "priority": "Medium",
    "completed": false,
    "tags": [],
    "user": "user_id",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

**Error Responses:**
- 400: Invalid data
- 401: Unauthorized
- 404: Task not found
- 500: Server error

#### DELETE `/api/tasks/:id`
**Purpose:** Delete a task

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "message": "Task deleted"
}
```

**Error Responses:**
- 401: Unauthorized
- 404: Task not found
- 500: Server error

#### PATCH `/api/tasks/:id/toggle`
**Purpose:** Toggle task completion status

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "task": {
    "_id": "task_id",
    "completed": true,
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

**Error Responses:**
- 401: Unauthorized
- 404: Task not found
- 500: Server error

### 5.3 Tag Management Endpoints

#### GET `/api/tags`
**Purpose:** Get all tags for authenticated user

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "tags": [
    {
      "_id": "tag_id",
      "name": "Work",
      "user": "user_id",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### POST `/api/tags`
**Purpose:** Create a new tag

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Work"
}
```

**Response (201 Created):**
```json
{
  "tag": {
    "_id": "tag_id",
    "name": "Work",
    "user": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT `/api/tags/:id`
**Purpose:** Update an existing tag

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Updated Tag Name"
}
```

**Response (200 OK):**
```json
{
  "tag": {
    "_id": "tag_id",
    "name": "Updated Tag Name",
    "user": "user_id",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### DELETE `/api/tags/:id`
**Purpose:** Delete a tag

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "message": "Tag deleted"
}
```

### 5.4 Export Endpoints

#### GET `/api/export/csv`
**Purpose:** Export all tasks to CSV format

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
- Content-Type: `text/csv`
- Body: CSV file content
- Headers include: `Content-Disposition: attachment; filename="tasks.csv"`

#### GET `/api/export/pdf`
**Purpose:** Export all tasks to PDF format

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
- Content-Type: `application/pdf`
- Body: PDF file content
- Headers include: `Content-Disposition: attachment; filename="tasks.pdf"`

### 5.5 Notification Endpoints

#### GET `/api/notifications`
**Purpose:** Get all notifications for authenticated user

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "notifications": [
    {
      "_id": "notification_id",
      "type": "due_soon",
      "message": "Task 'Example Task' is due in 24 hours",
      "read": false,
      "task": "task_id",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### PATCH `/api/notifications/:id/read`
**Purpose:** Mark notification as read

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "notification": {
    "_id": "notification_id",
    "read": true,
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

---

## 6. Data Models

### 6.1 User Model

```javascript
{
  _id: ObjectId,
  email: String (required, unique, lowercase),
  password: String (required, minlength: 6, hashed),
  name: String,
  createdAt: Date,
  updatedAt: Date
}
```

**Methods:**
- `comparePassword(candidatePassword)`: Compare password with hashed password

### 6.2 Task Model

```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  dueDate: Date,
  priority: String (enum: ['Low', 'Medium', 'High'], default: 'Medium'),
  completed: Boolean (default: false),
  user: ObjectId (ref: 'User', required),
  order: Number (default: 0),
  tags: [ObjectId] (ref: 'Tag'),
  sharedWith: [ObjectId] (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `{ user: 1, dueDate: 1 }`
- `{ user: 1, completed: 1 }`

### 6.3 Tag Model

```javascript
{
  _id: ObjectId,
  name: String (required),
  user: ObjectId (ref: 'User', required),
  createdAt: Date,
  updatedAt: Date
}
```

### 6.4 Notification Model

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'User', required),
  task: ObjectId (ref: 'Task'),
  type: String (enum: ['created', 'due_soon', 'overdue']),
  message: String,
  read: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 7. Authentication Flow

### 7.1 JWT Token Flow

1. **Registration/Login:**
   - User provides credentials
   - Backend validates credentials
   - Backend generates JWT token with user ID
   - Token includes expiration time
   - Token returned to frontend

2. **Token Storage:**
   - Frontend stores token in localStorage or sessionStorage
   - Token included in Authorization header for API requests

3. **Token Usage:**
   - Frontend includes token in `Authorization: Bearer <token>` header
   - Backend middleware validates token
   - If valid, request proceeds
   - If invalid/expired, returns 401 Unauthorized

4. **Token Expiration:**
   - Token expires after configured time (e.g., 7 days)
   - Frontend detects expiration
   - User redirected to login
   - User must re-authenticate

### 7.2 Protected Routes

**Backend Middleware:**
- `auth.js` middleware validates JWT token
- Extracts user ID from token
- Attaches user to request object
- Applied to all protected routes

**Frontend Protection:**
- `PrivateRoute` component checks authentication
- Redirects to login if not authenticated
- Wraps protected page components

---

## 8. Key Features

### 8.1 Task Features

- **CRUD Operations:** Full create, read, update, delete functionality
- **Priority Levels:** Low, Medium, High
- **Status Tracking:** Completed, Pending, Overdue
- **Due Dates:** Date selection with validation
- **Tagging:** Multiple tags per task
- **Filtering:** Filter by status, priority, search
- **Sorting:** Sort by due date, title, priority
- **View Modes:** List view and grid view
- **Toggle Completion:** Quick toggle with checkbox

### 8.2 Tag Features

- **CRUD Operations:** Create, read, update, delete tags
- **Tag Usage Count:** Display number of tasks using each tag
- **Tag Filtering:** Filter tasks by selected tag
- **Color Coding:** Visual distinction for tags

### 8.3 Notification Features

- **Automatic Creation:** Notifications created automatically
- **Types:**
  - Task created
  - Task due soon (within 24 hours)
  - Task overdue
- **Read/Unread Status:** Track notification read status
- **Scheduled Checks:** Cron job runs every 5 minutes

### 8.4 Export Features

- **CSV Export:** Export all tasks to CSV format
- **PDF Export:** Export all tasks to formatted PDF
- **Download:** Automatic file download in browser

### 8.5 Security Features

- **Password Hashing:** Bcrypt with salt rounds
- **JWT Authentication:** Secure token-based auth
- **Input Validation:** Express Validator for all inputs
- **Rate Limiting:** Prevent brute force attacks
- **CORS Configuration:** Controlled cross-origin access
- **Helmet:** Security headers
- **XSS Prevention:** Input sanitization

---

## 9. User Workflows

### 9.1 New User Workflow

1. User visits application
2. User clicks "Create Account" on login page
3. User fills registration form
4. User account created
5. User redirected to login
6. User logs in
7. User redirected to dashboard
8. User creates first task
9. User creates tags
10. User organizes tasks

### 9.2 Daily User Workflow

1. User logs in
2. User views dashboard (task overview)
3. User navigates to tasks page
4. User views pending tasks
5. User completes tasks (toggle checkbox)
6. User creates new tasks
7. User filters/searches tasks
8. User exports tasks (if needed)
9. User logs out

### 9.3 Task Management Workflow

1. User creates task with details
2. User assigns tags to task
3. User sets priority and due date
4. System creates notification (if due soon)
5. User views task in list/grid
6. User edits task as needed
7. User marks task as completed
8. User deletes completed tasks (optional)

### 9.4 Tag Organization Workflow

1. User creates tags
2. User assigns tags to tasks
3. User filters tasks by tag
4. User views tasks with specific tag
5. User edits tag names
6. User deletes unused tags

---

## Summary

This document provides a comprehensive understanding of the Task Manager Application, covering:

- **Technology Stack:** Complete list of frontend and backend technologies
- **UI Flows:** Detailed step-by-step user interactions
- **API Endpoints:** Complete API documentation with request/response formats
- **Data Models:** Database schema and relationships
- **Authentication:** JWT token flow and security
- **Features:** All application features and capabilities
- **Workflows:** Common user workflows and scenarios

This understanding forms the foundation for creating comprehensive test cases and implementing automated testing strategies.

---

**End of Application Understanding Document**

