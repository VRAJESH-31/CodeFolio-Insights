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
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Stats</h3>
            <div className="space-y-3">
                {statsArray.map((stat, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between px-3 py-2 transition-all rounded-xl hover:bg-gray-50 group"
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600 group-hover:scale-110 transition-transform">{stat.icon}</span>
                            <span className="text-base font-semibold text-gray-700">{stat.name}</span>
                        </div>
                        <span className="text-lg font-black text-gray-900 tabular-nums group-hover:text-blue-600 transition-colors">
                            {stat.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GithubStats;