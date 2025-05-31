import React, { useEffect, useState } from 'react';
import ChartCard from './ChartCard';
import PerformanceChart from './PerformanceChart';
import ResultsTable from './ResultsTable';
import axios from 'axios';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

const StudentDashboard = () => {
  const userId = localStorage.getItem('userId');
  const [semesters, setSemesters] = useState([]);
  const [highestSGPA, setHighestSGPA] = useState(0);
  const [lowestSGPA, setLowestSGPA] = useState(0);
  const [totalCGPA, setTotalCGPA] = useState(0);

  const [compareId, setCompareId] = useState('');
  const [compareData, setCompareData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/performance/${userId}`);
        const data = res.data;
        setSemesters(data.semesters);

        const sgpas = data.semesters.map(sem => parseFloat(sem.SGPA));
        setHighestSGPA(Math.max(...sgpas).toFixed(2));
        setLowestSGPA(Math.min(...sgpas).toFixed(2));
        setTotalCGPA(data.semesters[4]?.CGPA ? parseFloat(data.semesters[4].CGPA).toFixed(2) : 0);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [userId]);

  const handleCompare = async () => {
    if (!compareId) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/performance/${compareId}`);
      setCompareData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getCombinedChartData = () => {
    if (!compareData) return [];
    return semesters.map((sem, idx) => ({
      name: sem.name,
      yourSGPA: parseFloat(sem.SGPA),
      compareSGPA: parseFloat(compareData.semesters[idx]?.SGPA || 0),
      yourCGPA: parseFloat(sem.CGPA),
      compareCGPA: parseFloat(compareData.semesters[idx]?.CGPA || 0),
    }));
  };

  return (
    <div className="flex">
      <div className="flex-1 bg-gray-100 p-6 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">{userId} Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <ChartCard title="Highest SGPA">{highestSGPA} SGPA</ChartCard>
          <ChartCard title="Lowest SGPA">{lowestSGPA} SGPA</ChartCard>
          <ChartCard title="Total CGPA">{totalCGPA} CGPA</ChartCard>
        </div>

        <PerformanceChart userId={userId} />

        <ResultsTable semesters={semesters} />

        <div className="mt-6 bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold mb-2 text-purple-600">Compare with another student</h2>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Enter Student ID"
              value={compareId}
              onChange={e => setCompareId(e.target.value)}
              className="border rounded px-2 py-1 flex-1"
            />
            <button
              onClick={handleCompare}
              className="bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600 transition"
            >
              Compare
            </button>
          </div>

          {compareData && (
            <div>
              <h3 className="text-md font-semibold mb-2 text-green-700">Comparison Results</h3>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={getCombinedChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={['dataMin - 1', 'dataMax + 1']}
                  tickFormatter={(value) => value.toFixed(2)} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="yourSGPA" stroke="#3b82f6" strokeWidth={2} name="Your SGPA" />
                  <Line type="monotone" dataKey="compareSGPA" stroke="#ef4444" strokeWidth={2} name="Other's SGPA" />
                  <Line type="monotone" dataKey="yourCGPA" stroke="#0ea5e9" strokeWidth={2} strokeDasharray="5 5" name="Your CGPA" />
                  <Line type="monotone" dataKey="compareCGPA" stroke="#f97316" strokeWidth={2} strokeDasharray="5 5" name="Other's CGPA" />
                </LineChart>
              </ResponsiveContainer>

              {/* Backlogs Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="font-semibold text-blue-600 mb-2">Your Backlogs</h4>
                  <table className="min-w-full text-xs border">
                    <thead>
                      <tr className="bg-blue-100">
                        <th className="p-1">Semester</th>
                        <th className="p-1">Backlogs</th>
                      </tr>
                    </thead>
                    <tbody>
                      {semesters.map((s, idx) => (
                        <tr key={idx} className="text-center border-b">
                          <td className="p-1">{s.name}</td>
                          <td className="p-1">{s.SGPA == 0 ? "YES" : "NO"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">{compareId} Backlogs</h4>
                  <table className="min-w-full text-xs border">
                    <thead>
                      <tr className="bg-red-100">
                        <th className="p-1">Semester</th>
                        <th className="p-1">Backlogs</th>
                      </tr>
                    </thead>
                    <tbody>
                      {compareData.semesters.map((s, idx) => (
                        <tr key={idx} className="text-center border-b">
                          <td className="p-1">{s.name}</td>
                          <td className="p-1">{s.SGPA == 0 ? "YES" : "NO"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
