
const express = require('express');
const router = express.Router();

const Faculty = require('../models/Faculty');
const Performance = require('../models/Performance'); 


router.get('/subjects/:facultyId', async (req, res) => {
  try {
    const faculty = await Faculty.findOne({ name: req.params.facultyId });
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });

    res.json({
      name: faculty.name,
      subjects: faculty.subjects,
      classTeacherOf: faculty.classTeacherOf,
      courseCoordinatorOf: faculty.courseCoordinatorOf,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/performance/:facultyId', async (req, res) => {
  try {
    const faculty = await Faculty.findOne({ name: req.params.facultyId });
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });


    const performance = faculty.subjects.map((subj) => ({
      class: subj.class,
      subject: subj.name,
      note: "Pass % unavailable"
    }));

    res.json({ performance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
