import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DifficultyChart = ({ leetcodeData }) => {
    const acSubmissionNum = leetcodeData?.problemsCount?.acSubmissionNum;
    const easyCount = acSubmissionNum?.find(i => i.difficulty === 'Easy')?.count || acSubmissionNum?.[1]?.count || 0;
    const mediumCount = acSubmissionNum?.find(i => i.difficulty === 'Medium')?.count || acSubmissionNum?.[2]?.count || 0;
    const hardCount = acSubmissionNum?.find(i => i.difficulty === 'Hard')?.count || acSubmissionNum?.[3]?.count || 0;

    const data = [
        { name: 'Easy', value: easyCount, fill: '#3b82f6' },
        { name: 'Medium', value: mediumCount, fill: '#8b5cf6' },
        { name: 'Hard', value: hardCount, fill: '#ec4899' }
    ];

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100/30 shadow-lg hover:shadow-xl transition-all duration-500 p-5 lg:p-6 animate-float-in" style={{ animationDelay: '300ms' }}>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-black text-gray-800 mb-2">Problem Difficulty</h2>
                    <p className="text-sm text-gray-500">Solved by difficulty level</p>
                </div>
            </div>
            <div className="h-40 lg:h-44">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                        <XAxis
                            dataKey="name"
                            tick={{ fill: '#6b7280', fontSize: 13 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '0.5rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                            cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                        />
                        <Bar dataKey="value" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DifficultyChart;
