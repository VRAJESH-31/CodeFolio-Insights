import React from 'react';

const StatCard = ({ title, value, change, icon, color, index }) => {
    return (
        <div
            className="bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100/30 shadow-lg hover:shadow-xl hover:border-blue-200/50 hover:-translate-y-1 transition-all duration-500 animate-float-in p-5 lg:p-6 group relative overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Background Accent */}
            <div className={`absolute top-0 right-0 w-20 h-20 rounded-full -mr-6 -mt-6 opacity-10 ${color === 'blue' ? 'bg-blue-500' :
                    color === 'green' ? 'bg-green-500' :
                        color === 'purple' ? 'bg-purple-500' : 'bg-amber-500'
                }`}></div>

            <div className="flex justify-between items-start relative z-10">
                <div className="flex-1">
                    <p className="text-xs lg:text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">{title}</p>
                    <h3 className="text-2xl lg:text-3xl font-black text-gray-800 mb-3">{value}</h3>
                    <div className="flex items-center">
                        <span className={`text-xs lg:text-sm font-semibold flex items-center ${color === 'blue' ? 'text-blue-600' :
                                color === 'green' ? 'text-green-600' :
                                    color === 'purple' ? 'text-purple-600' : 'text-amber-600'
                            }`}>
                            <i className="fa-solid fa-arrow-trend-up mr-2 text-sm"></i>
                            {change}
                        </span>
                        <span className="text-gray-400 text-xs ml-2">vs last month</span>
                    </div>
                </div>
                <div className={`p-3 lg:p-4 rounded-2xl bg-gradient-to-br ${color === 'blue' ? 'from-blue-100 to-blue-200 shadow-blue-200/50' :
                        color === 'green' ? 'from-green-100 to-green-200 shadow-green-200/50' :
                            color === 'purple' ? 'from-purple-100 to-purple-200 shadow-purple-200/50' : 'from-amber-100 to-amber-200 shadow-amber-200/50'
                    } group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <i className={`fa-solid ${icon} text-lg ${color === 'blue' ? 'text-blue-600' :
                            color === 'green' ? 'text-green-600' :
                                color === 'purple' ? 'text-purple-600' : 'text-amber-600'
                        }`}></i>
                </div>
            </div>
            <div className="mt-4 w-full bg-gray-200/50 rounded-full h-1.5">
                <div className={`h-1.5 rounded-full bg-gradient-to-r ${color === 'blue' ? 'from-blue-500 to-blue-600' :
                        color === 'green' ? 'from-green-500 to-green-600' :
                            color === 'purple' ? 'from-purple-500 to-purple-600' : 'from-amber-500 to-amber-600'
                    } animate-shimmer`} style={{ width: '85%' }}></div>
            </div>
        </div>
    );
};

export default StatCard;
