import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentDashboard = () => {
  const name = localStorage.getItem('name');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const getDashboardData = async () => {
    try {
      const res = await axios.get('/api/auth/student-dashboard', {
        headers: { Authorization: localStorage.getItem('token') }
      });
      alert(res.data.message);
    } catch (err) {
      alert(err.response.data.message || 'Error fetching data');
    }
  };

  return (
    <div className="p-10 bg-green-50 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">🎓 Student Dashboard</h1>
      <p className="mb-4 text-lg">Welcome, {name}!</p>

      <button
        onClick={getDashboardData}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        Fetch Dashboard Data
      </button>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default StudentDashboard;
