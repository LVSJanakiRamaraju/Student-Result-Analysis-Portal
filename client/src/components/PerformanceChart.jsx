import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#3b82f6', '#ef4444'];

const PerformanceChart = ({ userId }) => {
  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([
    { name: 'Pass', value: 0 },
    { name: 'Fail', value: 0 },
  ]);

  const VITE_API = import.meta.env.VITE_API || 'http://localhost:5000/api';

useEffect(() => {
  const fetchData = async () => {
    try {
      console.log(userId);
      const res = await axios.get(`${VITE_API}/performance/${userId}`);
      const data = res.data;

      const lineDataFormatted = data.semesters.map((sem, idx) => ({
        name: sem.name, 
        SGPA: parseFloat(sem.SGPA),
        CGPA: parseFloat(sem.CGPA),
      }));

      const allValues = lineDataFormatted.flatMap(d => [d.SGPA, d.CGPA]);
      const minY = (Math.min(...allValues) + 0.5);
      const maxY = Math.max(...allValues) + 0.5;

      const passCount = lineDataFormatted.filter(s => s.SGPA >= 5).length;
      const failCount = lineDataFormatted.length - passCount;

      setLineData(lineDataFormatted);
      setPieData([
        { name: 'Pass', value: passCount },
        { name: 'Fail', value: failCount },
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  fetchData();
}, []);


  const allValues = lineData.flatMap(d => [d.SGPA, d.CGPA]);
  const minY = Math.min(...allValues) - 0.5;
  const maxY = Math.max(...allValues) + 0.5;

  return (
    <div className="">
      <div className="flex-1">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="6 6" />
            <XAxis dataKey="name" />
            <YAxis domain={[minY, maxY]}
            tickFormatter={(value) => value.toFixed(2)} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="SGPA" stroke="#3b82f6" strokeWidth={2} />
            <Line type="monotone" dataKey="CGPA" stroke="#facc15" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
