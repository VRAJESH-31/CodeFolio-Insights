import { Calendar, Shield, Medal } from "lucide-react";

const BadgeCard = ({ badge }) => {

    const getBadgeColor = (badgeName) => {
        if (badgeName.includes('365')) return 'from-purple-500 to-pink-600';
        if (badgeName.includes('200')) return 'from-red-500 to-orange-600';
        if (badgeName.includes('100')) return 'from-blue-500 to-cyan-600';
        if (badgeName.includes('50')) return 'from-green-500 to-emerald-600';
        return 'from-gray-500 to-gray-600';
    };

    return (
        <div className="flex-shrink-0 w-48 bg-gradient-to-br from-white to-gray-50 p-4 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-center space-y-3">
                <div className="flex justify-center">
                    {badge ? (
                        <img 
                            src={badge.icon} 
                            alt={badge.displayName}
                            className="w-12 h-12 object-contain rounded-lg"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                    ) : (
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getBadgeColor(badge.displayName)} flex items-center justify-center`}
                        >
                            <Medal className="w-6 h-6 text-white" />
                        </div>
                    )}
                </div>
                
                <div className="space-y-1">
                    <h4 className="font-bold text-gray-800 text-sm leading-tight line-clamp-2">
                        {badge.displayName}
                    </h4>
                    <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(badge.creationDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                    </div>
                </div>
                
                {!badge.expired && (
                    <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                        <Shield className="w-2 h-2" />
                        Active
                    </div>
                )}
            </div>
        </div>
    );
};

export default BadgeCard