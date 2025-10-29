const StatCard = ({ icon: Icon, title, value, color, delay }) => {
    const colorClasses = {
        green: { bg: 'from-green-500 to-emerald-600', text: 'text-green-600', bgLight: 'bg-green-100' },
        blue: { bg: 'from-blue-500 to-cyan-600', text: 'text-blue-600', bgLight: 'bg-blue-100' },
        yellow: { bg: 'from-yellow-500 to-amber-600', text: 'text-yellow-600', bgLight: 'bg-yellow-100' },
        purple: { bg: 'from-purple-500 to-indigo-600', text: 'text-purple-600', bgLight: 'bg-purple-100' },
    };

    const colors = colorClasses[color] || colorClasses.blue;

    return (
        <div 
            className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-2xl border border-white/60 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 animate-float-in"
            style={{animationDelay: `${delay}ms`}}
        >
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${colors.bg} shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
            <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{title}</p>
                <p className="text-3xl font-black text-gray-800">{value}</p>
            </div>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-1.5">
                <div 
                    className={`h-1.5 rounded-full bg-gradient-to-r ${colors.bg} transition-all duration-1000 animate-shimmer`}
                    style={{ width: '75%' }}
                ></div>
            </div>
        </div>
    );
};

export default StatCard;