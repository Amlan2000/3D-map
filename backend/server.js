const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const path = require('path');
const redisClient = require('./redisClient');
require('./auth'); // Ensure this file sets up passport strategies

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client')));

const uri = "mongodb+srv://amlan:hellotest@cluster0.4lk4a.mongodb.net/project?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Failed to connect to MongoDB Atlas', err));

const mapCaptureSchema = new mongoose.Schema({
  imageUrl: String,
  coordinates: Object,
  zoom: Number,
  timestamp: { type: Date, default: Date.now },
});

mapCaptureSchema.index({ "coordinates.lat": 1, "coordinates.lng": 1 });

const MapCapture = mongoose.model('MapCapture', mapCaptureSchema, 'map');

app.use(session({
  secret: 'dog',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

app.post('/save', async (req, res) => {
  const { imageUrl, coordinates, zoom } = req.body;

  try {
    const newCapture = new MapCapture({ imageUrl, coordinates, zoom });
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
});

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/auth/protected',
    failureRedirect: '/auth/google/failure'
  })
);

app.get('/auth/google/failure', (req, res) => {
  res.send("Something went wrong!");
});

app.get('/auth/protected', isLoggedIn, (req, res) => {
  let name = req.user.displayName;
  res.send("hello world! " + name);
});

app.listen(5000, () => console.log('Server started on port 5000'));
