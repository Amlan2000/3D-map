require('dotenv').config();
require('./redisClient');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const mapCaptureRoutes = require('./Routes/mapCaptureRoutes');
const app = express();


app.enable('trust proxy'); // Important when using cookies behind a reverse proxy like Netlify

// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["test"],
//     maxAge: 24 * 60 * 60 * 1000,
//     sameSite: 'None', // Important for cross-site cookies
//     secure: 'true'
//   })
// );
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200); // Send OK status for OPTIONS
});


app.use(express.json());

const uri = process.env.MONGODB_URI || "your_mongo_uri_here";
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Failed to connect to MongoDB Atlas', err));

// app.use(passport.initialize());
// app.use(passport.session());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // Allow sending cookies with requests
  })
);

// app.use("/auth", authRoute);
// app.use("/map", mapCaptureRoutes);

app.use('/map', mapCaptureRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));