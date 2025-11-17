import { Trophy, Medal, Crown, Sparkles } from "lucide-react";
import BadgeCard from "./BadgeCard";

const BadgeCollection = ({ badges }) => {
    const scrollStyle = `
        @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-scroll {
            animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
            animation-play-state: paused;
        }
        .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
    `;

    const getTotalBadges = badges.length;
    const getActiveBadges = badges.filter(badge => !badge.expired).length;

    return (
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border-2 border-amber-200/50 hover:border-amber-300/70 transition-all duration-500 animate-float-in group" style={{animationDelay: '100ms'}}>

            <style>{scrollStyle}</style>

            {/* Enhanced Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="p-3 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Crown className="w-6 h-6 text-white" />
                        </div>
                        <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-gray-800">Achievements & Badges</h3>
                        <p className="text-gray-600 font-medium mt-1">
                            {getActiveBadges} active badges of {getTotalBadges} total
                        </p>
                    </div>
                </div>
                
                {/* Stats Badge */}
                <div className="flex items-center gap-2 bg-amber-100 border border-amber-200 text-amber-800 px-4 py-2 rounded-full font-semibold">
                    <Trophy className="w-4 h-4" />
                    <span>{getTotalBadges} Badges</span>
                </div>
            </div>
            
            {badges.length > 0 ? (
                <div className="relative">
                    <div className="overflow-hidden rounded-2xl">
                        <div className="flex gap-6 animate-scroll hover:pause py-2">
                            {/* Double the badges for seamless looping */}
                            {[...badges, ...badges].map((badge, index) => (
                                <BadgeCard key={`${badge.id}-${index}`} badge={badge} index={index} />
                            ))}
                        </div>
                    </div>
                    
                    {/* Enhanced Gradient Overlays */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white via-white/90 to-transparent pointer-events-none rounded-l-2xl"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white via-white/90 to-transparent pointer-events-none rounded-r-2xl"></div>
                    
                    {/* Scroll Indicator */}
                    <div className="flex justify-center mt-6">
                        <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                            <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />  
                            <span>Hover to pause scrolling</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl border-2 border-dashed border-gray-200 group-hover:border-gray-300 transition-all duration-500">
                    <div className="relative inline-block mb-5">
                        <Medal className="w-20 h-20 text-gray-300 mx-auto" />
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/50 rounded-full blur-sm"></div>
                    </div>
                    <h4 className="text-xl font-bold text-gray-500 mb-3">No badges earned yet</h4>
                    <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
                        Start solving problems and participating in contests to unlock amazing achievements and badges!
                    </p>
                    <div className="mt-6 flex justify-center gap-3">
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BadgeCollection;