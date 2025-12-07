/**
 * Authentication API Integration Tests
 * Tests all authentication endpoints with real HTTP requests
 */

const request = require('supertest');
const app = require('../helpers/testApp');
const { connectDB, disconnectDB, clearDatabase } = require('../helpers/db');
const { createTestUser, getAuthToken } = require('../helpers/auth');
const User = require('../../models/User');

describe('Authentication API Integration Tests', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await clearDatabase();
    await disconnectDB();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  describe('POST /api/auth/register', () => {
    it('API-TC-001: Should register a new user successfully', async () => {
      const userData = {
        email: 'newuser@example.com',
        password: 'password123',
        name: 'New User',
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.user.name).toBe(userData.name);
      expect(response.body.user).not.toHaveProperty('password');
    });

    it('API-TC-002: Should reject registration with existing email', async () => {
      const userData = {
        email: 'existing@example.com',
        password: 'password123',
        name: 'Existing User',
      };

      // Create user first
      await createTestUser({ email: userData.email });

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('already exists');
    });

    it('API-TC-003: Should reject registration with invalid email', async () => {
      const userData = {
        email: 'invalid-email',
        password: 'password123',
        name: 'Test User',
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('API-TC-004: Should reject registration with short password', async () => {
      const userData = {
        email: 'test@example.com',
        password: '12345', // Less than 6 characters
        name: 'Test User',
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('API-TC-005: Should reject registration with missing required fields', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@example.com' }) // Missing password
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await createTestUser({
        email: 'login@example.com',
        password: 'password123',
        name: 'Login User',
      });
    });

    it('API-TC-006: Should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'password123',
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe('login@example.com');
    });

    it('API-TC-007: Should reject login with invalid email', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123',
        })
        .expect(400);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Invalid credentials');
    });

    it('API-TC-008: Should reject login with invalid password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'wrongpassword',
        })
        .expect(400);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Invalid credentials');
    });

    it('API-TC-009: Should reject login with missing credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'login@example.com' })
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('GET /api/auth/profile', () => {
    let user, token;

    beforeEach(async () => {
      user = await createTestUser({
        email: 'profile@example.com',
        password: 'password123',
        name: 'Profile User',
      });
      token = getAuthToken(user);
    });

    it('API-TC-010: Should get user profile with valid token', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe('profile@example.com');
      expect(response.body.user).not.toHaveProperty('password');
    });

    it('API-TC-011: Should reject profile request without token', async () => {
      const response = await request(app).get('/api/auth/profile').expect(401);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('No token provided');
    });

    it('API-TC-012: Should reject profile request with invalid token', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('not valid');
    });

    it('API-TC-013: Should reject profile request with expired token', async () => {
      // Create an expired token
      const jwt = require('jsonwebtoken');
      const expiredToken = jwt.sign(
        { id: user._id.toString() },
        process.env.JWT_SECRET || 'test-jwt-secret-key-for-testing-only',
        { expiresIn: '-1h' }, // Expired 1 hour ago
      );

      const response = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${expiredToken}`)
        .expect(401);

      expect(response.body).toHaveProperty('message');
    });
  });
});
