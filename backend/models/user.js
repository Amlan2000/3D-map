// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//   googleId: String,
//   displayName: String,
//   email: String,
//   timestamp: { type: Date, default: Date.now },
  
// });

// module.exports = mongoose.model('User', UserSchema);

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  displayName: { type: String },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
