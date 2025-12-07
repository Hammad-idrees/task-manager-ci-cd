# Backend Test Suite Documentation

## Overview

This directory contains comprehensive automated tests for the Task Manager backend API. The test suite includes:

- **Integration Tests**: Full API endpoint testing with HTTP requests
- **Unit Tests**: Individual component testing (controllers, middleware, models)
- **Test Helpers**: Reusable utilities for test setup and data creation

## Test Structure

```
tests/
├── helpers/              # Test utilities and helpers
│   ├── testApp.js       # Express app setup for testing
│   ├── db.js            # Database connection helpers
│   ├── auth.js          # Authentication helpers
│   └── fixtures.js      # Test data fixtures
├── integration/          # API integration tests
│   ├── auth.test.js     # Authentication API tests
│   ├── tasks.test.js    # Tasks API tests
│   ├── tags.test.js     # Tags API tests
│   └── export.test.js   # Export API tests
├── unit/                 # Unit tests
│   ├── controllers/     # Controller unit tests
│   ├── middleware/      # Middleware unit tests
│   └── models/          # Model unit tests
├── setup.js             # Jest setup configuration
└── README.md            # This file
```

## Prerequisites

1. **MongoDB**: Ensure MongoDB is running (local or remote)
2. **Node.js**: Version 14 or higher
3. **Environment Variables**: Set up `.env.test` file (optional)

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Specific Test Suites

```bash
# Run only integration tests
npm test -- tests/integration

# Run only unit tests
npm test -- tests/unit

# Run specific test file
npm test -- tests/integration/auth.test.js
```

### Run Tests in Watch Mode

```bash
npm test -- --watch
```

### Run Tests with Coverage

```bash
npm test -- --coverage
```

### Run Tests Verbosely

```bash
npm test -- --verbose
```

## Test Database

Tests use a separate test database to avoid affecting development data:

- **Default**: `mongodb://localhost:27017/task-manager-test`
- **Custom**: Set `MONGO_URI_TEST` environment variable

The test database is automatically:

- Connected before test suites
- Cleared between test files
- Disconnected after all tests complete

## Test Categories

### Integration Tests

Integration tests make real HTTP requests to the API endpoints:

- **Authentication Tests** (`auth.test.js`): User registration, login, profile
- **Tasks Tests** (`tasks.test.js`): CRUD operations, filtering, pagination
- **Tags Tests** (`tags.test.js`): Tag management operations
- **Export Tests** (`export.test.js`): CSV and PDF export functionality

### Unit Tests

Unit tests test individual components in isolation:

- **Controller Tests**: Test controller functions with mocked dependencies
- **Middleware Tests**: Test authentication and validation middleware
- **Model Tests**: Test Mongoose models, hooks, and methods

## Test Helpers

### Authentication Helpers

```javascript
const { createAuthenticatedUser, getAuthHeaders } = require('./helpers/auth');

// Create user and get token
const { user, token } = await createAuthenticatedUser();

// Get headers for authenticated requests
const headers = getAuthHeaders(token);
```

### Database Helpers

```javascript
const { connectDB, disconnectDB, clearDatabase } = require('./helpers/db');

// Connect to test database
await connectDB();

// Clear all collections
await clearDatabase();

// Disconnect
await disconnectDB();
```

### Test Fixtures

```javascript
const { getTestUser, getTestTask, getTestTag } = require('./helpers/fixtures');

const userData = getTestUser();
const taskData = getTestTask(userId);
const tagData = getTestTag(userId);
```

## Writing New Tests

### Integration Test Example

```javascript
const request = require('supertest');
const app = require('../helpers/testApp');
const { createAuthenticatedUser, getAuthHeaders } = require('../helpers/auth');

describe('My API Tests', () => {
  let user, token, authHeaders;

  beforeEach(async () => {
    const auth = await createAuthenticatedUser();
    user = auth.user;
    token = auth.token;
    authHeaders = getAuthHeaders(token);
  });

  it('Should do something', async () => {
    const response = await request(app)
      .get('/api/endpoint')
      .set(authHeaders)
      .expect(200);

    expect(response.body).toHaveProperty('data');
  });
});
```

### Unit Test Example

```javascript
const myController = require('../../../controllers/myController');

describe('My Controller Unit Tests', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it('Should handle request', async () => {
    await myController.myFunction(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
```

## Test Coverage

Run tests with coverage to see which code is tested:

```bash
npm test -- --coverage
```

Coverage reports are generated in the `coverage/` directory:

- **HTML Report**: `coverage/lcov-report/index.html`
- **LCOV Report**: `coverage/lcov.info`

## Continuous Integration

Tests are designed to run in CI/CD pipelines:

```yaml
# Example GitHub Actions
- name: Run tests
  run: npm test
  env:
    MONGO_URI_TEST: ${{ secrets.MONGO_URI_TEST }}
    JWT_SECRET: test-secret
```

## Troubleshooting

### Tests Failing with Database Connection

- Ensure MongoDB is running
- Check `MONGO_URI_TEST` environment variable
- Verify network connectivity

### Tests Timing Out

- Increase timeout in `jest.config.js`
- Check for hanging database connections
- Ensure proper cleanup in `afterAll` hooks

### Authentication Tests Failing

- Verify `JWT_SECRET` is set in test environment
- Check token generation in auth helpers
- Ensure user creation is working

## Best Practices

1. **Isolation**: Each test should be independent
2. **Cleanup**: Always clean up test data
3. **Mocking**: Mock external dependencies in unit tests
4. **Descriptive Names**: Use clear test descriptions
5. **Arrange-Act-Assert**: Structure tests clearly
6. **Error Cases**: Test both success and failure scenarios

## Test Cases Reference

### Authentication (API-TC-001 to API-TC-013)

- User registration
- User login
- Profile retrieval
- Token validation

### Tasks (API-TC-014 to API-TC-035)

- Task creation
- Task retrieval
- Task filtering
- Task updates
- Task deletion
- Task completion toggle

### Tags (API-TC-036 to API-TC-048)

- Tag creation
- Tag retrieval
- Tag updates
- Tag deletion

### Export (API-TC-049 to API-TC-054)

- CSV export
- PDF export

### Unit Tests (UNIT-TC-001 to UNIT-TC-021)

- Controller functions
- Middleware functions
- Model methods

## Contributing

When adding new features:

1. Write tests first (TDD approach)
2. Ensure all tests pass
3. Maintain test coverage above 80%
4. Update this documentation

---

**Last Updated**: 2024
