import { Brain, TrendingUp, Target } from "lucide-react";

const TopicStats = ({ topicData }) => {
    const getMasteryLevel = (mastery) => {
        if (mastery >= 70) return { color: 'text-green-600', bg: 'bg-green-100', label: 'Strong' };
        if (mastery >= 40) return { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Moderate' };
        return { color: 'text-red-600', bg: 'bg-red-100', label: 'Needs Work' };
    };

    const strongCount = topicData.filter(t => t.mastery >= 70).length;
    const moderateCount = topicData.filter(t => t.mastery >= 40 && t.mastery < 70).length;
    const weakCount = topicData.filter(t => t.mastery < 40).length;

    return (
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-200/80 hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                    <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h3 className="text-xl font-black text-gray-800">Topic Mastery</h3>
                    <p className="text-sm text-gray-600">Your proficiency across topics</p>
                </div>
            </div>

            <div className="space-y-4">
                {topicData.map((topic) => {
                    const masteryLevel = getMasteryLevel(topic.mastery);
                    return (
                        <div key={topic.name} className="space-y-1.5 p-0.5">
                            <div className="flex justify-between items-center text-sm font-semibold text-gray-700">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: topic.color }}></div>
                                    <span>{topic.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${masteryLevel.bg} ${masteryLevel.color}`}>
                                        {topic.mastery}%
                                    </span>
                                    {topic.mastery >= 70 ? <TrendingUp className="w-3 h-3 text-green-500" /> : topic.mastery < 40 ? <Target className="w-3 h-3 text-red-500" /> : null}
                                </div>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${topic.mastery}%`, backgroundColor: topic.color }}></div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-3 gap-3">
                <div className={`p-2 rounded-lg text-center ${strongCount > 0 ? 'bg-green-50' : 'bg-gray-50'}`}>
                    <div className="text-lg font-black text-green-600">{strongCount}</div>
                    <div className="text-[10px] uppercase font-bold text-gray-500">Strong</div>
                </div>
                <div className={`p-2 rounded-lg text-center ${moderateCount > 0 ? 'bg-yellow-50' : 'bg-gray-50'}`}>
                    <div className="text-lg font-black text-yellow-600">{moderateCount}</div>
                    <div className="text-[10px] uppercase font-bold text-gray-500">Moderate</div>
                </div>
                <div className={`p-2 rounded-lg text-center ${weakCount > 0 ? 'bg-red-50' : 'bg-gray-50'}`}>
                    <div className="text-lg font-black text-red-600">{weakCount}</div>
                    <div className="text-[10px] uppercase font-bold text-gray-500">Poor</div>
                </div>
            </div>
        </div>
    )
}

export default TopicStats;