const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const redisClient = require('./redisClient');

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://amlan:hellotest@cluster0.4lk4a.mongodb.net/project?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Failed to connect to MongoDB Atlas', err));

const mapCaptureSchema = new mongoose.Schema({
  imageUrl: String,
  coordinates: Object,
  zoom:Number,
  timestamp: { type: Date, default: Date.now },
});

mapCaptureSchema.index({ "coordinates.lat": 1, "coordinates.lng": 1 });

// Specify the collection name explicitly
const MapCapture = mongoose.model('MapCapture', mapCaptureSchema, 'map');


app.post('/save', async (req, res) => {
  const { imageUrl, coordinates, zoom } = req.body;

  try {
    const newCapture = new MapCapture({imageUrl,coordinates,zoom});
    await newCapture.save();
    res.status(201).send('Map state saved successfully');
  } catch (err) {
    console.error('Error saving map:', err);
    res.status(500).send('Server error: Unable to save map');
  }
});


app.get('/captures', async (req, res) => {
  try {
    const captures = await MapCapture.find();
    if (!captures) {
      return res.status(404).send('Map state not found');
    }
    res.status(200).json(captures);
  } catch (err) {
    console.error('Error loading map state:', err);
    res.status(500).send('Server error: Unable to load map state');
  }
});

app.get('/top-captures', async (req, res) => {
  try {
    // First, check if the data is available in the cache
    const cacheKey = 'top_captures';
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      // If cached data is found, return it
      return res.json(JSON.parse(cachedData));
    }

    // If data is not found in the cache, fetch it from the database
    const topRegions = await MapCapture.aggregate([
      {
        $group: {
          _id: {
            lat: "$coordinates.lat",
            lng: "$coordinates.lng"
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 3
      }
    ]);

    // Store the fetched data in the cache with an expiration time
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(topRegions)); // Cache for 1 hour

    // Return the fetched data
    res.json(topRegions);
  } catch (err) {
    console.error('Error fetching top captures:', err);
    res.status(500).send('Server error: Unable to fetch top captures');
  }
});



app.listen(5000, () => console.log('Server started on port 5000'));