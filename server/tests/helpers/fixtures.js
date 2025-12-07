/**
 * Test Fixtures
 * Provides sample data for tests
 */

const getTestUser = () => ({
  email: `test${Date.now()}@example.com`,
  password: 'password123',
  name: 'Test User',
});

const getTestTask = (userId) => ({
  title: 'Test Task',
  description: 'This is a test task',
  dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
  priority: 'High',
  user: userId,
  completed: false,
});

const getTestTag = (userId) => ({
  name: 'Test Tag',
  user: userId,
});

const getTestNotification = (userId, taskId) => ({
  user: userId,
  task: taskId,
  type: 'created',
  message: 'Test notification',
  read: false,
});

module.exports = {
  getTestUser,
  getTestTask,
  getTestTag,
  getTestNotification,
};

