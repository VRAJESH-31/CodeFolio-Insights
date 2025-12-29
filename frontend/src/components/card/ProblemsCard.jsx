import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-md p-2 border border-gray-100 rounded-xl shadow-xl text-gray-800 text-xs font-bold text-center">
        {payload[0].name}: {payload[0].value}
      </div>
    );
  }
  return null;
};

const ProblemsCard = ({ title = "", problemsData = [] }) => {
  const chartSize = 150;
  const total = problemsData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-100 font-sans text-gray-800 w-full hover:shadow-2xl transition-all group">
      <h3 className="text-lg font-black text-gray-800 mb-6 text-center">{title}</h3>

      <div className="flex items-center gap-6">
        <div className="flex-shrink-0">
          <ResponsiveContainer width={chartSize} height={chartSize}>
            <PieChart>
              <Pie
                data={problemsData} dataKey="value" innerRadius={chartSize * 0.3} outerRadius={chartSize * 0.45}
                paddingAngle={3} startAngle={90} endAngle={-270} stroke="none"
              >
                {problemsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-3xl font-black fill-gray-900">
                {total}
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-grow space-y-2">
          {problemsData.map((item) => (
            <div key={item.name} className="flex justify-between items-center bg-gray-50/50 px-3 py-1.5 rounded-xl border border-gray-100 hover:border-gray-200 transition-all group/item">
              <span className="font-bold text-xs uppercase tracking-wider" style={{ color: item.color }}>{item.name}</span>
              <span className="text-gray-900 font-black text-base tabular-nums group-hover/item:scale-110 transition-transform">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProblemsCard;