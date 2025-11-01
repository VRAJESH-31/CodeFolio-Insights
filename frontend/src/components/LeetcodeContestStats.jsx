import { Trophy, TrendingUp, Users, Target, Award } from "lucide-react";

const LeetCodeContestStats = ({contestData}) => {
    const getRatingColor = (rating) => {
        if (!rating) return 'text-gray-600';
        if (rating >= 2000) return 'text-red-600';
        if (rating >= 1600) return 'text-orange-600';
        if (rating >= 1200) return 'text-purple-600';
        return 'text-blue-600';
    };

    const getRankColor = (rank) => {
        if (!rank) return 'text-gray-600';
        if (rank <= 100) return 'text-yellow-600';
        if (rank <= 1000) return 'text-green-600';
        if (rank <= 5000) return 'text-blue-600';
        return 'text-purple-600';
    };

    return (
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/60 animate-float-in hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Trophy className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h3 className="text-xl font-black text-gray-800">Contest Performance</h3>
                    <p className="text-sm text-gray-600 mt-1">Your competitive coding journey</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-5 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200 hover:border-purple-300 transition-all duration-300 group/item">
                    <div className="flex justify-center mb-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <TrendingUp className="w-4 h-4 text-purple-600" />
                        </div>
                    </div>
                    <div className={`text-2xl font-black mb-1 ${getRatingColor(contestData?.rating)}`}>
                        {contestData?.rating ? Math.round(contestData.rating) : '–'}
                    </div>
                    <div className="text-sm font-semibold text-purple-800">Current Rating</div>
                    <div className="text-xs text-purple-600 mt-1 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                        Competitive Programmer
                    </div>
                </div>
                
                <div className="text-center p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 hover:border-blue-300 transition-all duration-300 group/item">
                    <div className="flex justify-center mb-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Users className="w-4 h-4 text-blue-600" />
                        </div>
                    </div>
                    <div className={`text-2xl font-black mb-1 ${getRankColor(contestData?.globalRanking)}`}>
                        {contestData?.globalRanking ? contestData.globalRanking.toLocaleString() : "–"}
                    </div>
                    <div className="text-sm font-semibold text-blue-800">Global Rank</div>
                    <div className="text-xs text-blue-600 mt-1 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                        Top {contestData?.topPercentage ?? "–"}%
                    </div>
                </div>
                
                <div className="text-center p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:border-green-300 transition-all duration-300 group/item">
                    <div className="flex justify-center mb-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <Target className="w-4 h-4 text-green-600" />
                        </div>
                    </div>
                    <div className="text-2xl font-black text-green-600 mb-1">
                        {contestData?.attendedContestsCount ?? 0}
                    </div>
                    <div className="text-sm font-semibold text-green-800">Contests Attended</div>
                    <div className="text-xs text-green-600 mt-1 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                        Total Participation
                    </div>
                </div>
                
                <div className="text-center p-5 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200 hover:border-orange-300 transition-all duration-300 group/item">
                    <div className="flex justify-center mb-3">
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <Award className="w-4 h-4 text-orange-600" />
                        </div> 
                    </div>
                    <div className="text-2xl font-black text-orange-600 mb-1">
                        {contestData?.topPercentage ?? 0}%
                    </div>
                    <div className="text-sm font-semibold text-orange-800">Top Percentage</div>
                    <div className="text-xs text-orange-600 mt-1 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                        Among All Participants
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeetCodeContestStats;