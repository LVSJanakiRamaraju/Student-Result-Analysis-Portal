import React, { useState } from 'react';
import axios from 'axios';
import { FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('student');
  const [mode, setMode] = useState('signup');
  const [form, setForm] = useState({ rollNo: '', name: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.name || !form.password || (role === 'student' && !form.rollNo)) {
      alert('Please fill in all required fields.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const API = import.meta.env.VITE_API;
    setLoading(true);

    try {
      const endpoint = mode === 'login' ? 'login' : 'signup';
      const res = await axios.post(`${API}/auth/${endpoint}`, { ...form, role });

      if (mode === 'login') {

        const { token, user } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('role', user.role);
        localStorage.setItem('name', user.name);

        if (user.role === 'student') {
          localStorage.setItem('userId', user.rollNo);
          navigate('/student-dashboard');
        } else {
          navigate('/faculty-dashboard');
        }
      } else {
        alert('Signup successful! You can now login.');
        setMode('login');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-indigo-200 via-purple-200 to-pink-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md m-6 border transition-transform duration-300 transform hover:scale-105">
        <div className="flex items-center justify-center mb-6 gap-3">
          {role === 'student' ? (
            <FaUserGraduate className="text-blue-600 text-3xl" />
          ) : (
            <FaChalkboardTeacher className="text-purple-600 text-3xl" />
          )}
          <h2 className="text-2xl font-extrabold text-gray-800">
            {role === 'student' ? 'Student' : 'Faculty'} {mode === 'login' ? 'Login' : 'Signup'}
          </h2>
        </div>

        <div className="flex mb-5 bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-1 text-sm font-semibold rounded-full ${mode === 'login' ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white' : 'text-gray-600'}`}
          >
            Login
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-1 text-sm font-semibold rounded-full ${mode === 'signup' ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white' : 'text-gray-600'}`}
          >
            Signup
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Select Role:</label>
          <select
            className="w-full border border-purple-300 p-2 rounded-full focus:ring-2 focus:ring-purple-400"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>
        </div>

        {role === 'student' && (
          <div className="mb-4">
            <input
              className="w-full p-3 border border-blue-300 rounded-full focus:ring-2 focus:ring-blue-400"
              type="text"
              name="rollNo"
              placeholder="Roll Number"
              value={form.rollNo}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="mb-4">
          <input
            className="w-full p-3 border border-purple-300 rounded-full focus:ring-2 focus:ring-purple-400"
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <input
            className="w-full p-3 border border-pink-300 rounded-full focus:ring-2 focus:ring-pink-400"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button
          disabled={loading}
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 rounded-full shadow hover:opacity-90 active:scale-95 transition"
        >
          {loading ? (mode === 'signup' ? 'Signing Up...' : 'Logging In...') : (mode === 'signup' ? 'Sign Up' : 'Login')}
        </button>
        <p>If you are facing any problem please reload the page</p>
      </div>
    </div>
  );
};

export default AuthForm;
