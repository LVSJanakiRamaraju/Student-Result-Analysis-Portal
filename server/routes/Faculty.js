
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const ExamData = require('../models/ExamData');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');
const Faculty = require('../models/Faculty');
const Performance = require('../models/Performance'); 


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'exam_uploads',
    resource_type: 'raw', 
    allowed_formats: ['pdf', 'csv', 'xlsx', 'xls'],
    public_id: (req, file) => Date.now() + '-' + file.originalname,
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

    //console.log(req.body);
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

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
    res.json({ message: 'Exam data uploaded successfully', data: examData });
  } catch (err) {
    console.error('Upload error:', err.message);
    console.error(err.stack)
    res.status(500).json({ message: 'Upload failed' });
  }
});

router.get('/uploads', async (req, res) => {
  try {
    const data = await ExamData.find().sort({ uploadedAt: -1 });
    res.json({ data });
  } catch (err) {
    console.error('Fetch uploads error:', err);
    res.status(500).json({ message: 'Failed to fetch uploads' });
  }
});

module.exports = router;
