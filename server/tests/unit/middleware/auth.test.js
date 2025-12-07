/**
 * Auth Middleware Unit Tests
 * Tests authentication middleware
 */

const auth = require('../../../middleware/auth');
const User = require('../../../models/User');
const jwt = require('jsonwebtoken');

// Mock dependencies
jest.mock('../../../models/User');
jest.mock('jsonwebtoken');

describe('Auth Middleware Unit Tests', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('UNIT-TC-009: Should authenticate user with valid token', async () => {
    const mockToken = 'valid-token';
    const decodedToken = { id: 'user123' };
    const mockUser = {
      _id: 'user123',
      email: 'test@example.com',
    };

    req.headers.authorization = `Bearer ${mockToken}`;
    jwt.verify.mockReturnValue(decodedToken);
    User.findById.mockResolvedValue(mockUser);

    await auth(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith(mockToken, process.env.JWT_SECRET);
    expect(User.findById).toHaveBeenCalledWith('user123');
    expect(req.user).toEqual({ id: 'user123' });
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('UNIT-TC-010: Should reject request without token', async () => {
    req.headers.authorization = undefined;

    await auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining('No token provided'),
      }),
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('UNIT-TC-011: Should reject request with invalid token format', async () => {
    req.headers.authorization = 'InvalidFormat token';

    await auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining('No token provided'),
      }),
    );
  });

  it('UNIT-TC-012: Should reject request with invalid token', async () => {
    req.headers.authorization = 'Bearer invalid-token';

    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    await auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining('not valid'),
      }),
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('UNIT-TC-013: Should reject request if user not found', async () => {
    const mockToken = 'valid-token';
    const decodedToken = { id: 'nonexistent' };

    req.headers.authorization = `Bearer ${mockToken}`;
    jwt.verify.mockReturnValue(decodedToken);
    User.findById.mockResolvedValue(null);

    await auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'User not found',
      }),
    );
    expect(next).not.toHaveBeenCalled();
  });
});
