const ContestAchievements = ({ achievements }) => {
    if (!achievements || achievements.length === 0) {
        return null;
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 font-sans text-gray-800 w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center border-b pb-4 border-gray-100">Contest Rankings</h3>

            <div className="flex flex-col space-y-8">
                {achievements.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">

                        {/* Platform Name */}
                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">{item.platform}</h4>

                        <div className="flex items-center justify-between w-full px-4 max-w-xs">
                            {/* Badge */}
                            <div className="flex-shrink-0">
                                {item.badgeUrl && (
                                    <img
                                        src={item.badgeUrl}
                                        alt={`${item.platform} Badge`}
                                        className={`w-28 h-28 object-contain ${item.isDefaultBadge ? 'opacity-25 grayscale' : ''}`}
                                    />
                                )}
                            </div>

                            {/* Rating & Details */}
                            <div className="flex flex-col items-end text-right">
                                <div className="text-4xl font-extrabold text-gray-900 tracking-tight">
                                    {item.currentRating}
                                </div>

                                <div className="text-sm text-gray-500 font-medium mt-1">
                                    (max : {item.maxRating})
                                </div>

                                {item.position && (
                                    <div className="mt-2 text-sm font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded-md">
                                        {item.position}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Separator if not last item */}
                        {index < achievements.length - 1 && (
                            <div className="w-full h-px bg-gray-100 mt-8" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContestAchievements;
