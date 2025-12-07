/**
 * Tags API Integration Tests
 * Tests all tag endpoints with real HTTP requests
 */

const request = require('supertest');
const app = require('../helpers/testApp');
const { connectDB, disconnectDB, clearDatabase } = require('../helpers/db');
const { createAuthenticatedUser, getAuthHeaders } = require('../helpers/auth');
const Tag = require('../../models/Tag');

describe('Tags API Integration Tests', () => {
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

  describe('POST /api/tags', () => {
    it('API-TC-036: Should create a tag successfully', async () => {
      const tagData = {
        name: 'Work',
      };

      const response = await request(app)
        .post('/api/tags')
        .set(authHeaders)
        .send(tagData)
        .expect(201);

      expect(response.body).toHaveProperty('tag');
      expect(response.body.tag.name).toBe(tagData.name);
      expect(response.body.tag.user.toString()).toBe(user._id.toString());
    });

    it('API-TC-037: Should reject tag creation with duplicate name', async () => {
      await Tag.create({ name: 'Work', user: user._id });

      const response = await request(app)
        .post('/api/tags')
        .set(authHeaders)
        .send({ name: 'Work' })
        .expect(400);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('already exists');
    });

    it('API-TC-038: Should reject tag creation without authentication', async () => {
      const response = await request(app)
        .post('/api/tags')
        .send({ name: 'Test Tag' })
        .expect(401);

      expect(response.body).toHaveProperty('message');
    });

    it('API-TC-039: Should allow same tag name for different users', async () => {
      const otherUser = await createAuthenticatedUser();
      const otherAuthHeaders = getAuthHeaders(otherUser.token);

      // Create tag for first user
      await request(app)
        .post('/api/tags')
        .set(authHeaders)
        .send({ name: 'Shared Tag' })
        .expect(201);

      // Same tag name for different user should work
      const response = await request(app)
        .post('/api/tags')
        .set(otherAuthHeaders)
        .send({ name: 'Shared Tag' })
        .expect(201);

      expect(response.body.tag.name).toBe('Shared Tag');
    });
  });

  describe('GET /api/tags', () => {
    beforeEach(async () => {
      await Tag.create([
        { name: 'Work', user: user._id },
        { name: 'Personal', user: user._id },
        { name: 'Urgent', user: user._id },
      ]);
    });

    it('API-TC-040: Should get all tags for authenticated user', async () => {
      const response = await request(app)
        .get('/api/tags')
        .set(authHeaders)
        .expect(200);

      expect(response.body).toHaveProperty('tags');
      expect(response.body.tags).toHaveLength(3);
    });

    it('API-TC-041: Should not return tags from other users', async () => {
      const otherUser = await createAuthenticatedUser();
      await Tag.create({ name: 'Other Tag', user: otherUser.user._id });

      const response = await request(app)
        .get('/api/tags')
        .set(authHeaders)
        .expect(200);

      expect(response.body.tags).toHaveLength(3);
      expect(
        response.body.tags.every((tag) => tag.user.toString() === user._id.toString())
      ).toBe(true);
    });

    it('API-TC-042: Should return empty array when user has no tags', async () => {
      await clearDatabase();
      const newAuth = await createAuthenticatedUser();
      const newAuthHeaders = getAuthHeaders(newAuth.token);

      const response = await request(app)
        .get('/api/tags')
        .set(newAuthHeaders)
        .expect(200);

      expect(response.body.tags).toHaveLength(0);
    });
  });

  describe('PUT /api/tags/:id', () => {
    let tag;

    beforeEach(async () => {
      tag = await Tag.create({ name: 'Old Name', user: user._id });
    });

    it('API-TC-043: Should update tag successfully', async () => {
      const response = await request(app)
        .put(`/api/tags/${tag._id}`)
        .set(authHeaders)
        .send({ name: 'New Name' })
        .expect(200);

      expect(response.body.tag.name).toBe('New Name');
    });

    it('API-TC-044: Should return 404 for non-existent tag', async () => {
      const fakeId = require('mongoose').Types.ObjectId();
      const response = await request(app)
        .put(`/api/tags/${fakeId}`)
        .set(authHeaders)
        .send({ name: 'New Name' })
        .expect(404);

      expect(response.body).toHaveProperty('message');
    });

    it('API-TC-045: Should not update tag from another user', async () => {
      const otherUser = await createAuthenticatedUser();
      const otherTag = await Tag.create({ name: 'Other Tag', user: otherUser.user._id });

      const response = await request(app)
        .put(`/api/tags/${otherTag._id}`)
        .set(authHeaders)
        .send({ name: 'Hacked Name' })
        .expect(404);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('DELETE /api/tags/:id', () => {
    let tag;

    beforeEach(async () => {
      tag = await Tag.create({ name: 'Delete Tag', user: user._id });
    });

    it('API-TC-046: Should delete tag successfully', async () => {
      const response = await request(app)
        .delete(`/api/tags/${tag._id}`)
        .set(authHeaders)
        .expect(200);

      expect(response.body).toHaveProperty('message');

      // Verify tag is deleted
      const deletedTag = await Tag.findById(tag._id);
      expect(deletedTag).toBeNull();
    });

    it('API-TC-047: Should return 404 for non-existent tag', async () => {
      const fakeId = require('mongoose').Types.ObjectId();
      const response = await request(app)
        .delete(`/api/tags/${fakeId}`)
        .set(authHeaders)
        .expect(404);

      expect(response.body).toHaveProperty('message');
    });

    it('API-TC-048: Should not delete tag from another user', async () => {
      const otherUser = await createAuthenticatedUser();
      const otherTag = await Tag.create({ name: 'Other Tag', user: otherUser.user._id });

      const response = await request(app)
        .delete(`/api/tags/${otherTag._id}`)
        .set(authHeaders)
        .expect(404);

      expect(response.body).toHaveProperty('message');

      // Verify tag still exists
      const existingTag = await Tag.findById(otherTag._id);
      expect(existingTag).not.toBeNull();
    });
  });
});

