/**
 * User Model Unit Tests
 * Tests User model methods and hooks
 */

const mongoose = require('mongoose');
const User = require('../../../models/User');
const bcrypt = require('bcryptjs');

// Mock bcrypt
jest.mock('bcryptjs');

describe('User Model Unit Tests', () => {
  beforeAll(async () => {
    // Connect to test database
    const mongoUri =
      process.env.MONGO_URI_TEST ||
      'mongodb://localhost:27017/task-manager-test';
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
    jest.clearAllMocks();
  });

  it('UNIT-TC-014: Should create user with valid data', async () => {
    bcrypt.genSalt.mockResolvedValue('salt');
    bcrypt.hash.mockResolvedValue('hashed-password');

    const userData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    };

    const user = new User(userData);
    await user.save();

    expect(user.email).toBe(userData.email);
    expect(user.name).toBe(userData.name);
    expect(user.password).toBe('hashed-password');
    expect(bcrypt.hash).toHaveBeenCalled();
  });

  it('UNIT-TC-015: Should hash password before saving', async () => {
    bcrypt.genSalt.mockResolvedValue('salt');
    bcrypt.hash.mockResolvedValue('hashed-password');

    const user = new User({
      email: 'test@example.com',
      password: 'password123',
    });

    await user.save();

    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 'salt');
    expect(user.password).toBe('hashed-password');
  });

  it('UNIT-TC-016: Should not hash password if not modified', async () => {
    bcrypt.genSalt.mockResolvedValue('salt');
    bcrypt.hash.mockResolvedValue('hashed-password');

    const user = new User({
      email: 'test@example.com',
      password: 'password123',
    });
    await user.save();

    // Clear mocks
    jest.clearAllMocks();

    // Update non-password field
    user.name = 'Updated Name';
    await user.save();

    expect(bcrypt.hash).not.toHaveBeenCalled();
  });

  it('UNIT-TC-017: Should compare password correctly', async () => {
    bcrypt.genSalt.mockResolvedValue('salt');
    bcrypt.hash.mockResolvedValue('hashed-password');
    bcrypt.compare.mockResolvedValue(true);

    const user = new User({
      email: 'test@example.com',
      password: 'password123',
    });
    await user.save();

    const isMatch = await user.comparePassword('password123');

    expect(bcrypt.compare).toHaveBeenCalledWith(
      'password123',
      'hashed-password',
    );
    expect(isMatch).toBe(true);
  });

  it('UNIT-TC-018: Should reject invalid email format', async () => {
    const user = new User({
      email: 'invalid-email',
      password: 'password123',
    });

    await expect(user.save()).rejects.toThrow();
  });

  it('UNIT-TC-019: Should require email field', async () => {
    const user = new User({
      password: 'password123',
    });

    await expect(user.save()).rejects.toThrow();
  });

  it('UNIT-TC-020: Should require password field', async () => {
    const user = new User({
      email: 'test@example.com',
    });

    await expect(user.save()).rejects.toThrow();
  });

  it('UNIT-TC-021: Should enforce unique email', async () => {
    bcrypt.genSalt.mockResolvedValue('salt');
    bcrypt.hash.mockResolvedValue('hashed-password');

    const user1 = new User({
      email: 'duplicate@example.com',
      password: 'password123',
    });
    await user1.save();

    const user2 = new User({
      email: 'duplicate@example.com',
      password: 'password123',
    });

    await expect(user2.save()).rejects.toThrow();
  });
});
