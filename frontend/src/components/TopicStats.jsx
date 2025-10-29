import { Brain, TrendingUp, Target } from "lucide-react";

const TopicStats = ({topicData}) => {
    const getMasteryLevel = (mastery) => {
        if (mastery >= 70) return { color: 'text-green-600', bg: 'bg-green-100', label: 'Strong' };
        if (mastery >= 40) return { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Moderate' };
        return { color: 'text-red-600', bg: 'bg-red-100', label: 'Needs Work' };
    };

    const strongCount = topicData.filter(t => t.mastery >= 70).length;
    const moderateCount = topicData.filter(t => t.mastery >= 40 && t.mastery < 70).length;
    const weakCount = topicData.filter(t => t.mastery < 40).length;

    return (
        <div className="bg-white/90 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-200/80 animate-float-in hover:shadow-2xl transition-all duration-300 group" style={{animationDelay: '500ms'}}>
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h3 className="text-xl font-black text-gray-800">Topic Mastery</h3>
                    <p className="text-sm text-gray-600 mt-1">Your proficiency across topics</p>
                </div>
            </div>
            
            {/* Topics List */}
            <div className="space-y-3">
                {topicData.map((topic) => {
                    const masteryLevel = getMasteryLevel(topic.mastery);
                    return (
                        <div 
                            key={topic.name} 
                            className="space-y-0.5 p-0.1 rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-200 hover:bg-gray-50/50"
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 min-w-0 flex-1">
                                    <div 
                                        className="w-2 h-2 rounded-full flex-shrink-0"
                                        style={{ backgroundColor: topic.color }}
                                    ></div>
                                    <span className="font-semibold text-gray-700 text-sm truncate">
                                        {topic.name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${masteryLevel.bg} ${masteryLevel.color}`}>
                                        {topic.mastery}%
                                    </span>
                                    {topic.mastery >= 70 && (
                                        <TrendingUp className="w-3 h-3 text-green-500" />
                                    )}
                                    {topic.mastery < 40 && (
                                        <Target className="w-3 h-3 text-orange-500" />
                                    )}
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                                <div 
                                    className="h-1.5 rounded-full transition-all duration-700 ease-out"
                                    style={{ 
                                        width: `${topic.mastery}%`,
                                        backgroundColor: topic.color
                                    }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {/* Summary Stats */}
            <div className="mt-4 pt-4 border-t border-gray-200/60">
                <div className="grid grid-cols-3 gap-3 text-center">
                    <div className={`p-2 rounded-lg ${strongCount > 0 ? 'bg-green-50 border border-green-200' : 'bg-gray-100'}`}>
                        <div className="text-base font-black text-green-600">{strongCount}</div>
                        <div className="text-xs text-gray-600">Strong</div>
                    </div>
                    <div className={`p-2 rounded-lg ${moderateCount > 0 ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-100'}`}>
                        <div className="text-base font-black text-yellow-600">{moderateCount}</div>
                        <div className="text-xs text-gray-600">Moderate</div>
                    </div>
                    <div className={`p-2 rounded-lg ${weakCount > 0 ? 'bg-red-50 border border-red-200' : 'bg-gray-100'}`}>
                        <div className="text-base font-black text-red-600">{weakCount}</div>
                        <div className="text-xs text-gray-600">Needs Work</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopicStats;