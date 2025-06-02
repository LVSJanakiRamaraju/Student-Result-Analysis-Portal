const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: String,
  class: String,
  year: String,
  semester: String,
});

const facultySchema = new mongoose.Schema({
  name: String,
  subjects: [subjectSchema],
  classTeacherOf: [String],
  courseCoordinatorOf: [String],
});

module.exports = mongoose.model("Faculty", facultySchema);
