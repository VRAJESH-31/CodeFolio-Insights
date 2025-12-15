import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

const TopicAnalysis = ({ data = {}, title = "Topic Analysis" }) => {
    const [showAll, setShowAll] = useState(false);

    // Convert object to array of { topic, count } and sort by count descending
    const sortedTopics = Object.entries(data)
        .map(([topic, count]) => ({ topic, count }))
        .sort((a, b) => b.count - a.count);

    // Get max count for calculating bar percentages
    const maxCount = sortedTopics.length > 0 ? sortedTopics[0].count : 0;

    // Determine items to show
    const displayedTopics = showAll ? sortedTopics : sortedTopics.slice(0, 10);
    const hasMore = sortedTopics.length > 10;

    if (sortedTopics.length === 0) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
                <div className="text-gray-500 text-center py-8">
                    No topic data available
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 font-sans">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                <Info size={18} className="text-gray-400 cursor-help" />
            </div>

            <div className="flex flex-col gap-2">
                {displayedTopics.map((item, index) => (
                    <div key={item.topic} className="flex items-center gap-4 group">
                        {/* Topic Name */}
                        <div className="w-32 text-right text-sm font-medium text-gray-600 truncate" title={item.topic}>
                            {item.topic}
                        </div>

                        {/* Bar Container */}
                        <div className="flex-1 h-5 bg-gray-100 rounded-md overflow-hidden relative">
                            {/* Bar */}
                            <div
                                className="h-full bg-blue-300 rounded-md transition-all duration-500 ease-out flex items-center justify-center px-2 group-hover:bg-blue-400"
                                style={{ width: `${(item.count / maxCount) * 100}%` }}
                            >
                                <span className="text-xs font-bold text-black">
                                    {item.count}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {hasMore && (
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="w-full mt-6 py-2 flex items-center justify-center gap-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                    {showAll ? (
                        <>Show Less <ChevronUp size={16} /></>
                    ) : (
                        <>Show More <ChevronDown size={16} /></>
                    )}
                </button>
            )}
        </div>
    );
};

export default TopicAnalysis;
