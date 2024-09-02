const redis = require('redis');

const redisClient = redis.createClient({
  socket: {
    host: 'localhost', 
    port: 6379          
  }
});

redisClient.connect()
  .then(() => console.log('Connected to Redis'))
  .catch(err => console.error('Failed to connect to Redis', err));

  
module.exports = redisClient;
