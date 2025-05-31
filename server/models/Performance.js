const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
  ID: String,
  semesters: [
    {
      name: String,
      SGPA: Number,
      CGPA: Number,
    },
  ],
});

module.exports = mongoose.model('Performance', performanceSchema);
