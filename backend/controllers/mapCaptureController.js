const MapCapture = require('../models/mapCapture');
const redisClient = require('../redisClient');

exports.saveCapture = async (req, res) => {
  const { imageUrl, coordinates, zoom } = req.body;

  try {
    const newCapture = new MapCapture({ imageUrl, coordinates, zoom });
    await newCapture.save();
    res.status(201).send('Map state saved successfully');
  } catch (err) {
    console.error('Error saving map:', err);
    res.status(500).send('Server error: Unable to save map');
  }
};

exports.getCaptures = async (req, res) => {
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
};

exports.getTopCaptures = async (req, res) => {
  try {
    const cacheKey = 'top_captures';
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

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

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(topRegions)); // Cache for 1 hour
    res.json(topRegions);
  } catch (err) {
    console.error('Error fetching top captures:', err);
    res.status(500).send('Server error: Unable to fetch top captures');
  }
};
