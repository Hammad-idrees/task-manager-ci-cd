/**
 * Database Helper for Tests
 * Handles test database connection and cleanup
 */

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/task-manager-test';
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Test database connected');
  } catch (error) {
    console.error('❌ Test database connection error:', error.message);
    throw error;
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('✅ Test database disconnected');
  } catch (error) {
    console.error('❌ Test database disconnection error:', error.message);
    throw error;
  }
};

const clearDatabase = async () => {
  try {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
    console.log('✅ Test database cleared');
  } catch (error) {
    console.error('❌ Error clearing test database:', error.message);
    throw error;
  }
};

module.exports = {
  connectDB,
  disconnectDB,
  clearDatabase,
};

