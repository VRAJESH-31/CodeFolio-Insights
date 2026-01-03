import { useMemo, useState, useCallback, useEffect } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const contest = payload[0].payload;
        return (
            <div className="p-3 bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl shadow-xl text-gray-800 text-sm">
                <p className="font-bold text-amber-600 mb-1">{contest.title}</p>
                <div className="space-y-0.5 text-xs text-gray-500">
                    <p>Date: <span className="text-gray-700 font-semibold">{contest.date}</span></p>
                    <p>Rating: <span className="text-gray-700 font-black">{contest.rating.toFixed(0)}</span></p>
                    <p>Rank: <span className="text-gray-700 font-semibold">{contest.ranking}</span></p>
                </div>
            </div>
        );
    }
    return null;
};

const ContestGraph = ({ contestData }) => {
    const { sortedData, latestContest } = useMemo(() => {
        if (!contestData || contestData.length === 0) return { sortedData: [], latestContest: null };
        const data = [...contestData].sort((a, b) => new Date(a.date) - new Date(b.date));
        const cleanedData = data.map(item => ({
            ...item,
            rating: parseFloat(item.rating) || 0,
            ranking: parseInt(item.ranking, 10) || 'N/A'
        }));
        return { sortedData: cleanedData, latestContest: cleanedData[cleanedData.length - 1] };
    }, [contestData]);

    const [hoveredContest, setHoveredContest] = useState(latestContest);

    useEffect(() => {
        if (latestContest && (!hoveredContest || !sortedData.includes(hoveredContest))) {
            setHoveredContest(latestContest);
        }
    }, [latestContest, sortedData, hoveredContest]);

    const handleMouseMove = useCallback((state) => {
        if (state.isTooltipActive && state.activePayload && state.activePayload.length) {
            const contest = state.activePayload[0].payload;
            if (contest && contest !== hoveredContest) setHoveredContest(contest);
        }
    }, [hoveredContest]);

    const handleMouseLeave = useCallback(() => setHoveredContest(latestContest), [latestContest]);

    const currentContest = hoveredContest || latestContest;
    const canRenderGraph = sortedData.length >= 2;
    const graphLineColor = '#D97706';

    const ratingValues = sortedData.map(c => c.rating).filter(r => r > 0);
    const minRating = ratingValues.length > 0 ? Math.min(...ratingValues) : 0;
    const maxRating = ratingValues.length > 0 ? Math.max(...ratingValues) : 2000;

    const domainMin = Math.floor((minRating - 100) / 100) * 100;
    const domainMax = Math.ceil((maxRating + 100) / 100) * 100;

    return (
        <div className="p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl flex flex-col max-w-4xl mx-auto border border-gray-100 hover:shadow-2xl transition-all group">
            <div className="flex justify-between items-start mb-8 border-b pb-6 border-gray-50">
                <div>
                    <h3 className="text-xs uppercase font-black text-gray-400 tracking-widest mb-1">Rating</h3>
                    <p className="text-5xl font-black text-amber-600">{currentContest?.rating?.toFixed(0) || 'N/A'}</p>
                </div>
                <div className="text-right">
                    <h3 className="text-xs uppercase font-black text-gray-400 tracking-widest mb-1">{currentContest?.date || 'N/A'}</h3>
                    <p className="text-xl font-black text-gray-800 truncate max-w-[300px]">{currentContest?.title || 'No Data'}</p>
                    <p className="text-sm font-bold text-gray-500">Rank: {currentContest?.ranking || 'N/A'}</p>
                </div>
            </div>

            <div className="relative h-64 pt-4" onMouseLeave={handleMouseLeave}>
                {canRenderGraph ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={sortedData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }} onMouseMove={handleMouseMove}>
                            <defs>
                                <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} /><stop offset="95%" stopColor="#F59E0B" stopOpacity={0.05} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis dataKey="date" hide={true} />
                            <YAxis domain={[domainMin, domainMax]} tickCount={5} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 'bold' }} />
                            <Tooltip cursor={{ stroke: graphLineColor, strokeWidth: 1, strokeDasharray: '4 4' }} content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="rating" stroke="none" fill="url(#colorRating)" animationDuration={1000} />
                            <Line type="monotone" dataKey="rating" stroke={graphLineColor} strokeWidth={3} dot={{ r: 4, fill: graphLineColor, strokeWidth: 2, stroke: '#ffffff' }} activeDot={{ r: 6, fill: '#ffffff', stroke: graphLineColor, strokeWidth: 3 }} animationDuration={1000} />
                        </AreaChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 font-bold">Please provide at least two entries.</div>
                )}
            </div>
        </div>
    );
};

export default ContestGraph;