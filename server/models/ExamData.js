const mongoose = require('mongoose');

const examDataSchema = new mongoose.Schema({
  batch: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  examDate: {
    type: String, 
    required: true,
  },
  examType: {
    type: String,
    enum: ['regular', 'supply', 'regular & supply'],
    required: true,
  },
    branch: {
        type: String,
        enum: ['csm', 'csd', 'cse', 'ece', 'eee', 'mech'],
        required: true,
    },
  filePath: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ExamData', examDataSchema);
