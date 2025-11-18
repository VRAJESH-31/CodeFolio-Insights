import { Crown, Sparkles, TrendingUp } from "lucide-react";

const ScoreMeter = ({score}) => {
    const getScoreColor = (score) => {
        if (score >= 80) return "from-emerald-500 to-green-400";
        if (score >= 60) return "from-blue-500 to-cyan-400";
        if (score >= 40) return "from-amber-500 to-yellow-400";
        return "from-rose-500 to-pink-400";
    };

    const getScoreText = (score) => {
        if (score >= 80) return "Excellent!";
        if (score >= 60) return "Great Job!";
        if (score >= 40) return "Good Progress!";
        return "Keep Going!";
    };

    const getBorderColor = (score) => {
        if (score >= 80) return "border-emerald-200 hover:border-emerald-300";
        if (score >= 60) return "border-blue-200 hover:border-blue-300";
        if (score >= 40) return "border-amber-200 hover:border-amber-300";
        return "border-rose-200 hover:border-rose-300";
    };

    return (
        <div className={`relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border-2 ${getBorderColor(score)} transition-all duration-500 group hover:shadow-2xl hover:scale-[1.02]`}>
            <div className="text-center space-y-6">
                {/* Header with Enhanced Icon */}
                <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full opacity-0 group-hover:opacity-30 blur-sm transition-all duration-300" />
                        <Crown className="h-8 w-8 text-yellow-500 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-2xl font-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                        Profile Score
                    </h3>
                    <Sparkles className="h-5 w-5 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Score Text */}
                <div className="mb-2">
                    <div className="text-lg font-semibold bg-gradient-to-r from-gray-600 to-gray-500 bg-clip-text text-transparent">
                        {getScoreText(score)}
                    </div>
                </div>
                
                {/* Main Score Circle */}
                <div className="relative inline-block">
                    <div className="w-52 h-52 relative">
                        {/* Outer decorative ring */}
                        <div className="absolute inset-0 rounded-full border-4 border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            {/* Background Circle */}
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="#f3f4f6"
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
                                className="transition-all duration-1000 ease-out"
                            />
                            <defs>
                                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#3b82f6" />
                                    <stop offset="50%" stopColor="#6366f1" />
                                    <stop offset="100%" stopColor="#8b5cf6" />
                                </linearGradient>
                            </defs>
                        </svg>
                        
                        {/* Center Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="text-center">
                                <span className={`text-5xl font-black bg-gradient-to-r ${getScoreColor(score)} bg-clip-text text-transparent transition-all duration-500`}>
                                    {score.toFixed(1)}
                                </span>
                                <div className="flex items-center justify-center gap-1 mt-1">
                                    <span className="text-sm text-gray-500 font-semibold">/100</span>
                                    <TrendingUp className="h-4 w-4 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Score Indicator Bar */}
                <div className="flex justify-center items-center gap-4 pt-4">
                    <div className="flex-1 max-w-xs">
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                            <div 
                                className={`h-full bg-gradient-to-r ${getScoreColor(score)} rounded-full transition-all duration-1000 ease-out`}
                                style={{ width: `${score}%` }}
                            />
                        </div>
                    </div>
                    <div className="text-sm font-semibold text-gray-600 min-w-[60px] transition-colors duration-300 group-hover:text-gray-800">
                        {score}%
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScoreMeter;