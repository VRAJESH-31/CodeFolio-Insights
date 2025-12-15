import { Medal, Crown, Zap, Target } from "lucide-react";

const BadgeCard = ({ badge }) => {

    return (
        <div className="flex-shrink-0 w-40 p-2 flex flex-col items-center justify-center transform hover:scale-105 transition-all duration-300 group">
            <div className="relative">
                {/* Badge Icon/Image */}
                {badge.icon ? (
                    <div className="relative p-2">
                        <img
                            src={badge.icon}
                            alt={badge.name}
                            className="w-24 h-24 object-contain drop-shadow-sm z-10 relative"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                // e.target.nextSibling.style.display = 'flex'; // No fallback for now or keep simple
                            }}
                        />
                    </div>
                ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center shadow-sm">
                        <Medal className="w-10 h-10 text-gray-400" />
                    </div>
                )}
            </div>

            {/* Badge Content */}
            <h4 className="font-semibold text-gray-800 text-sm text-center mt-2 line-clamp-2">
                {badge.name}
            </h4>
        </div>
    );
};

export default BadgeCard;