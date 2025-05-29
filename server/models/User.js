const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['student', 'faculty'], required: true },
  rollNo: { type: String },
  name: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
