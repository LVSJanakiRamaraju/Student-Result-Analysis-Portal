import React from 'react';

const ResultsTable = ({ semesters = [] }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-2">Your Results</h2>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-blue-100">
            <th className="p-2">Semester</th>
            <th className="p-2">SGPA</th>
            <th className="p-2">CGPA</th>
            <th className="p-2">Backlogs</th>
          </tr>
        </thead>
        <tbody>
          {semesters.length > 0 ? (
            semesters.map((r) => (
              <tr key={r.name} className="text-center border-b">
                <td className="p-2">{r.name}</td>
                <td className="p-2">{r.SGPA}</td>
                <td className="p-2">{r.CGPA}</td>
                <td className="p-2">{r.SGPA == 0 ? "YES" : "NO"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-2 text-gray-500">
                No results available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
