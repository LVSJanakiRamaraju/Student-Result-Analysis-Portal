import React from 'react';

const ChartCard = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow p-4 flex-1">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    {children}
  </div>
);

export default ChartCard;
