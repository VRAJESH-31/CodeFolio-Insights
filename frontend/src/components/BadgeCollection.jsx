import { Trophy, Medal } from "lucide-react";
import BadgeCard from "./BadgeCard";

const BadgeCollection = ({ badges}) => {
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

    return (
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/60 animate-float-in" style={{animationDelay: '100ms'}}>

            <style>{scrollStyle}</style>

            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl">
                    <Medal className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-800">Achievements & Badges</h3>
            </div>
            
            {badges.length > 0 ? (
                <div className="relative">
                    <div className="overflow-hidden">
                        <div className="flex gap-6 animate-scroll hover:pause">
                            {/* Double the badges for seamless looping */}
                            {[...badges, ...badges].map((badge, index) => (
                                <BadgeCard key={`${badge.id}-${index}`} badge={badge} index={index} />
                            ))}
                        </div>
                    </div>
                    
                    {/* Gradient overlays for smooth edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white/90 to-transparent pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white/90 to-transparent pointer-events-none"></div>
                </div>
            ) : (
                <div className="text-center py-12">
                    <Medal className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-500">No badges earned yet</h4>
                    <p className="text-gray-400 mt-2">Keep solving problems to earn achievements!</p>
                </div>
            )}
        </div>
    );
};

export default BadgeCollection;