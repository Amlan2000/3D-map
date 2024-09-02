require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');
const authRoute = require('./Routes/auth');
const mapCaptureRoutes = require('./Routes/mapCaptureRoutes');

const app = express();
require('./passport');
require('./redisClient');

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI || "your_mongo_uri_here";
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Failed to connect to MongoDB Atlas', err));

app.use(
  cookieSession({
    name: "session",
    keys: ["test"],
    maxAge: 10000,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);
app.use("/map", mapCaptureRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
