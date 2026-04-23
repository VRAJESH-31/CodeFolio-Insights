import React, { useState } from 'react';
import { AnimatedLayout } from '../layouts/export';

const StepTimeline = ({ steps, className = '' }) => {
  const [showAllSteps, setShowAllSteps] = useState(false);

  return (
    <div className={`relative mx-auto ${className}`}>
      {/* Central connecting line for desktop */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-100 via-indigo-600/20 to-indigo-100 -translate-x-1/2 rounded-full"></div>

      <div
        className={`relative transition-[max-height] duration-1000 ease-in-out overflow-hidden ${showAllSteps ? 'max-h-[5000px]' : 'max-h-[400px]'}`}
      >
        <div className="space-y-6 md:space-y-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;
            return (
              <AnimatedLayout
                key={index}
                delay={index * 100}
                className={`relative flex flex-col md:flex-row items-center justify-between px-24 ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-5/12"></div>

                {/* Center Marker */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-white border-4 border-indigo-100 shadow-lg md:z-20 hidden md:flex">
                  <span className="font-black text-indigo-600">
                    0{index + 1}
                  </span>
                </div>

                {/* Content Card */}
                <div className="w-full md:w-5/12 text-center md:text-left relative z-10">
                  <div
                    className={`p-8 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-1 transition-transform duration-300 ${isEven ? 'md:text-right' : 'md:text-left'} group`}
                  >
                    <div
                      className={`w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 mx-auto ${isEven ? 'md:ml-auto md:mr-0' : 'md:ml-0 md:mr-auto'} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 font-medium leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AnimatedLayout>
            );
          })}
        </div>

        {/* Fade out blur overlay */}
        {!showAllSteps && (
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 via-slate-50/90 to-transparent pointer-events-none z-30"></div>
        )}
      </div>

      {/* Toggle Button */}
      <div className="text-center relative z-40 mt-12">
        <button
          onClick={() => setShowAllSteps(!showAllSteps)}
          className="px-8 py-3 bg-white border border-slate-200 text-indigo-600 rounded-full text-xs font-black shadow-lg shadow-slate-200 hover:shadow-xl hover:border-indigo-100 hover:-translate-y-1 transition-all cursor-pointer uppercase tracking-widest inline-flex items-center justify-center"
        >
          {showAllSteps ? 'Hide Extra Steps' : 'View Full Process'}
        </button>
      </div>
    </div>
  );
};

export default StepTimeline;
