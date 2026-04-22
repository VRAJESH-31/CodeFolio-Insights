import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';

const DistributionCard = ({
  data,
  title = 'Problem Difficulty',
  className = '',
  includeLabels = true,
}) => {
  const total = data?.reduce((acc, item) => acc + item.value, 0) || 0;

  if (!total)
    return (
      <div
        className={`bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-gray-100 animate-float-in ${className}`}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
            <PieChartIcon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-black text-gray-800 uppercase tracking-widest">
            {title}
          </h3>
        </div>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500 text-lg font-black uppercase tracking-widest">
            No Data Available
          </p>
        </div>
      </div>
    );

  return (
    <div
      className={`bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-gray-100 animate-float-in ${className}`}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
          <PieChartIcon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-black text-gray-800 uppercase tracking-widest">
          {title}
        </h3>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-8 px-4">
        <div className="h-64 w-full lg:w-1/2 min-w-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(8px)',
                  border: 'none',
                  borderRadius: '1rem',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {includeLabels && (
          <div className="w-full lg:w-1/2 max-h-64 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            <div className="grid grid-cols-1 gap-2 pb-2">
              {data.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-3 px-5 rounded-2xl bg-gray-50/50 border border-gray-100 group transition-all hover:bg-white hover:shadow-md"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="text-[12px] font-black text-gray-500 uppercase tracking-widest truncate">
                      {item.name}
                    </div>
                  </div>
                  <div
                    className="text-lg font-black text-gray-800 tabular-nums group-hover:scale-110 transition-transform ml-4"
                    style={{ color: item.color }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DistributionCard;
