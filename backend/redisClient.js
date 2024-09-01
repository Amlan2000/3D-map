const redis = require('redis');

// Create a Redis client with connection options
const redisClient = redis.createClient({
  socket: {
    host: 'localhost',  // Change this if Redis is on a different host
    port: 6379          // Change this if Redis is running on a different port
  }
});

// Connect to Redis
redisClient.connect()
  .then(() => console.log('Connected to Redis'))
  .catch(err => console.error('Failed to connect to Redis', err));

// Export the Redis client for use in other files
module.exports = redisClient;
