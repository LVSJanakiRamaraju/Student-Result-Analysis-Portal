import React, { useState } from 'react';
import axios from 'axios';
import { FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';

const AuthForm = () => {
  const [role, setRole] = useState('student');
  const [form, setForm] = useState({
    rollNo: '',
    name: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (type) => {
    const API = import.meta.env.VITE_API || 'http://localhost:5000/api/auth';
    try {
      const res = await axios.post(`${API}/${type}`, { ...form, role });
      alert(res.data.message);
      //navigate to the appropriate dashboard based on role
    } catch (err) {

      alert(err.response?.data?.message || 'You should singup first!');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-indigo-200 via-purple-200 to-pink-100 transition-all">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 max-w-md hover:shadow-purple-300 transition-transform duration-300 transform hover:scale-[1.02] border-3 m-6 p-4">
        <div className="flex items-center justify-center mb-6 gap-3">
          {role === 'student' ? (
            <FaUserGraduate className="text-blue-600 text-3xl" />
          ) : (
            <FaChalkboardTeacher className="text-purple-600 text-3xl" />
          )}
          <h2 className="text-2xl font-extrabold text-gray-800">
            {role === 'student' ? 'Student' : 'Faculty'} Login / Signup
          </h2>
        </div>

        {/* Role Selection */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-1">Select Role:</label>
          <select
            className="w-full border border-purple-300 p-2 rounded-lg focus:ring-2 focus:ring-purple-400 transition"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>
        </div>

        {/* Student only field */}
        {role === 'student' && (
          <div className="mb-4">
            <input
              className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
              type="text"
              name="rollNo"
              placeholder="Roll Number"
              onChange={handleChange}
            />
          </div>
        )}

        {/* Name */}
        <div className="mb-4">
          <input
            className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 transition"
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <input
            className="w-full p-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400 transition"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        {/* Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={() => handleSubmit('signup')}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg hover:opacity-90 active:scale-95 transition"
          >
            Sign Up
          </button>
          <button
            onClick={() => handleSubmit('login')}
            className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 rounded-lg hover:opacity-90 active:scale-95 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
