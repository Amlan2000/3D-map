const mongoose = require('mongoose');

const mapCaptureSchema = new mongoose.Schema({
  imageUrl: String,
  coordinates: Object,
  zoom: Number,
  timestamp: { type: Date, default: Date.now },
});

mapCaptureSchema.index({ "coordinates.lat": 1, "coordinates.lng": 1 });

const MapCapture = mongoose.model('MapCapture', mapCaptureSchema, 'map');

module.exports = MapCapture;
