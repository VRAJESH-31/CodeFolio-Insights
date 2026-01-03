import { ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const BarChartDistribution = ({ title, data }) => {
    return (
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-gray-100 animate-float-in" style={{ animationDelay: '500ms' }}>
            <h3 className="text-xl font-black text-gray-800 mb-8 uppercase tracking-widest flex items-center gap-3">
                {title}
            </h3>
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 'bold' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 'bold' }} />
                        <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)', border: 'none', borderRadius: '1rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                        <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                            {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BarChartDistribution;