import { Trophy } from "lucide-react";

const LeetCodeContestStats = ({contestData}) => {
    return (
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl">
                    <Trophy className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-800">Contest Performance</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-200">
                    <div className="text-3xl font-black text-purple-600 mb-2">
                        {Math.round(contestData.rating)}
                    </div>
                    <div className="text-sm font-semibold text-purple-800">Current Rating</div>
                    <div className="text-xs text-purple-600 mt-1">Competitive Programmer</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
                    <div className="text-3xl font-black text-blue-600 mb-2">
                        {contestData.globalRanking?.toLocaleString()}
                    </div>
                    <div className="text-sm font-semibold text-blue-800">Global Rank</div>
                    <div className="text-xs text-blue-600 mt-1">Top {contestData.topPercentage}%</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                    <div className="text-3xl font-black text-green-600 mb-2">
                        {contestData.attendedContestsCount}
                    </div>
                    <div className="text-sm font-semibold text-green-800">Contests Attended</div>
                    <div className="text-xs text-green-600 mt-1">Total Participation</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-200">
                    <div className="text-3xl font-black text-orange-600 mb-2">
                        {contestData.topPercentage}%
                    </div>
                    <div className="text-sm font-semibold text-orange-800">Top Percentage</div>
                    <div className="text-xs text-orange-600 mt-1">Among All Participants</div>
                </div>
            </div>
        </div>
    )
}

export default LeetCodeContestStats;