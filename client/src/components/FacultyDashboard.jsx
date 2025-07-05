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
import { Navigate, useNavigate } from 'react-router-dom';

const FacultyDashboard = () => {
  const facultyId = localStorage.getItem('name'); 
  const facultyRole = localStorage.getItem('role');

  const [assignedSubjects, setAssignedSubjects] = useState([]);
  const [classTeacherOf, setClassTeacherOf] = useState([]);
  const [courseCoordinatorOf, setCourseCoordinatorOf] = useState([]);
  const [classPerformance, setClassPerformance] = useState([]);

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

        <div className="mt-6 bg-white rounded shadow p-4">
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
