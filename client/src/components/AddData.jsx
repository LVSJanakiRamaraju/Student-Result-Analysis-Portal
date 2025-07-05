import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddData = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    batch: '',
    semester: '',
    examDate: '',
    examType: '',
    branch: '',
    file: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const VITE_API = import.meta.env.VITE_API || 'http://localhost:5000';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.batch || !form.semester || !form.examDate || !form.examType || !form.branch || !form.file) {
      alert('All fields are required');
      return;
    }

    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }

    try {
      await axios.post(`${VITE_API}/faculty/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Failed to upload data');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-purple-700">Add Exam Data</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="batch"
            placeholder="Batch (e.g., 2020-2024)"
            value={form.batch}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <select
            name="branch"
            value={form.branch}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            >
            <option value="">Select Branch</option>
            <option value="csm">CSM</option>
            <option value="csd">CSD</option>
            <option value="cse">CSE</option>
            <option value="ece">ECE</option>
            <option value="eee">EEE</option>
            <option value="mech">MECH</option>
            </select>

          <input
            type="number"
            name="semester"
            placeholder="Semester (e.g., 3)"
            value={form.semester}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

            <input
            type="month"
            name="examDate"
            value={form.examDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            />

          <select
            name="examType"
            value={form.examType}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Type</option>
            <option value="regular">Regular</option>
            <option value="supply">Supply</option>
            <option value="regular & supply">Regular & Supply</option>
          </select>

          <input
            type="file"
            accept=".pdf,.csv,.xls,.xlsx"
            onChange={handleFileChange}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>

        {submitted && (
          <button
            onClick={() => navigate('/faculty-dashboard')}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Back to Dashboard
          </button>
        )}
      </div>
    </div>
  );
};

export default AddData;
