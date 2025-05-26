import React from 'react';
import Home from './components/Home';
import AuthForm from './components/AuthForm';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
      <div>
          <div className="bg-gray-100 flex flex-col justify-center">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<AuthForm />} />
            </Routes>
          </Router>
        </div>
        <footer className="mt-6 text-gray-600 justify-end text-sm bg-gray-100 flex flex-col items-center p-6">
            &copy; {new Date().getFullYear()} Student Portal
          </footer>
      </div>
  );
}

export default App;
