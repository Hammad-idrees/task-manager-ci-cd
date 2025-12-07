# Backend Test Design Documentation

## Overview

This document describes the comprehensive automated backend testing strategy for the Task Manager application using **Jest** and **Supertest**.

## Test Framework Selection

### Jest
- **Rationale**: Industry-standard testing framework for Node.js
- **Features**: Built-in test runner, mocking, coverage reports
- **Compatibility**: Works seamlessly with Express.js and Mongoose

### Supertest
- **Rationale**: HTTP assertion library for testing Express routes
- **Features**: Makes real HTTP requests to test API endpoints
- **Integration**: Works perfectly with Jest

## Test Architecture

### Test Structure

```
server/
├── tests/
│   ├── helpers/              # Reusable test utilities
│   │   ├── testApp.js        # Express app for testing
│   │   ├── db.js             # Database helpers
│   │   ├── auth.js           # Authentication helpers
│   │   └── fixtures.js       # Test data fixtures
│   ├── integration/          # API integration tests
│   │   ├── auth.test.js      # Authentication endpoints
│   │   ├── tasks.test.js     # Task CRUD operations
│   │   ├── tags.test.js     # Tag management
│   │   └── export.test.js   # Export functionality
│   ├── unit/                 # Unit tests
│   │   ├── controllers/     # Controller unit tests
│   │   ├── middleware/       # Middleware tests
│   │   └── models/           # Model tests
│   ├── setup.js             # Jest configuration
│   └── README.md            # Test documentation
└── jest.config.js           # Jest configuration
```

## Test Categories

### 1. Integration Tests

**Purpose**: Test complete API workflows with real HTTP requests

**Coverage**:
- Authentication API (`/api/auth/*`)
- Tasks API (`/api/tasks/*`)
- Tags API (`/api/tags/*`)
- Export API (`/api/export/*`)

**Test Cases**: 54 integration test cases covering:
- Successful operations
- Error handling
- Authentication/authorization
- Data validation
- Edge cases

### 2. Unit Tests

**Purpose**: Test individual components in isolation

**Coverage**:
- **Controllers**: Business logic testing with mocked dependencies
- **Middleware**: Authentication, validation, error handling
- **Models**: Mongoose schemas, hooks, methods

**Test Cases**: 21+ unit test cases

## Test Helpers

### Database Helpers (`helpers/db.js`)
- `connectDB()`: Connect to test database
- `disconnectDB()`: Close database connection
- `clearDatabase()`: Clean all collections

### Authentication Helpers (`helpers/auth.js`)
- `createTestUser()`: Create test user
- `getAuthToken()`: Generate JWT token
- `createAuthenticatedUser()`: Create user + token
- `getAuthHeaders()`: Get authorization headers

### Test Fixtures (`helpers/fixtures.js`)
- `getTestUser()`: Sample user data
- `getTestTask()`: Sample task data
- `getTestTag()`: Sample tag data
- `getTestNotification()`: Sample notification data

## Test Execution Strategy

### Test Database
- Separate test database: `task-manager-test`
- Automatic cleanup between tests
- Isolated from development data

### Test Lifecycle
1. **Before All**: Connect to test database
2. **Before Each**: Clear database, create test data
3. **Test Execution**: Run test cases
4. **After Each**: Cleanup (if needed)
5. **After All**: Disconnect from database

## Test Coverage

### Authentication Tests (13 test cases)
- ✅ User registration (success, duplicate, validation)
- ✅ User login (success, invalid credentials)
- ✅ Profile retrieval (success, unauthorized, invalid token)

### Tasks Tests (22 test cases)
- ✅ Task creation (all fields, required fields, validation)
- ✅ Task retrieval (all, filtered, paginated, search)
- ✅ Task updates (full, partial)
- ✅ Task deletion
- ✅ Task completion toggle
- ✅ User isolation (users can't access other users' tasks)

### Tags Tests (13 test cases)
- ✅ Tag creation (success, duplicate, validation)
- ✅ Tag retrieval (all, empty)
- ✅ Tag updates
- ✅ Tag deletion
- ✅ User isolation

### Export Tests (6 test cases)
- ✅ CSV export (success, unauthorized, empty)
- ✅ PDF export (success, unauthorized, empty)

### Unit Tests (21+ test cases)
- ✅ Controller functions
- ✅ Middleware functions
- ✅ Model methods and hooks

## Running Tests

### All Tests
```bash
npm test
```

### Specific Test Suites
```bash
npm run test:integration  # Integration tests only
npm run test:unit         # Unit tests only
```

### With Coverage
```bash
npm run test:coverage
```

### Watch Mode
```bash
npm run test:watch
```

## Test Configuration

### Jest Configuration (`jest.config.js`)
- Test environment: Node.js
- Test timeout: 30 seconds
- Coverage collection from controllers, routes, middleware, models, utils
- Coverage reports: text, lcov, HTML

### Test Setup (`tests/setup.js`)
- Environment variables
- Test database configuration
- Global test settings

## Best Practices

### 1. Test Isolation
- Each test is independent
- Database cleared between tests
- No shared state

### 2. Test Data Management
- Use fixtures for consistent test data
- Create minimal required data
- Clean up after tests

### 3. Error Testing
- Test both success and failure paths
- Verify error messages
- Test edge cases

### 4. Authentication Testing
- Test authenticated and unauthenticated requests
- Test invalid tokens
- Test expired tokens

### 5. Data Validation
- Test required fields
- Test field formats
- Test constraints

## Continuous Integration

Tests are designed to run in CI/CD pipelines:

```yaml
# Example CI configuration
test:
  script:
    - npm install
    - npm test
  environment:
    MONGO_URI_TEST: mongodb://localhost:27017/task-manager-test
    JWT_SECRET: test-secret-key
```

## Test Metrics

### Coverage Goals
- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

### Test Execution
- **Total Test Cases**: 75+ test cases
- **Integration Tests**: 54 test cases
- **Unit Tests**: 21+ test cases
- **Execution Time**: < 30 seconds (all tests)

## Maintenance

### Adding New Tests
1. Identify test category (integration/unit)
2. Create test file following naming convention
3. Use test helpers for setup
4. Write descriptive test cases
5. Ensure cleanup in afterEach/afterAll

### Updating Tests
1. Update test when API changes
2. Maintain backward compatibility tests
3. Update documentation

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Ensure MongoDB is running
   - Check MONGO_URI_TEST environment variable

2. **Test Timeouts**
   - Increase timeout in jest.config.js
   - Check for hanging database connections

3. **Authentication Failures**
   - Verify JWT_SECRET is set
   - Check token generation in helpers

4. **Test Isolation Issues**
   - Ensure database is cleared between tests
   - Check for shared state

## Future Enhancements

- [ ] Performance tests
- [ ] Load tests
- [ ] Security tests
- [ ] API contract tests
- [ ] Mutation testing

## References

- [Jest Documentation](https://jestjs.io/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

---

**Document Version**: 1.0  
**Last Updated**: 2024  
**Author**: Test Team

