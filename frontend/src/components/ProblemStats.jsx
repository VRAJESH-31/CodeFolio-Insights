import { PieChart as PieChartIcon } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const ProblemStats = ({problemsData}) => {
    return (
    <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '400ms'}}>
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                <PieChartIcon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-black text-gray-800">Problem Difficulty</h3>
        </div>
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={problemsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                    >
                        {problemsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip 
                        contentStyle={{ 
                            background: 'rgba(255, 255, 255, 0.9)', 
                            backdropFilter: 'blur(10px)',
                            border: '1px solid #e5e7eb',
                            borderRadius: '12px'
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
            {problemsData.map((item, index) => (
                <div key={item.name} className="text-center p-3 rounded-2xl bg-gray-50/80">
                    <div className="text-sm font-semibold text-gray-600">{item.name}</div>
                    <div className="text-xl font-black text-gray-800">{item.value}</div>
                    <div className="text-xs text-gray-500">problems</div>
                </div>
            ))}
        </div>
    </div>
    )
}

export default ProblemStats;