import { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

const TopicAnalysis = ({ data = {}, title = "Topic Analysis" }) => {
    const [showAll, setShowAll] = useState(false);

    const sortedTopics = Object.entries(data)
        .map(([topic, count]) => ({ topic, count }))
        .sort((a, b) => b.count - a.count);

    const maxCount = sortedTopics.length > 0 ? sortedTopics[0].count : 0;
    const displayedTopics = showAll ? sortedTopics : sortedTopics.slice(0, 10);
    const hasMore = sortedTopics.length > 10;

    if (sortedTopics.length === 0) {
        return (
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
                <div className="text-gray-400 text-center py-8">No topic data available</div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 font-sans">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                <Info size={16} className="text-gray-400" />
            </div>

            <div className="space-y-3">
                {displayedTopics.map((item) => (
                    <div key={item.topic} className="flex items-center gap-4 group">
                        <div className="w-24 sm:w-32 text-right text-xs font-bold text-gray-500 truncate" title={item.topic}>{item.topic}</div>
                        <div className="flex-1 h-5 bg-gray-100 rounded-lg overflow-hidden relative">
                            <div
                                className="h-full bg-blue-400 rounded-lg transition-all duration-700 ease-out flex items-center justify-end px-2 group-hover:bg-blue-500"
                                style={{ width: `${(item.count / maxCount) * 100}%` }}
                            >
                                <span className="text-[10px] font-black text-white">{item.count}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {hasMore && (
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="w-full mt-6 py-2.5 flex items-center justify-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all"
                >
                    {showAll ? <><ChevronUp size={16} /> Show Less</> : <><ChevronDown size={16} /> Show More</>}
                </button>
            )}
        </div>
    );
};

export default TopicAnalysis;
