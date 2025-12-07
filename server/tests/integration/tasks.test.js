/**
 * Tasks API Integration Tests
 * Tests all task endpoints with real HTTP requests
 */

const request = require('supertest');
const app = require('../helpers/testApp');
const { connectDB, disconnectDB, clearDatabase } = require('../helpers/db');
const { createAuthenticatedUser, getAuthHeaders } = require('../helpers/auth');
const Task = require('../../models/Task');
const Tag = require('../../models/Tag');

describe('Tasks API Integration Tests', () => {
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
  });

  describe('POST /api/tasks', () => {
    it('API-TC-014: Should create a task with all fields', async () => {
      const taskData = {
        title: 'Complete Project',
        description: 'Finish the project documentation',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        priority: 'High',
      };

      const response = await request(app)
        .post('/api/tasks')
        .set(authHeaders)
        .send(taskData)
        .expect(201);

      expect(response.body).toHaveProperty('task');
      expect(response.body.task.title).toBe(taskData.title);
      expect(response.body.task.description).toBe(taskData.description);
      expect(response.body.task.priority).toBe(taskData.priority);
      expect(response.body.task.user.toString()).toBe(user._id.toString());
    });

    it('API-TC-015: Should create a task with only required fields', async () => {
      const taskData = {
        title: 'Minimal Task',
      };

      const response = await request(app)
        .post('/api/tasks')
        .set(authHeaders)
        .send(taskData)
        .expect(201);

      expect(response.body.task.title).toBe(taskData.title);
      expect(response.body.task.completed).toBe(false);
      expect(response.body.task.priority).toBe('Medium'); // Default
    });

    it('API-TC-016: Should reject task creation without authentication', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: 'Test Task' })
        .expect(401);

      expect(response.body).toHaveProperty('message');
    });

    it('API-TC-017: Should reject task creation without title', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .set(authHeaders)
        .send({ description: 'No title' })
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('API-TC-018: Should create task with tags', async () => {
      // Create tags first
      const tag1 = await Tag.create({ name: 'Work', user: user._id });
      const tag2 = await Tag.create({ name: 'Urgent', user: user._id });

      const taskData = {
        title: 'Task with Tags',
        tags: [tag1._id.toString(), tag2._id.toString()],
      };

      const response = await request(app)
        .post('/api/tasks')
        .set(authHeaders)
        .send(taskData)
        .expect(201);

      expect(response.body.task.tags).toHaveLength(2);
    });
  });

  describe('GET /api/tasks', () => {
    beforeEach(async () => {
      // Create test tasks
      await Task.create([
        { title: 'Task 1', user: user._id, completed: false, priority: 'High' },
        { title: 'Task 2', user: user._id, completed: true, priority: 'Low' },
        { title: 'Task 3', user: user._id, completed: false, priority: 'Medium' },
      ]);
    });

    it('API-TC-019: Should get all tasks for authenticated user', async () => {
      const response = await request(app)
        .get('/api/tasks')
        .set(authHeaders)
        .expect(200);

      expect(response.body).toHaveProperty('tasks');
      expect(response.body.tasks).toHaveLength(3);
    });

    it('API-TC-020: Should filter tasks by status (completed)', async () => {
      const response = await request(app)
        .get('/api/tasks?status=completed')
        .set(authHeaders)
        .expect(200);

      expect(response.body.tasks).toHaveLength(1);
      expect(response.body.tasks[0].completed).toBe(true);
    });

    it('API-TC-021: Should filter tasks by status (pending)', async () => {
      const response = await request(app)
        .get('/api/tasks?status=pending')
        .set(authHeaders)
        .expect(200);

      expect(response.body.tasks).toHaveLength(2);
      expect(response.body.tasks.every((t) => !t.completed)).toBe(true);
    });

    it('API-TC-022: Should filter tasks by priority', async () => {
      const response = await request(app)
        .get('/api/tasks?priority=High')
        .set(authHeaders)
        .expect(200);

      expect(response.body.tasks).toHaveLength(1);
      expect(response.body.tasks[0].priority).toBe('High');
    });

    it('API-TC-023: Should search tasks by title', async () => {
      const response = await request(app)
        .get('/api/tasks?search=Task 1')
        .set(authHeaders)
        .expect(200);

      expect(response.body.tasks.length).toBeGreaterThan(0);
      expect(response.body.tasks[0].title).toContain('Task 1');
    });

    it('API-TC-024: Should paginate tasks', async () => {
      const response = await request(app)
        .get('/api/tasks?page=1&limit=2')
        .set(authHeaders)
        .expect(200);

      expect(response.body.tasks.length).toBeLessThanOrEqual(2);
    });

    it('API-TC-025: Should not return tasks from other users', async () => {
      // Create another user and their task
      const otherUser = await createAuthenticatedUser();
      await Task.create({ title: 'Other User Task', user: otherUser.user._id });

      const response = await request(app)
        .get('/api/tasks')
        .set(authHeaders)
        .expect(200);

      expect(response.body.tasks).toHaveLength(3);
      expect(response.body.tasks.every((t) => t.user.toString() === user._id.toString())).toBe(
        true
      );
    });
  });

  describe('GET /api/tasks/:id', () => {
    let task;

    beforeEach(async () => {
      task = await Task.create({
        title: 'Get Task',
        description: 'Task description',
        user: user._id,
      });
    });

    it('API-TC-026: Should get a single task by ID', async () => {
      const response = await request(app)
        .get(`/api/tasks/${task._id}`)
        .set(authHeaders)
        .expect(200);

      expect(response.body.task._id.toString()).toBe(task._id.toString());
      expect(response.body.task.title).toBe('Get Task');
    });

    it('API-TC-027: Should return 404 for non-existent task', async () => {
      const fakeId = require('mongoose').Types.ObjectId();
      const response = await request(app)
        .get(`/api/tasks/${fakeId}`)
        .set(authHeaders)
        .expect(404);

      expect(response.body).toHaveProperty('message');
    });

    it('API-TC-028: Should not return task from another user', async () => {
      const otherUser = await createAuthenticatedUser();
      const otherTask = await Task.create({
        title: 'Other Task',
        user: otherUser.user._id,
      });

      const response = await request(app)
        .get(`/api/tasks/${otherTask._id}`)
        .set(authHeaders)
        .expect(404);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('PUT /api/tasks/:id', () => {
    let task;

    beforeEach(async () => {
      task = await Task.create({
        title: 'Update Task',
        user: user._id,
        priority: 'Low',
      });
    });

    it('API-TC-029: Should update task successfully', async () => {
      const updateData = {
        title: 'Updated Task',
        description: 'Updated description',
        priority: 'High',
      };

      const response = await request(app)
        .put(`/api/tasks/${task._id}`)
        .set(authHeaders)
        .send(updateData)
        .expect(200);

      expect(response.body.task.title).toBe(updateData.title);
      expect(response.body.task.description).toBe(updateData.description);
      expect(response.body.task.priority).toBe(updateData.priority);
    });

    it('API-TC-030: Should partially update task', async () => {
      const response = await request(app)
        .put(`/api/tasks/${task._id}`)
        .set(authHeaders)
        .send({ title: 'Partially Updated' })
        .expect(200);

      expect(response.body.task.title).toBe('Partially Updated');
      expect(response.body.task.priority).toBe('Low'); // Unchanged
    });

    it('API-TC-031: Should return 404 for non-existent task', async () => {
      const fakeId = require('mongoose').Types.ObjectId();
      const response = await request(app)
        .put(`/api/tasks/${fakeId}`)
        .set(authHeaders)
        .send({ title: 'Updated' })
        .expect(404);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    let task;

    beforeEach(async () => {
      task = await Task.create({
        title: 'Delete Task',
        user: user._id,
      });
    });

    it('API-TC-032: Should delete task successfully', async () => {
      const response = await request(app)
        .delete(`/api/tasks/${task._id}`)
        .set(authHeaders)
        .expect(200);

      expect(response.body).toHaveProperty('message');

      // Verify task is deleted
      const deletedTask = await Task.findById(task._id);
      expect(deletedTask).toBeNull();
    });

    it('API-TC-033: Should return 404 for non-existent task', async () => {
      const fakeId = require('mongoose').Types.ObjectId();
      const response = await request(app)
        .delete(`/api/tasks/${fakeId}`)
        .set(authHeaders)
        .expect(404);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('PATCH /api/tasks/:id/toggle', () => {
    let task;

    beforeEach(async () => {
      task = await Task.create({
        title: 'Toggle Task',
        user: user._id,
        completed: false,
      });
    });

    it('API-TC-034: Should toggle task completion status', async () => {
      const response = await request(app)
        .patch(`/api/tasks/${task._id}/toggle`)
        .set(authHeaders)
        .expect(200);

      expect(response.body.task.completed).toBe(true);

      // Toggle again
      const response2 = await request(app)
        .patch(`/api/tasks/${task._id}/toggle`)
        .set(authHeaders)
        .expect(200);

      expect(response2.body.task.completed).toBe(false);
    });

    it('API-TC-035: Should return 404 for non-existent task', async () => {
      const fakeId = require('mongoose').Types.ObjectId();
      const response = await request(app)
        .patch(`/api/tasks/${fakeId}/toggle`)
        .set(authHeaders)
        .expect(404);

      expect(response.body).toHaveProperty('message');
    });
  });
});

