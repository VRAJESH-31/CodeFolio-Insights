import { Crown, Sparkles, TrendingUp } from "lucide-react";
import { getMemeForScore } from "../utils/meme.js";

const ScoreMeter = ({ score }) => {
    const { scoreColor, scoreText, borderColor, progressColor } = getMemeForScore(score);

    return (
        <div className={`relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border-2 ${borderColor} transition-all duration-500 group hover:shadow-2xl hover:scale-[1.02]`}>
            <div className="text-center space-y-6">
                <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full opacity-0 group-hover:opacity-30 blur-sm transition-all" />
                        <Crown className="h-8 w-8 text-yellow-500 relative z-10 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-2xl font-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Profile Score</h3>
                    <Sparkles className="h-5 w-5 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="text-lg font-semibold text-gray-600">{scoreText}</div>

                <div className="relative inline-block">
                    <div className="w-52 h-52 relative">
                        <div className="absolute inset-0 rounded-full border-4 border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" strokeWidth="8" />
                            <circle
                                cx="50" cy="50" r="45" fill="none" stroke="url(#scoreGradient)" strokeWidth="8"
                                strokeLinecap="round" strokeDasharray="283" strokeDashoffset={283 - (283 * score) / 100}
                                className="transition-all duration-1000 ease-out"
                            />
                            <defs>
                                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#3b82f6" /><stop offset="50%" stopColor="#6366f1" /><stop offset="100%" stopColor="#8b5cf6" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-5xl font-black bg-gradient-to-r ${scoreColor} bg-clip-text text-transparent`}>
                                {score.toFixed(1)}
                            </span>
                            <div className="flex items-center gap-1 mt-1 text-sm text-gray-500 font-semibold">
                                /100 <TrendingUp className="h-4 w-4 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center gap-4 pt-4">
                    <div className="flex-1 max-w-xs">
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                            <div className={`h-full bg-gradient-to-r ${scoreColor} rounded-full transition-all duration-1000 ease-out`} style={{ width: `${score}%` }} />
                        </div>
                    </div>
                    <div className="text-sm font-semibold text-gray-600 min-w-[60px] group-hover:text-gray-800 transition-colors">{score.toFixed(0)}%</div>
                </div>
            </div>
        </div>
    )
}

export default ScoreMeter;