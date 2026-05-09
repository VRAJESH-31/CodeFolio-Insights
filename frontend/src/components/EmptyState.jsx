import React from 'react';
import { AlertCircle } from 'lucide-react';

const EmptyState = ({ title, message = 'No data available at this time.', Icon = AlertCircle, className = '', height = 'h-48', isCard = true }) => {
  const content = (
    <div className={`flex flex-col items-center justify-center text-center ${height} ${!isCard ? className : ''}`}>
      <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform hover:scale-110 duration-300">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      {title && <h3 className="text-xl font-bold text-gray-800 mb-2 uppercase tracking-tight">{title}</h3>}
      <p className="text-gray-500 max-w-md mx-auto font-medium leading-relaxed">{message}</p>
    </div>
  );

  if (!isCard) return content;

  return <div className={`backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-dashed border-gray-200 animate-float-in ${className}`}>{content}</div>;
};

export default EmptyState;
