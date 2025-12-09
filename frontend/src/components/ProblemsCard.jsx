// src/components/ProblemsCard.jsx
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// --- Custom Tooltip (Optional, but good for details on hover) ---
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow-lg text-gray-800 text-xs">
        <p className="font-bold">{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

// --- Main Component ---
const ProblemsCard = ({title="", problemsData=[]}) => {
  const chartSize = 150; // Controls the overall size of the chart

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 font-sans text-gray-800 w-full max-w-sm mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mr-2">{title}</h3>
      </div>
      
      {/* Chart and List Container */}
      <div className="flex items-center">
        
        {/* 1. Donut Chart */}
        <ResponsiveContainer width={chartSize} height={chartSize}>
          <PieChart>
            <Pie
              data={problemsData}
              dataKey="value"
              innerRadius={chartSize * 0.3}
              outerRadius={chartSize * 0.45}
              paddingAngle={3}
              startAngle={90} // Starts the chart at the top
              endAngle={-270}
            >
              {problemsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            {/* Central Total Number */}
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-3xl font-bold fill-gray-900">
              {problemsData.reduce((sum, item) => sum + item.value, 0)}
            </text>
          </PieChart>
        </ResponsiveContainer>
        
        {/* 2. Category List */}
        <div className="flex-grow ml-6 space-y-3">
          {problemsData.map((item) => (
            <div 
              key={item.name} 
              className="flex justify-between items-center bg-gray-100 px-3 py-1 rounded-lg shadow-sm"
            >
              <span className="font-medium" style={{ color: item.color }}>
                {item.name}
              </span>
              <span className="text-gray-700 font-mono text-lg">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProblemsCard;