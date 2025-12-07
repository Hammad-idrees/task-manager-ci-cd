/**
 * Auth Controller Unit Tests
 * Tests controller functions in isolation
 */

const authController = require('../../../controllers/authController');
const User = require('../../../models/User');
const jwt = require('jsonwebtoken');

// Mock dependencies
jest.mock('../../../models/User');
jest.mock('jsonwebtoken');

describe('Auth Controller Unit Tests', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
      user: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('UNIT-TC-001: Should register a new user successfully', async () => {
      req.body = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      User.findOne.mockResolvedValue(null);
      const mockUser = {
        _id: 'user123',
        email: req.body.email,
        name: req.body.name,
        save: jest.fn().mockResolvedValue(true),
      };
      User.mockImplementation(() => mockUser);
      jwt.sign.mockReturnValue('mock-token');

      await authController.register(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(mockUser.save).toHaveBeenCalled();
      expect(jwt.sign).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          token: 'mock-token',
          user: expect.objectContaining({
            email: req.body.email,
            name: req.body.name,
          }),
        })
      );
    });

    it('UNIT-TC-002: Should reject registration if user exists', async () => {
      req.body = {
        email: 'existing@example.com',
        password: 'password123',
        name: 'Test User',
      };

      User.findOne.mockResolvedValue({ _id: 'existing123', email: req.body.email });

      await authController.register(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'User already exists',
        })
      );
    });

    it('UNIT-TC-003: Should handle errors', async () => {
      req.body = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      const error = new Error('Database error');
      User.findOne.mockRejectedValue(error);

      await authController.register(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('login', () => {
    it('UNIT-TC-004: Should login user with valid credentials', async () => {
      req.body = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockUser = {
        _id: 'user123',
        email: req.body.email,
        name: 'Test User',
        comparePassword: jest.fn().mockResolvedValue(true),
      };

      User.findOne.mockResolvedValue(mockUser);
      jwt.sign.mockReturnValue('mock-token');

      await authController.login(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(mockUser.comparePassword).toHaveBeenCalledWith(req.body.password);
      expect(jwt.sign).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          token: 'mock-token',
          user: expect.objectContaining({
            email: req.body.email,
          }),
        })
      );
    });

    it('UNIT-TC-005: Should reject login if user not found', async () => {
      req.body = {
        email: 'nonexistent@example.com',
        password: 'password123',
      };

      User.findOne.mockResolvedValue(null);

      await authController.login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Invalid credentials',
        })
      );
    });

    it('UNIT-TC-006: Should reject login with wrong password', async () => {
      req.body = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      const mockUser = {
        _id: 'user123',
        email: req.body.email,
        comparePassword: jest.fn().mockResolvedValue(false),
      };

      User.findOne.mockResolvedValue(mockUser);

      await authController.login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Invalid credentials',
        })
      );
    });
  });

  describe('getProfile', () => {
    it('UNIT-TC-007: Should get user profile', async () => {
      req.user = { id: 'user123' };

      const mockUser = {
        _id: 'user123',
        email: 'test@example.com',
        name: 'Test User',
      };

      User.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser),
      });

      await authController.getProfile(req, res, next);

      expect(User.findById).toHaveBeenCalledWith('user123');
      expect(res.json).toHaveBeenCalledWith({ user: mockUser });
    });

    it('UNIT-TC-008: Should return 404 if user not found', async () => {
      req.user = { id: 'nonexistent' };

      User.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      await authController.getProfile(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'User not found',
        })
      );
    });
  });
});
