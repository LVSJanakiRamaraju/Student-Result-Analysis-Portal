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

const FacultyDashboard = () => {
  const facultyId = localStorage.getItem('name'); // Assuming 'name' is facultyId
  const [assignedSubjects, setAssignedSubjects] = useState([]);
  const [classTeacherOf, setClassTeacherOf] = useState([]);
  const [courseCoordinatorOf, setCourseCoordinatorOf] = useState([]);
  const [classPerformance, setClassPerformance] = useState([]);

  const VITE_API = import.meta.env.VITE_API || 'http://localhost:5000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Fetch faculty's subjects, classTeacherOf, courseCoordinatorOf
        const res1 = await axios.get(`${VITE_API}/faculty/subjects/${facultyId}`);
        console.log(res1.data);
        setAssignedSubjects(res1.data.subjects || []);
        setClassTeacherOf(res1.data.classTeacherOf || []);
        setCourseCoordinatorOf(res1.data.courseCoordinatorOf || []);

        // 2️⃣ Fetch class performance data (if any)
        const res2 = await axios.get(`${VITE_API}/faculty/performance/${facultyId}`);
        setClassPerformance(res2.data.performance || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [facultyId]);

  return (
    <div className="flex">
      <div className="flex-1 bg-gray-100 p-6 min-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-purple-700">{facultyId} Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <ChartCard title="Subjects Assigned">{assignedSubjects.length}</ChartCard>
          <ChartCard title="Class Teacher Of">{classTeacherOf.join(', ') || "N/A"}</ChartCard>
          <ChartCard title="Course Coordinator Of">{courseCoordinatorOf.join(', ') || "N/A"}</ChartCard>
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
    </div>
  );
};

export default FacultyDashboard;
