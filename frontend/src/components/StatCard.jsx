const StatCard = ({ icon: Icon, title, value, color, delay }) => {
    const colorClasses = {
        green: { 
            bg: 'from-green-500 to-emerald-600', 
            text: 'text-green-600', 
            bgLight: 'bg-green-100',
            border: 'border-green-200',
            hover: 'hover:border-green-300'
        },
        blue: { 
            bg: 'from-blue-500 to-cyan-600', 
            text: 'text-blue-600', 
            bgLight: 'bg-blue-100',
            border: 'border-blue-200',
            hover: 'hover:border-blue-300'
        },
        yellow: { 
            bg: 'from-yellow-500 to-amber-600', 
            text: 'text-yellow-600', 
            bgLight: 'bg-yellow-100',
            border: 'border-yellow-200',
            hover: 'hover:border-yellow-300'
        },
        purple: { 
            bg: 'from-purple-500 to-indigo-600', 
            text: 'text-purple-600', 
            bgLight: 'bg-purple-100',
            border: 'border-purple-200',
            hover: 'hover:border-purple-300'
        },
    };

    const colors = colorClasses[color] || colorClasses.blue;

    return (
        <div 
            className={`bg-white/90 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl shadow-xl border ${colors.border} ${colors.hover} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl animate-float-in group`}
            style={{animationDelay: `${delay}ms`}}
        >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br ${colors.bg} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                </div>
            </div>
            
            <div className="space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide leading-tight">
                    {title}
                </p>
                <p className="text-2xl sm:text-3xl font-black text-gray-800 leading-none">
                    {value}
                </p>
            </div>
            
            <div className="mt-3 sm:mt-4 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <div 
                    className={`h-1.5 rounded-full bg-gradient-to-r ${colors.bg} transition-all duration-1000 ease-out group-hover:animate-pulse`}
                    style={{ width: '75%' }}
                ></div>
            </div>
        </div>
    );
};

export default StatCard;