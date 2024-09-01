// redisClient.js
const redis = require('redis');

// Create a Redis client
const redisClient = redis.createClient();

// Connect to Redis
redisClient.connect()
  .then(() => console.log('Connected to Redis'))
  .catch(err => console.error('Failed to connect to Redis', err));

// Export the Redis client for use in other files
module.exports = redisClient;
