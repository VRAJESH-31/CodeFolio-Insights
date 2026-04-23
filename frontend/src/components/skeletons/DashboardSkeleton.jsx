import React from 'react';

const DashboardSkeleton = () => {
  return (
    <div className="flex flex-1 overflow-hidden h-screen bg-white">
      {/* Sidebar Skeleton */}
      <aside className="w-80 h-full bg-white border-r border-slate-100 flex flex-col relative shadow-xl">
        <div className="p-4 flex items-center justify-between">
          <div className="h-4 w-24 bg-slate-100 animate-pulse rounded"></div>
          <div className="h-5 w-10 bg-slate-100 animate-pulse rounded-full"></div>
        </div>

        <div className="px-6 py-10 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-slate-100 animate-pulse mb-6"></div>
          <div className="h-6 w-3/4 bg-slate-100 animate-pulse rounded mb-3"></div>
          <div className="h-4 w-1/2 bg-slate-100 animate-pulse rounded mb-8"></div>

          <div className="flex justify-between w-full px-4 mb-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-6 h-6 bg-slate-100 animate-pulse rounded-full"
              ></div>
            ))}
          </div>

          <div className="w-full h-24 bg-slate-50 animate-pulse rounded-2xl border border-slate-100"></div>
        </div>

        <div className="mt-4 px-4 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-12 w-full bg-slate-50 animate-pulse rounded-2xl"
            ></div>
          ))}
        </div>

        <div className="mt-auto p-8 border-t border-slate-50 space-y-3">
          <div className="h-3 w-full bg-slate-100 animate-pulse rounded"></div>
          <div className="h-3 w-3/4 bg-slate-100 animate-pulse rounded"></div>
        </div>
      </aside>

      {/* Main Content Skeleton */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-slate-50/50">
        <div className="space-y-8 animate-pulse max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Left Column Layout */}
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-36 bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm"
                  >
                    <div className="h-3 w-24 bg-slate-100 rounded-full mb-4" />
                    <div className="h-8 w-16 bg-slate-200 rounded-lg" />
                  </div>
                ))}
              </div>

              <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm h-[320px]">
                <div className="h-4 w-32 bg-slate-200 rounded-full mb-10" />
                <div className="flex justify-around items-center pt-4">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center space-y-4"
                    >
                      <div className="w-24 h-24 bg-slate-100 rounded-2xl rotate-45" />
                      <div className="h-3 w-20 bg-slate-100 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm h-[420px]">
                <div className="h-5 w-48 bg-slate-200 rounded-full mb-8" />
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="h-3 w-20 bg-slate-100 rounded-full" />
                      <div className="flex-1 h-6 bg-slate-100 rounded-full" />
                      <div className="h-3 w-8 bg-slate-100 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column Layout */}
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm min-h-[280px]"
                >
                  <div className="h-5 w-40 bg-slate-200 rounded-full mx-auto mb-8" />
                  <div className="flex items-center justify-center gap-12">
                    <div className="w-32 h-32 border-[12px] border-slate-100 rounded-full" />
                    <div className="space-y-4">
                      {[1, 2, 3].map((j) => (
                        <div
                          key={j}
                          className="h-3 w-32 bg-slate-100 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Activity Calendar Skeleton */}
            <div className="xl:col-span-2 bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm h-[200px]">
              <div className="flex gap-16 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-16 bg-slate-100 rounded-lg" />
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5 ">
                {Array.from({ length: 112 }).map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-slate-50 rounded-[3px]" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardSkeleton;
