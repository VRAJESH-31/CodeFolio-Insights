import { getMemeForScore } from "../utils/helper";
import { Sparkles, Quote, Star, Zap } from "lucide-react";

const MemeContainer = ({ score }) => {
    const review = getMemeForScore(score);
    const roundedScore = Math.round(score);

    return (
        <>
            <style jsx>{`
                @keyframes meme-bounce-in {
                    0% {
                        opacity: 0;
                        transform: scale(0.3);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.05);
                    }
                    70% {
                        transform: scale(0.9);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                @keyframes meme-float {
                    0%, 100% { 
                        transform: translateY(0px) rotate(0deg); 
                    }
                    50% { 
                        transform: translateY(-10px) rotate(180deg); 
                    }
                }
                @keyframes meme-shine {
                    0% {
                        transform: translateX(-100%) skewX(-12deg);
                    }
                    100% {
                        transform: translateX(100%) skewX(-12deg);
                    }
                }
                @keyframes meme-pulse-glow {
                    0%, 100% {
                        opacity: 0.1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.15;
                        transform: scale(1.1);
                    }
                }
                @keyframes meme-score-pop {
                    0% {
                        transform: scale(0.8);
                        opacity: 0;
                    }
                    70% {
                        transform: scale(1.1);
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                .meme-animate-bounce-in {
                    animation: meme-bounce-in 0.6s ease-out;
                }
                .meme-animate-float {
                    animation: meme-float 3s ease-in-out infinite;
                }
                .meme-animate-shine {
                    animation: meme-shine 1.5s ease-in-out;
                }
                .meme-animate-pulse-glow {
                    animation: meme-pulse-glow 4s ease-in-out infinite;
                }
                .meme-animate-score-pop {
                    animation: meme-score-pop 0.5s ease-out;
                }
            `}</style>

            <div className={`meme-animate-bounce-in relative rounded-3xl p-6 border-3 ${review.border} bg-gradient-to-br ${review.bg} shadow-2xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl group overflow-hidden`}>
                
                {/* Animated background elements */}
                <div className="absolute inset-0 opacity-5">
                    <div className="meme-animate-pulse-glow absolute top-10 left-10 w-20 h-20 bg-current rounded-full"></div>
                    <div className="meme-animate-pulse-glow absolute bottom-10 right-10 w-16 h-16 bg-current rounded-full" style={{animationDelay: '1s'}}></div>
                    <div className="meme-animate-pulse-glow absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-current rounded-full" style={{animationDelay: '2s'}}></div>
                </div>

                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-current rounded-full opacity-30 meme-animate-float"
                            style={{
                                left: `${20 + i * 15}%`,
                                top: `${10 + i * 10}%`,
                                animationDelay: `${i * 0.5}s`,
                                animationDuration: `${3 + i * 0.5}s`
                            }}
                        />
                    ))}
                </div>

                {/* Header with score badge */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-current meme-animate-pulse-glow" />
                        <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                            AI Performance Review
                        </span>
                    </div>
                    <div className="meme-animate-score-pop bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/80 shadow-lg transform transition-transform duration-300 hover:scale-110">
                        <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-xs font-bold text-gray-800">
                                {roundedScore}/100
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main content grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
                    {/* Meme Image Section */}
                    <div className="relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-xl transform transition-transform duration-500 group-hover:shadow-2xl">
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                            
                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 z-20" />
                            
                            <img
                                src={review.meme}
                                alt="Performance meme"
                                className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                        
                        {/* Decorative corner elements */}
                        <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-current opacity-40 rounded-tl-lg"></div>
                        <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-current opacity-40 rounded-tr-lg"></div>
                        <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-current opacity-40 rounded-bl-lg"></div>
                        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-current opacity-40 rounded-br-lg"></div>
                    </div>

                    {/* Text Content Section */}
                    <div className="flex flex-col justify-center space-y-4">
                        {/* Quote icon with animation */}
                        <div className="relative">
                            <Quote className="absolute -top-4 -left-2 w-6 h-6 text-current opacity-20 transform -rotate-6 transition-transform duration-300 group-hover:rotate-0" />
                            <p className="text-xl font-black text-gray-800 italic leading-tight pl-4 transform transition-transform duration-300 group-hover:translate-x-1">
                                {review.text}
                            </p>
                        </div>

                        {/* Separator with style */}
                        <div className="relative">
                            <div className="h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-20"></div>
                            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-current rounded-full opacity-40 transition-all duration-300 group-hover:scale-150"></div>
                        </div>

                        {/* Detailed comment */}
                        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-md">
                            <p className="text-sm text-gray-700 font-medium leading-relaxed">
                                {review.comment}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer decorative element */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-current opacity-20 rounded-t-full transition-all duration-300 group-hover:w-32 group-hover:opacity-30"></div>

                {/* Progress bar indicator */}
                <div className="mt-6 relative z-10">
                    <div className="flex justify-between text-xs text-gray-600 mb-2">
                        <span className="transition-all duration-300 group-hover:font-semibold">Progress</span>
                        <span className="meme-animate-score-pop transition-all duration-300 group-hover:font-bold">{roundedScore}%</span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-2 overflow-hidden">
                        <div 
                            className="bg-current h-2 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                            style={{ width: `${roundedScore}%` }}
                        >
                            {/* Progress bar shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-2000"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MemeContainer;