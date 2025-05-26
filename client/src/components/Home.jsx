import React from 'react';
import { Link, Navigate } from 'react-router-dom';

const Home = () => (
  <div className="mb-10 text-center">
    <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 drop-shadow-lg mb-4">
      🎓 Student Result Analysis Portal
    </h1>
    <p className="text-lg md:text-xl text-gray-700 font-medium">
      Welcome! Please <span className="text-green-600 font-semibold">Login</span> or <span className="text-purple-600 font-semibold">Sign Up</span> to continue.
    </p>
    <div className="mt-6 flex justify-center">
      <div className="h-1 w-24 bg-blue-500 rounded-full"></div>
    </div>
    <div>
      <Link to="/auth" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
        Login / Sign Up
      </Link>
    </div>
  </div>
);

export default Home;
