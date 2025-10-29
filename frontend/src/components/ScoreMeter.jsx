import { Crown } from "lucide-react";

const ScoreMeter = ({score}) => {
    return (
        <div className="xl:col-span-1 bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in">
            <div className="text-center space-y-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <Crown className="h-8 w-8 text-yellow-500" />
                    <h3 className="text-2xl font-black text-gray-800">Profile Score</h3>
                </div>
                
                <div className="relative inline-block">
                    <div className="w-48 h-48 relative">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            {/* Background Circle */}
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="#e5e7eb"
                                strokeWidth="8"
                            />
                            {/* Progress Circle */}
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="url(#scoreGradient)"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray="283"
                                strokeDashoffset={283 - (283 * score) / 100}
                                className="animate-score-progress"
                            />
                            <defs>
                                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#8b5cf6" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {(score).toFixed(1)}
                            </span>
                            <span className="text-lg text-gray-500 font-semibold">/100</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScoreMeter;