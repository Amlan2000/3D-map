require('dotenv').config();
require('./redisClient');
const express = require('express');
const signUpRoute = require("./Routes/signupRoutes");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors');
const loginRoute = require("./Routes/loginRoutes");
const userRoute = require("./Routes/userRoutes");
const mapCaptureRoutes = require('./Routes/mapCaptureRoutes');

const uri = process.env.MONGODB_URI || "your_mongo_uri_here";
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Failed to connect to MongoDB Atlas', err));

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.CLIENT_URL, // Your frontend URL
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use("/user", signUpRoute);
app.use("/auth", loginRoute);
app.use("/api", userRoute);
app.use("/map", mapCaptureRoutes);

app.listen(port, () => console.log(`Listening on port ${port}...`));
