import React from 'react';

const ApiProjectSkeleton = () => {
  return (
    <div className="flex-grow space-y-8 pb-20 animate-pulse">
      {/* Header Section Skeleton */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-2xl" />
            <div className="h-8 w-48 bg-slate-100 rounded-xl" />
          </div>
        </div>

        <div className="h-14 w-48 bg-slate-100 rounded-2xl" />
      </div>

      {/* Content Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-5">
            {/* Card Header Skeleton */}
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="h-6 w-32 bg-slate-100 rounded-lg" />
                <div className="h-3 w-20 bg-slate-50 rounded-full" />
              </div>
              <div className="w-8 h-8 bg-slate-50 rounded-xl" />
            </div>

            {/* API Key Section Skeleton */}
            <div className="space-y-2">
              <div className="h-3 w-16 bg-slate-50 rounded-full ml-1" />
              <div className="h-12 w-full bg-slate-50 border border-slate-100 rounded-xl" />
            </div>

            {/* Footer Actions Skeleton */}
            <div className="pt-2 flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="h-10 bg-slate-50 rounded-xl border border-slate-100" />
                <div className="h-10 bg-slate-50 rounded-xl border border-slate-100" />
              </div>

              <div className="flex justify-between items-center px-1">
                <div className="h-3 w-24 bg-slate-50 rounded-full" />
                <div className="h-3 w-20 bg-slate-50 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiProjectSkeleton;
