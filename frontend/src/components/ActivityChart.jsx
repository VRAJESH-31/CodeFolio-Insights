import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ActivityChart = ({ githubData, leetcodeData }) => {
    const [activePeriod, setActivePeriod] = useState('Weekly');

    const chartData = useMemo(() => {
        if (!githubData?.contributionCalendar?.weeks) {
            return [];
        }

        const weeks = githubData.contributionCalendar.weeks;
        let data = [];

        // Helper to get LeetCode count for a specific date range (start inclusive, end exclusive)
        const getLeetCodeCount = (startTime, endTime) => {
            if (!leetcodeData?.submissionCalendar) return 0;
            let calendar = leetcodeData.submissionCalendar;
            if (typeof calendar === 'string') {
                try { calendar = JSON.parse(calendar); } catch { return 0; }
            }
            let count = 0;
            Object.entries(calendar).forEach(([ts, val]) => {
                const timestamp = parseInt(ts);
                if (timestamp >= startTime && timestamp < endTime) {
                    count += val;
                }
            });
            return count;
        };

        if (activePeriod === 'Daily') {
            // Last 30 Days
            const allDays = weeks.flatMap(week => week.contributionDays);
            const last30Days = allDays.slice(-30);

            data = last30Days.map(day => {
                const date = new Date(day.date);
                const start = date.getTime() / 1000;
                const end = start + 24 * 60 * 60;
                return {
                    name: `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`,
                    github: day.contributionCount,
                    leetcode: getLeetCodeCount(start, end)
                };
            });

        } else if (activePeriod === 'Weekly') {
            // Last 12 Weeks
            const last12Weeks = weeks.slice(-12);

            data = last12Weeks.map(week => {
                const date = new Date(week.firstDay);
                const start = date.getTime() / 1000;
                const end = start + 7 * 24 * 60 * 60;
                return {
                    name: `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`,
                    github: week.contributionDays.reduce((acc, day) => acc + day.contributionCount, 0),
                    leetcode: getLeetCodeCount(start, end)
                };
            });

        } else if (activePeriod === 'Monthly') {
            // Group by Month (Last 6 Months)
            const allDays = weeks.flatMap(week => week.contributionDays);
            const monthlyData = [];
            let currentMonth = null;
            let currentData = null;

            allDays.forEach(day => {
                const date = new Date(day.date);
                const monthKey = `${date.toLocaleString('default', { month: 'short' })}`;

                if (monthKey !== currentMonth) {
                    if (currentData) monthlyData.push(currentData);
                    currentMonth = monthKey;
                    currentData = {
                        month: monthKey,
                        github: 0,
                        start: new Date(day.date).getTime() / 1000,
                        end: 0
                    };
                }
                if (currentData) {
                    currentData.github += day.contributionCount;
                    currentData.end = (new Date(day.date).getTime() / 1000) + 24 * 60 * 60;
                }
            });
            if (currentData) monthlyData.push(currentData);

            const last6Months = monthlyData.slice(-6);

            data = last6Months.map(d => ({
                name: d.month,
                github: d.github,
                leetcode: getLeetCodeCount(d.start, d.end)
            }));
        }

        return data;
    }, [githubData, leetcodeData, activePeriod]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-blue-100/50">
                    <p className="text-sm font-bold text-gray-700 mb-2">{label}</p>
                    {payload.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2 mb-1 last:mb-0">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
                            <span className="text-xs font-medium text-gray-600">
                                {entry.name === 'github' ? 'GitHub Commits' : 'LeetCode Problems'}:
                            </span>
                            <span className="text-xs font-bold text-gray-800">{entry.value}</span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="xl:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100/30 shadow-lg hover:shadow-xl transition-all duration-500 p-5 lg:p-6 animate-float-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                    <h2 className="text-xl lg:text-2xl font-black text-gray-800 mb-2">Coding Activity</h2>
                    <p className="text-sm text-gray-500">Your coding progress over time</p>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 rounded-2xl p-1 border border-blue-100/30 mt-3 sm:mt-0">
                    {['Monthly', 'Weekly', 'Daily'].map((period) => (
                        <button
                            key={period}
                            onClick={() => setActivePeriod(period)}
                            className={`py-2 px-3 lg:px-4 text-xs lg:text-sm font-semibold rounded-xl transition-all duration-300 ${activePeriod === period
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
                                }`}
                        >
                            {period}
                        </button>
                    ))}
                </div>
            </div>
            <div className="h-72 lg:h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorGithub" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorLeetcode" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="github"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorGithub)"
                            animationDuration={1500}
                        />
                        <Area
                            type="monotone"
                            dataKey="leetcode"
                            stroke="#8b5cf6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorLeetcode)"
                            animationDuration={1500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ActivityChart;
