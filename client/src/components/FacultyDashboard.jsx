import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChartCard from './ChartCard';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const FacultyDashboard = () => {
  const facultyId = localStorage.getItem('name'); 
  const facultyRole = localStorage.getItem('role');

  const [assignedSubjects, setAssignedSubjects] = useState([]);
  const [classTeacherOf, setClassTeacherOf] = useState([]);
  const [courseCoordinatorOf, setCourseCoordinatorOf] = useState([]);
  const [classPerformance, setClassPerformance] = useState([]);

  const [uploads, setUploads] = useState([]);
  const [filters, setFilters] = useState({
    batch: '',
    branch: '',
    semester: '',
    examType: '',
  });

  const VITE_API = import.meta.env.VITE_API || 'http://localhost:5000';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!facultyId) return;

      try {
        const res1 = await axios.get(`${VITE_API}/faculty/subjects/${facultyId}`);
        setAssignedSubjects(res1.data.subjects || []);
        setClassTeacherOf(res1.data.classTeacherOf || []);
        setCourseCoordinatorOf(res1.data.courseCoordinatorOf || []);

        const res2 = await axios.get(`${VITE_API}/faculty/performance/${facultyId}`);
        setClassPerformance(res2.data.performance || []);

        const res3 = await axios.get(`${VITE_API}/faculty/uploads`);
        setUploads(res3.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [facultyId]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const filteredUploads = uploads.filter((item) => {
    return (
      (filters.batch ? item.batch === filters.batch : true) &&
      (filters.branch ? item.branch === filters.branch : true) &&
      (filters.semester ? item.semester === parseInt(filters.semester) : true) &&
      (filters.examType ? item.examType === filters.examType : true)
    );
  });

  if (!facultyId || facultyRole !== 'faculty') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-xl font-semibold text-red-600">Please log in as faculty to access the dashboard.</h2>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="flex-1 bg-gray-100 p-6 min-h-screen">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-purple-700">{facultyId}'s Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <ChartCard title="Subjects Assigned">{assignedSubjects.length}</ChartCard>
          <ChartCard title="Class Teacher Of">{classTeacherOf.length > 0 ? classTeacherOf.join(', ') : "N/A"}</ChartCard>
          <ChartCard title="Course Coordinator Of">{courseCoordinatorOf.length > 0 ? courseCoordinatorOf.join(', ') : "N/A"}</ChartCard>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Your Subjects</h2>
          <ul className="list-disc pl-6">
            {assignedSubjects.map((subj, idx) => (
              <li key={idx}>{subj.name} ({subj.class})</li>
            ))}
          </ul>
        </div>

        <div className="mt-6 bg-white rounded shadow p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4 text-green-600">Class Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={classPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="class" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="passPercentage" fill="#10b981" name="Pass %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-4">Uploaded Exam Data</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <input
              placeholder="Filter by Batch"
              className="p-2 border rounded"
              value={filters.batch}
              onChange={(e) => setFilters({ ...filters, batch: e.target.value })}
            />
            <select
              className="p-2 border rounded"
              value={filters.branch}
              onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
            >
              <option value="">All Branches</option>
              <option value="csm">CSM</option>
              <option value="csd">CSD</option>
              <option value="cse">CSE</option>
              <option value="ece">ECE</option>
              <option value="eee">EEE</option>
              <option value="mech">MECH</option>
            </select>
            <input
              placeholder="Semester"
              type="number"
              className="p-2 border rounded"
              value={filters.semester}
              onChange={(e) => setFilters({ ...filters, semester: e.target.value })}
            />
            <select
              className="p-2 border rounded"
              value={filters.examType}
              onChange={(e) => setFilters({ ...filters, examType: e.target.value })}
            >
              <option value="">All Types</option>
              <option value="regular">Regular</option>
              <option value="supply">Supply</option>
              <option value="regular & supply">Regular & Supply</option>
            </select>
          </div>

          <div className="overflow-auto">
            <table className="min-w-full table-auto border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Batch</th>
                  <th className="border p-2">Branch</th>
                  <th className="border p-2">Semester</th>
                  <th className="border p-2">Exam Date</th>
                  <th className="border p-2">Type</th>
                  <th className="border p-2">File</th>
                </tr>
              </thead>
              <tbody>
                {filteredUploads.map((item, index) => (
                  <tr key={index} className="text-center">
                    <td className="border p-2">{item.batch}</td>
                    <td className="border p-2 uppercase">{item.branch}</td>
                    <td className="border p-2">{item.semester}</td>
                    <td className="border p-2">{item.examDate}</td>
                    <td className="border p-2">{item.examType}</td>
                    <td className="border p-2">
                      <a
                        href={item.filePath}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 underline"
                      >
                        View File
                      </a>
                        
                    </td>
                  </tr>
                ))}
                {filteredUploads.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-500">No matching records found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <button
          onClick={() => navigate('/add-data')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 fixed bottom-4 right-4 shadow-lg"
        >
          Add Exam Data
        </button>
      </div>
    </div>
  );
};

export default FacultyDashboard;
