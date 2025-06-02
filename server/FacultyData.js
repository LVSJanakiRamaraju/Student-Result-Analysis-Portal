const mongoose = require("mongoose");
const Faculty = require("./models/Faculty");
require('dotenv').config();

const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB Atlas');

const facultyData = [
  {
    name: "Mr.Naveen",
    subjects: [
      { name: "AI(CSM)", class: "CSM-A", year: "II/IV", semester: "II" },
      { name: "AI(CSM)", class: "CSM-C", year: "II/IV", semester: "II" }
    ],
    classTeacherOf: ["CSM-A"],
    courseCoordinatorOf: ["CSM"]
  },
  {
    name: "Ms.Y.Sruthi",
    subjects: [
      { name: "AI(CSM)", class: "CSM-B", year: "II/IV", semester: "II" },
      { name: "AI(CSM)", class: "CSM-D", year: "II/IV", semester: "II" }
    ],
    classTeacherOf: ["CSM-B"],
    courseCoordinatorOf: []
  },
  {
    name: "Mrs.A.Bhagya Lakshmi",
    subjects: [
      { name: "AI(CSM)", class: "CSD-A", year: "II/IV", semester: "II" },
      { name: "ITWS", class: "CSM-C", year: "I/IV", semester: "I" },
    ],
    classTeacherOf: ["CSD-A"],
    courseCoordinatorOf: ["CSD"]
  },
  {
    name: "Dr.Bheem Shankar",
    subjects: [
      { name: "AI(CSM)", class: "CSD-B", year: "II/IV", semester: "II" },
      { name: "AI(CSM)", class: "CSD-C", year: "II/IV", semester: "II" }
    ],
    classTeacherOf: ["CSD-B"],
    courseCoordinatorOf: []
  },
  {
    name: "Mrs.K.Moni Sushma Deep",
    subjects: [
      { name: "CD", class: "CSM-A", year: "II/IV", semester: "II" },
      { name: "CD", class: "CSM-C", year: "II/IV", semester: "II" },
      { name: "CD", class: "CSD-A", year: "II/IV", semester: "II" }
    ],
    classTeacherOf: [],
    courseCoordinatorOf: []
  },
  {
    name: "Mrs.Ch.Sowndarya Lahari",
    subjects: [
      { name: "CD", class: "CSM-B", year: "II/IV", semester: "II" }
    ],
    classTeacherOf: [],
    courseCoordinatorOf: []
  },
  {
    name: "Mrs.Y.Sudha Madhuri",
    subjects: [
      { name: "CD", class: "CSM-D", year: "II/IV", semester: "II" },
      { name: "CD", class: "CSD-B", year: "II/IV", semester: "II" }
    ],
    classTeacherOf: ["CSM-D"],
    courseCoordinatorOf: []
  },
  {
    name: "Mrs.N.Saketha Sri",
    subjects: [
      { name: "CD", class: "CSD-C", year: "II/IV", semester: "II" }
    ],
    classTeacherOf: ["CSD-C"],
    courseCoordinatorOf: []
  },
  {
    name: "Mrs.G.V.Gayatri",
    subjects: [
      { name: "DAA", class: "CSM-A", year: "II/IV", semester: "II" },
      { name: "DAA", class: "CSD-C", year: "II/IV", semester: "II" }
    ],
    classTeacherOf: [],
    courseCoordinatorOf: []
  },
  {
    name: "Ms.R.Anantha",
    subjects: [
      { name: "DAA", class: "CSM-B", year: "II/IV", semester: "II" },
      { name: "DAA", class: "CSM-C", year: "II/IV", semester: "II" }
    ],
    classTeacherOf: [],
    courseCoordinatorOf: []
  },
  {
    name: "Ms.M.V Bhuvaneswari",
    subjects: [
      { name: "DAA", class: "CSM-D", year: "II/IV", semester: "II" },
      { name: "DAA", class: "CSD-B", year: "II/IV", semester: "II" }
    ],
    classTeacherOf: [],
    courseCoordinatorOf: []
  },
  {
    name: "Ms.Sangamitra",
    subjects: [
      { name: "DAA", class: "CSD-A", year: "II/IV", semester: "II" },
      { name: "DAA", class: "CSD-B", year: "II/IV", semester: "II" }
    ],
    classTeacherOf: [],
    courseCoordinatorOf: []
  },
  {
    name: "Mrs.M.Krishna Veni",
    subjects: [
      { name: "DBMS+LAB", class: "CSM-A", year: "II/IV", semester: "II" },
      { name: "DBMS+LAB", class: "CSD-B", year: "II/IV", semester: "II" }
    ],
    classTeacherOf: ["CSD-B"],
    courseCoordinatorOf: []
  },
  {
    name: "Mrs.G.Surya Kala Eswari",
    subjects: [
      { name: "DBMS+LAB", class: "CSM-B", year: "II/IV", semester: "II" },
      { name: "DBMS+LAB", class: "CSM-C", year: "II/IV", semester: "II" }
    ],
    classTeacherOf: [],
    courseCoordinatorOf: []
  },
  {
    name: "Dr.SV Santhi",
    subjects: [
      { name: "DBMS+LAB", class: "CSD-A", year: "II/IV", semester: "II" },
      { name: "DBMS+LAB", class: "CSD-C", year: "II/IV", semester: "II" }
    ],
    classTeacherOf: [],
    courseCoordinatorOf: []
  },
  {
    name: "Mr.S.Ratan Kumar",
    subjects: [
      { name: "PYTHON PROGRAMMING PRACTICES", class: "CSM-A", year: "II/IV", semester: "II" }
    ],
    classTeacherOf: [],
    courseCoordinatorOf: []
  },
  {
    name: "Mrs.G.V.Gayatri",
    subjects: [
      { name: "PYTHON PROGRAMMING PRACTICES", class: "CSM-B", year: "II/IV", semester: "II" }
    ],
    classTeacherOf: [],
    courseCoordinatorOf: []
  },
  {
    name: "Mr.P.Santosh Kumar",
    subjects: [
      { name: "PYTHON PROGRAMMING PRACTICES", class: "CSM-C", year: "II/IV", semester: "II" }
    ],
    classTeacherOf: ["CSM-C"],
    courseCoordinatorOf: []
  },
  {
    name: "Y.Satish",
    subjects: [
      { name: "PYTHON PROGRAMMING PRACTICES", class: "CSM-D", year: "II/IV", semester: "II" }
    ],
    classTeacherOf: [],
    courseCoordinatorOf: []
  },
  {
    name: "Ms.Nirmala",
    subjects: [
      { name: "PYTHON PROGRAMMING PRACTICES", class: "CSD-A", year: "II/IV", semester: "II" }
    ],
    classTeacherOf: ["CSD-A"],
    courseCoordinatorOf: []
  },
  {
    name: "Mr.S.Yoganandh",
    subjects: [
      { name: "PYTHON PROGRAMMING PRACTICES", class: "CSD-B", year: "II/IV", semester: "II" },
      { name: "PYTHON PROGRAMMING PRACTICES", class: "CSD-C", year: "II/IV", semester: "II" }
    ],
    classTeacherOf: [],
    courseCoordinatorOf: []
  }
];


    await Faculty.insertMany(facultyData);
    console.log('Faculty data inserted successfully!');
    process.exit(0);
  })
  .catch((err) => console.error('Error:', err));