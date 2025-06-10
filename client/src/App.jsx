import {React, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import AuthForm from './components/AuthForm';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import FacultyDashboard from './components/FacultyDashboard';

function App() {
  const isAuthenticated = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Router>
        <div className="flex-grow flex flex-col justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthForm />} />
            <Route path='/login' element={<Login />} />

            <Route
              path="/student-dashboard"
              element={
                isAuthenticated && role === 'student' ? (
                  <StudentDashboard />
                ) : (
                  <Navigate to="/auth" />
                )
              }
            />

            <Route
              path="/faculty-dashboard"
              element={
                isAuthenticated && role === 'faculty' ? (
                  <FacultyDashboard />
                ) : (
                  <Navigate to="/auth" />
                )
              }
            />
          </Routes>
        </div>

        <footer className="mt-6 text-gray-600 text-sm bg-gray-100 flex justify-center items-center p-4">
          &copy; {new Date().getFullYear()} Student Portal
        </footer>
      </Router>
    </div>
  );
}

export default App;
