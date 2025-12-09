import React, { useMemo, useState, useCallback } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

/**
 * Custom Tooltip Component for Recharts.
 * This component's SOLE responsibility is to render the small pop-up *inside* the chart.
 * State updates for the main component are now handled by the AreaChart's onMouseMove.
 */
const CustomTooltip = ({ active, payload }) => {
    // Check if the tooltip is active and if there's data to display
    if (active && payload && payload.length) {
        // Recharts provides the data object for the hovered point via payload[0].payload
        const contest = payload[0].payload;

        // Tooltip rendered inside the chart
        return (
            <div className="p-3 bg-white border border-gray-300 rounded-lg shadow-xl text-gray-800 text-sm">
                <p className="font-semibold text-amber-600">{contest.title}</p>
                <p className="text-gray-500">Date: {contest.date}</p>
                <p>Rating: <span className="font-bold">{contest.rating.toFixed(0)}</span></p>
                <p>Rank: {contest.ranking}</p>
            </div>
        );
    }

    return null;
};

/**
 * Component to display a contest rating graph with dynamic details on hover, using Recharts.
 * @param {object} props - Component props.
 * @param {Array<object>} props.contestData - Array of contest objects
 */
const ContestGraph = ({ contestData }) => {

    // 1. Data Processing and Setup
    const { sortedData, latestContest } = useMemo(() => {
        if (!contestData || contestData.length === 0) {
            return { sortedData: [], latestContest: null };
        }

        const data = [...contestData].sort((a, b) => new Date(a.date) - new Date(b.date));

        const cleanedData = data.map(item => ({
            ...item,
            rating: parseFloat(item.rating) || 0,
            ranking: parseInt(item.ranking, 10) || 'N/A'
        }));

        return {
            sortedData: cleanedData,
            latestContest: cleanedData[cleanedData.length - 1],
        };
    }, [contestData]);

    // 2. State for Hovered/Displayed Contest
    const [hoveredContest, setHoveredContest] = useState(latestContest);

    // Update state if latestContest changes (initial mount/prop update)
    React.useEffect(() => {
        if (latestContest && (!hoveredContest || !sortedData.includes(hoveredContest))) {
            setHoveredContest(latestContest);
        }
    }, [latestContest, sortedData, hoveredContest]);

    // Handle state update when hovering over the chart
    const handleMouseMove = useCallback((state) => {
        // Check if Recharts has identified a data point under the cursor
        if (state.isTooltipActive && state.activePayload && state.activePayload.length) {
            const contest = state.activePayload[0].payload;
            if (contest && contest !== hoveredContest) {
                setHoveredContest(contest);
            }
        }
    }, [hoveredContest]);


    // Reset to latest contest on mouse leave of the graph container
    const handleMouseLeave = useCallback(() => {
        setHoveredContest(latestContest);
    }, [latestContest]);

    // 3. Render setup
    const currentContest = hoveredContest || latestContest;
    const canRenderGraph = sortedData.length >= 2;

    // Colors
    const secondaryColor = 'text-gray-500';
    const primaryColor = 'text-gray-800';
    const accentColor = 'text-amber-600';
    const graphLineColor = '#D97706';

    // Configure Y-Axis domain for Recharts
    const ratingValues = sortedData.map(c => c.rating).filter(r => r > 0);
    const minRating = ratingValues.length > 0 ? Math.min(...ratingValues) : 0;
    const maxRating = ratingValues.length > 0 ? Math.max(...ratingValues) : 2000;

    const domainMin = Math.floor((minRating - 100) / 100) * 100;
    const domainMax = Math.ceil((maxRating + 100) / 100) * 100;
    const yDomain = [domainMin, domainMax];

    return (
        <div className="p-8 bg-white rounded-2xl shadow-xl flex flex-col max-w-4xl mx-auto my-10 border border-gray-200">

            {/* Displayed Contest Details Row (Current/Hovered) */}
            <div className="flex justify-between items-start mb-6 border-b pb-4 border-gray-100">
                {/* Current Rating */}
                <div>
                    <h3 className={`${secondaryColor} text-base uppercase font-medium`}>Current Rating</h3>
                    <p className={`text-5xl font-extrabold ${accentColor}`}>
                        {currentContest?.rating?.toFixed(0) || 'N/A'}
                    </p>
                </div>

                {/* Contest Summary */}
                <div className="text-right">
                    <h3 className={`${secondaryColor} text-sm uppercase font-medium`}>
                        {currentContest?.date || 'N/A'}
                    </h3>
                    <p className={`text-xl font-semibold ${primaryColor}`}>
                        {currentContest?.title || 'No Contest Data'}
                    </p>
                    <p className={`${secondaryColor} text-base`}>
                        Rank: {currentContest?.ranking || 'N/A'}
                    </p>
                </div>
            </div>

            {/* Contest Graph Area */}
            {/* onMouseLeave is on the main container to reset the state when leaving the graph area */}
            <div className="relative h-96 pt-4" onMouseLeave={handleMouseLeave}>
                {canRenderGraph ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={sortedData}
                            margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
                            // **FIX:** Use the fixed handleMouseMove to update the persistent header data
                            onMouseMove={handleMouseMove}
                        >
                            <defs>
                                <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.6} />
                                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0.2} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />

                            <XAxis dataKey="date" hide={true} />

                            <YAxis
                                domain={yDomain}
                                tickCount={5}
                                axisLine={false}
                                tickLine={false}
                                style={{ fontSize: '12px', fill: '#6b7280' }}
                            />

                            {/* Tooltip: No props needed besides content, Recharts handles active state */}
                            <Tooltip
                                cursor={{ stroke: graphLineColor, strokeWidth: 1, strokeDasharray: '3 3' }}
                                content={<CustomTooltip />}
                            />

                            <Area type="monotone" dataKey="rating" stroke="none" fill="url(#colorRating)" />

                            <Line
                                type="monotone"
                                dataKey="rating"
                                stroke={graphLineColor}
                                strokeWidth={3}
                                dot={{ r: 4, fill: graphLineColor, strokeWidth: 2, stroke: '#ffffff' }}
                                activeDot={{ r: 6, fill: '#ffffff', stroke: graphLineColor, strokeWidth: 3 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                ) : (
                    <div className={`flex items-center justify-center h-full ${secondaryColor} text-lg`}>
                        <p>Please provide at least two contest entries to render the graph.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContestGraph;