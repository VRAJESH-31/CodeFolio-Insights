import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const LanguageChart = ({ githubData }) => {
    const languages = githubData?.languageUsageInBytes || {};
    const sortedLanguages = Object.entries(languages)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);

    const data = sortedLanguages.map(([lang, bytes], index) => ({
        name: lang,
        value: bytes,
        fill: ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'][index]
    }));

    if (data.length === 0) {
        data.push({ name: 'No Data', value: 1, fill: '#e5e7eb' });
    }

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100/30 shadow-lg hover:shadow-xl transition-all duration-500 p-5 lg:p-6 animate-float-in" style={{ animationDelay: '200ms' }}>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-black text-gray-800 mb-2">Languages</h2>
                    <p className="text-sm text-gray-500">Top languages by usage</p>
                </div>
            </div>
            <div className="h-60 lg:h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '0.5rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                            wrapperStyle={{ paddingTop: '20px' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LanguageChart;
