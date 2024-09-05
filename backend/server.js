require('dotenv').config();
require('./passport');
require('./redisClient');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');
const authRoute = require('./Routes/auth');
const mapCaptureRoutes = require('./Routes/mapCaptureRoutes');
const app = express();

app.enable('trust proxy'); // Important when using cookies behind a reverse proxy like Netlify

app.use(
  cookieSession({
    name: "session",
    keys: ["test"],
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: 'None', // Important for cross-site cookies
    secure: process.env.NODE_ENV === 'production', // Only HTTPS cookies in production
  })
);

app.use(express.json());

const uri = process.env.MONGODB_URI || "your_mongo_uri_here";
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Failed to connect to MongoDB Atlas', err));

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: process.env.CLIENT_URL, // Frontend URL (Netlify URL)
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // Allow sending cookies with requests
  })
);

app.use("/auth", authRoute);
app.use("/map", mapCaptureRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
