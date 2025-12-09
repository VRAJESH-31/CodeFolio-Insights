const GithubStats = ({ statsArray }) => {

    if (!statsArray || statsArray.length === 0) {
        return (
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Stats</h3>
                <p className="text-gray-500">No statistics data available.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-3 pb-2">Stats</h3>
            
            <div className="space-y-2">
                {statsArray.map((stat, index) => {

                    return (
                        <div 
                            key={index} 
                            className="flex items-center justify-between px-3 py-1 transition-all duration-300 rounded-xl hover:bg-gray-50 group"
                        >
                            {/* Icon and Name */}
                            <div className="flex items-center space-x-4">
                                {stat.icon}
                                <span className="text-lg font-medium text-gray-800">
                                    {stat.name}
                                </span>
                            </div>

                            {/* Value */}
                            <span className="text-lg font-extrabold text-gray-900 tabular-nums transition-all duration-300 group-hover:text-blue-600 group-hover:scale-105">
                                {stat.value}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default GithubStats;