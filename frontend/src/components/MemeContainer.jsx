import { getMemeForScore } from "../utils/meme.js";
import { Quote, Star, Zap } from "lucide-react";

const MemeContainer = ({ score }) => {
    const review = getMemeForScore(score);
    const roundedScore = Math.round(score);

    return (
        <div className={`animate-bounce-in relative rounded-3xl p-6 border-3 ${review.border} bg-gradient-to-br ${review.bg} shadow-2xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl group overflow-hidden`}>
            <div className="absolute inset-0 opacity-5">
                <div className="animate-pulse-glow absolute top-10 left-10 w-20 h-20 bg-current rounded-full"></div>
                <div className="animate-pulse-glow absolute bottom-10 right-10 w-16 h-16 bg-current rounded-full" style={{ animationDelay: '1s' }}></div>
                <div className="animate-pulse-glow absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-current rounded-full" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="absolute inset-0 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-current rounded-full opacity-30 animate-float"
                        style={{
                            left: `${20 + i * 15}%`,
                            top: `${10 + i * 10}%`,
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: `${3 + i * 0.5}s`
                        }}
                    />
                ))}
            </div>

            <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-current animate-pulse-glow" />
                    <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">AI Performance Review</span>
                </div>
                <div className="animate-score-pop bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/80 shadow-lg transform transition-transform duration-300 hover:scale-110">
                    <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs font-bold text-gray-800">{roundedScore}/100</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
                <div className="relative">
                    <div className="relative rounded-2xl overflow-hidden shadow-xl transform transition-transform duration-500 group-hover:shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 z-20" />
                        <img src={review.meme} alt="Performance meme" className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-110" />
                    </div>
                </div>

                <div className="flex flex-col justify-center space-y-4">
                    <div className="relative">
                        <Quote className="absolute -top-4 -left-2 w-6 h-6 text-current opacity-20 transform -rotate-6 transition-transform duration-300 group-hover:rotate-0" />
                        <p className="text-xl font-black text-gray-800 italic leading-tight pl-4 transform transition-transform duration-300 group-hover:translate-x-1">
                            {review.text}
                        </p>
                    </div>

                    <div className="relative">
                        <div className="h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-20"></div>
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-current rounded-full opacity-40 transition-all duration-300 group-hover:scale-150"></div>
                    </div>

                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-md">
                        <p className="text-sm text-gray-700 font-medium leading-relaxed">{review.comment}</p>
                    </div>
                </div>
            </div>

            <div className="mt-6 relative z-10">
                <div className="flex justify-between text-xs text-gray-600 mb-2">
                    <span className="transition-all duration-300 group-hover:font-semibold">Progress</span>
                    <span className="animate-score-pop transition-all duration-300 group-hover:font-bold">{roundedScore}%</span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-2 overflow-hidden">
                    <div
                        className="bg-current h-2 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                        style={{ width: `${roundedScore}%` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-2000"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemeContainer;