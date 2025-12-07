/**
 * Authentication Helper for Tests
 * Provides utilities for creating test users and tokens
 */

const jwt = require('jsonwebtoken');
const User = require('../../models/User');

/**
 * Create a test user
 * @param {Object} userData - User data (email, password, name)
 * @returns {Promise<Object>} Created user object
 */
const createTestUser = async (userData = {}) => {
  const defaultUser = {
    email: `test${Date.now()}@example.com`,
    password: 'password123',
    name: 'Test User',
    ...userData,
  };

  const user = new User(defaultUser);
  await user.save();
  return user;
};

/**
 * Get authentication token for a user
 * @param {Object} user - User object
 * @returns {string} JWT token
 */
const getAuthToken = (user) => {
  const payload = { id: user._id.toString() };
  return jwt.sign(payload, process.env.JWT_SECRET || 'test-jwt-secret-key-for-testing-only', {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });
};

/**
 * Create a test user and return token
 * @param {Object} userData - User data
 * @returns {Promise<Object>} { user, token }
 */
const createAuthenticatedUser = async (userData = {}) => {
  const user = await createTestUser(userData);
  const token = getAuthToken(user);
  return { user, token };
};

/**
 * Get authorization header for requests
 * @param {string} token - JWT token
 * @returns {Object} Headers object with Authorization
 */
const getAuthHeaders = (token) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};

module.exports = {
  createTestUser,
  getAuthToken,
  createAuthenticatedUser,
  getAuthHeaders,
};

