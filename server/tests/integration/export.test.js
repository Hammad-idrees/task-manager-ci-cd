/**
 * Export API Integration Tests
 * Tests CSV and PDF export endpoints
 */

const request = require('supertest');
const app = require('../helpers/testApp');
const { connectDB, disconnectDB, clearDatabase } = require('../helpers/db');
const { createAuthenticatedUser, getAuthHeaders } = require('../helpers/auth');
const Task = require('../../models/Task');
const Tag = require('../../models/Tag');

describe('Export API Integration Tests', () => {
  let user, token, authHeaders;

  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await clearDatabase();
    await disconnectDB();
  });

  beforeEach(async () => {
    await clearDatabase();
    const auth = await createAuthenticatedUser();
    user = auth.user;
    token = auth.token;
    authHeaders = getAuthHeaders(token);

    // Create test tasks
    await Task.create([
      {
        title: 'Task 1',
        description: 'Description 1',
        priority: 'High',
        dueDate: new Date(),
        user: user._id,
      },
      {
        title: 'Task 2',
        description: 'Description 2',
        priority: 'Low',
        user: user._id,
        completed: true,
      },
    ]);
  });

  describe('GET /api/export/csv', () => {
    it('API-TC-049: Should export tasks to CSV', async () => {
      const response = await request(app)
        .get('/api/export/csv')
        .set(authHeaders)
        .expect(200);

      expect(response.headers['content-type']).toContain('text/csv');
      expect(response.text).toContain('Task 1');
      expect(response.text).toContain('Task 2');
    });

    it('API-TC-050: Should reject CSV export without authentication', async () => {
      const response = await request(app)
        .get('/api/export/csv')
        .expect(401);

      expect(response.body).toHaveProperty('message');
    });

    it('API-TC-051: Should export empty CSV when user has no tasks', async () => {
      await clearDatabase();
      const newAuth = await createAuthenticatedUser();
      const newAuthHeaders = getAuthHeaders(newAuth.token);

      const response = await request(app)
        .get('/api/export/csv')
        .set(newAuthHeaders)
        .expect(200);

      expect(response.headers['content-type']).toContain('text/csv');
      expect(response.text).toBeTruthy();
    });
  });

  describe('GET /api/export/pdf', () => {
    it('API-TC-052: Should export tasks to PDF', async () => {
      const response = await request(app)
        .get('/api/export/pdf')
        .set(authHeaders)
        .expect(200);

      expect(response.headers['content-type']).toContain('application/pdf');
      expect(response.headers['content-disposition']).toContain('attachment');
      expect(response.body).toBeInstanceOf(Buffer);
    });

    it('API-TC-053: Should reject PDF export without authentication', async () => {
      const response = await request(app)
        .get('/api/export/pdf')
        .expect(401);

      expect(response.body).toHaveProperty('message');
    });

    it('API-TC-054: Should export empty PDF when user has no tasks', async () => {
      await clearDatabase();
      const newAuth = await createAuthenticatedUser();
      const newAuthHeaders = getAuthHeaders(newAuth.token);

      const response = await request(app)
        .get('/api/export/pdf')
        .set(newAuthHeaders)
        .expect(200);

      expect(response.headers['content-type']).toContain('application/pdf');
      expect(response.body).toBeInstanceOf(Buffer);
    });
  });
});

