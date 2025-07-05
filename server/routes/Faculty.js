
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const ExamData = require('../models/ExamData');

const Faculty = require('../models/Faculty');
const Performance = require('../models/Performance'); 


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });


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

router.post('/upload', upload.single('file'), async (req, res) => {
  
  try {
    const { batch, semester, examDate, examType, branch } = req.body;

    console.log(req.body);

    const formattedDate = new Date(`${examDate}-01`).toLocaleDateString('en-US', {
      month: 'long',
      year: '2-digit',
    });

    const examData = new ExamData({
      batch,
      semester: parseInt(semester),
      examDate: formattedDate,
      examType,
      branch,
      filePath: req.file?.path || '',
    });

    await examData.save();
    res.json({ message: 'Exam data uploaded successfully' });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Upload failed' });
  }
});

module.exports = router;
