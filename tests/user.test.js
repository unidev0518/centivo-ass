// tests/user.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('../routes/userRoutes');
const User = require('../models/User');

// Load environment variables from .env file
dotenv.config();

// Create an Express app for testing
const app = express();
app.use(express.json());
app.use('/users', userRoutes);

describe('GET /users/:id', () => {
  let server;
  let userId;

  // Connect to a test database before running tests
  beforeAll(async () => {
    const url = process.env.MONGO_URI_TEST || `mongodb://127.0.0.1/testdb`;
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  // Seed the database with a test user
  beforeEach(async () => {
    const user = new User({ name: 'John Doe', email: 'johndoe@email.com', age: 30 });
    await user.save();
    userId = user._id;
  });

  // Clean up the database after each test
  afterEach(async () => {
    await User.deleteMany();
  });

  // Close the database connection after all tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return a user if a valid ID is provided and age is greater than 21', async () => {
    const res = await request(app).get(`/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', 'John Doe');
  });

  it('should return 404 if user is not found', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/users/${nonExistentId}`);
    expect(res.statusCode).toBe(404);
  });

  it('should return 400 for invalid user ID', async () => {
    const res = await request(app).get('/users/invalidId');
    expect(res.statusCode).toBe(400);
  });
});