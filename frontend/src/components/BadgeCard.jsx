import { Calendar, Shield, Medal, Crown, Zap, Target } from "lucide-react";

const BadgeCard = ({ badge }) => {

    const getBadgeColor = (badgeName) => {
        if (badgeName.includes('365')) return 'from-purple-500 to-pink-600';
        if (badgeName.includes('200')) return 'from-red-500 to-orange-600';
        if (badgeName.includes('100')) return 'from-blue-500 to-cyan-600';
        if (badgeName.includes('50')) return 'from-green-500 to-emerald-600';
        if (badgeName.includes('25')) return 'from-yellow-500 to-amber-600';
        return 'from-gray-500 to-gray-600';
    };

    const getBadgeIcon = (badgeName) => {
        if (badgeName.includes('365')) return <Crown className="w-5 h-5 text-white" />;
        if (badgeName.includes('200')) return <Zap className="w-5 h-5 text-white" />;
        if (badgeName.includes('100')) return <Target className="w-5 h-5 text-white" />;
        return <Medal className="w-5 h-5 text-white" />;
    };

    const getBadgeGradient = (badgeName) => {
        if (badgeName.includes('365')) return 'bg-gradient-to-br from-purple-500/10 to-pink-600/5 border-purple-200';
        if (badgeName.includes('200')) return 'bg-gradient-to-br from-red-500/10 to-orange-600/5 border-red-200';
        if (badgeName.includes('100')) return 'bg-gradient-to-br from-blue-500/10 to-cyan-600/5 border-blue-200';
        if (badgeName.includes('50')) return 'bg-gradient-to-br from-green-500/10 to-emerald-600/5 border-green-200';
        if (badgeName.includes('25')) return 'bg-gradient-to-br from-yellow-500/10 to-amber-600/5 border-yellow-200';
        return 'bg-gradient-to-br from-gray-500/10 to-gray-600/5 border-gray-200';
    };

    return (
        <div className={`flex-shrink-0 w-56 p-5 rounded-2xl border-2 hover:border-opacity-60 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${getBadgeGradient(badge.name)} group`}>
            <div className="text-center space-y-4">
                {/* Badge Icon/Image */}
                <div className="flex justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                    {badge.icon ? (
                        <div className="relative">
                            <img
                                src={badge.icon}
                                alt={badge.name}
                                className="w-16 h-16 object-contain rounded-xl transform group-hover:scale-110 transition-transform duration-300 z-10 relative"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getBadgeColor(badge.name)} flex items-center justify-center absolute inset-0 z-0`}
                                style={{ display: 'none' }}
                            >
                                {getBadgeIcon(badge.name)}
                            </div>
                        </div>
                    ) : (
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getBadgeColor(badge.name)} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110`}>
                            {getBadgeIcon(badge.name)}
                        </div>
                    )}
                </div>

                {/* Badge Content */}
                <div className="space-y-3">
                    <div className="space-y-2">
                        <h4 className="font-bold text-gray-800 text-base leading-tight line-clamp-2 group-hover:text-gray-900 transition-colors duration-300">
                            {badge.name}
                        </h4>
                        {badge.subTitle && <div className="flex items-center justify-center gap-2 text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                            {badge.subTitleIcon}
                            <span className="font-medium">
                                {badge.subTitle}
                            </span>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BadgeCard;