import React from 'react';
import { Loader } from 'lucide-react';

const LoaderSpinner = ({ className = 'w-10 h-10', text = '' }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="relative flex items-center justify-center">
        {/* Decorative background glow */}
        <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-xl animate-pulse"></div>

        {/* Outer subtle ring */}
        <div
          className={`${className} rounded-full border-[3px] border-slate-100 absolute`}
        ></div>

        {/* The main spinning loader */}
        <Loader
          className={`${className} animate-spin text-indigo-600 relative z-10 stroke-[2.5px]`}
        />
      </div>

      {text && (
        <div className="flex flex-col items-center space-y-1">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 animate-pulse">
            {text}
          </p>
          {/* Small dots animation */}
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-1 h-1 bg-violet-600 rounded-full animate-bounce"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoaderSpinner;
