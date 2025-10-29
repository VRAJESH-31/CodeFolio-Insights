import { Brain } from "lucide-react";

const TopicStats = ({topicData}) => {
    return (
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '500ms'}}>
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
                    <Brain className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-800">Topic Mastery</h3>
            </div>
            <div className="space-y-4">
                {topicData.map((topic, index) => (
                    <div key={topic.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-700">{topic.name}</span>
                            <span className="text-sm font-bold text-blue-600">{topic.mastery}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className="h-2 rounded-full transition-all duration-1000"
                                style={{ 
                                    width: `${topic.mastery}%`,
                                    backgroundColor: `${topic.color}`
                                }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TopicStats;