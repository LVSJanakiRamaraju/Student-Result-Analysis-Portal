// scripts/importCSV.js
const mongoose = require('mongoose');
const csv = require('csvtojson');
require('dotenv').config();

const uri = process.env.MONGO_URI;

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

const Performance = mongoose.model('Performance', performanceSchema);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB Atlas');

    const jsonArray = await csv().fromFile('./csm.csv');

    const formattedData = jsonArray.map((row) => {
      const semesters = [];
      Object.keys(row).forEach((key) => {
        if (key.startsWith('SGPA')) {
          const semesterName = key.split(' ')[1];
          semesters.push({
            name: semesterName,
            SGPA: parseFloat(row[key]) || 0,
            CGPA: parseFloat(row[`CGPA ${semesterName}`]) || 0,
          });
        }
      });

      return {
        ID: row.ID,
        semesters,
      };
    });

    await Performance.insertMany(formattedData);
    console.log('Data inserted!');
    process.exit(0);
  })
  .catch((err) => console.error('Error:', err));
