import { ArrowUpRight } from 'lucide-react';

const StatCard = ({ title, value, change, Icon, color, index }) => {
    const getColorClasses = (color) => {
        switch (color) {
            case 'blue': return { text: 'text-blue-600', bg: 'bg-blue-50', gradient: 'from-blue-100 to-blue-200' };
            case 'green': return { text: 'text-green-600', bg: 'bg-green-50', gradient: 'from-green-100 to-green-200' };
            case 'purple': return { text: 'text-purple-600', bg: 'bg-purple-50', gradient: 'from-purple-100 to-purple-200' };
            case 'amber': return { text: 'text-amber-600', bg: 'bg-amber-50', gradient: 'from-amber-100 to-amber-200' };
            default: return { text: 'text-gray-600', bg: 'bg-gray-50', gradient: 'from-gray-100 to-gray-200' };
        }
    };

    const { text, bg, gradient } = getColorClasses(color);

    return (
        <div
            className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 p-6 group relative overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-full -mr-8 -mt-8 opacity-10 bg-current ${text}`} />

            <div className="flex justify-between items-start relative z-10">
                <div className="flex-1">
                    <p className="text-[10px] font-black text-gray-400 mb-1 uppercase tracking-widest">{title}</p>
                    <h3 className="text-3xl font-black text-gray-800 mb-3">{value}</h3>
                    {change && <div className="flex items-center">
                        <span className={`text-xs font-bold flex items-center ${text}`}>
                            <ArrowUpRight className="mr-1 w-3 h-3" />
                            {change}
                        </span>
                        <span className="text-gray-400 text-[10px] font-bold ml-2 uppercase">vs last month</span>
                    </div>}
                </div>
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} group-hover:scale-110 transition-transform shadow-lg`}>
                    {Icon && <Icon className={`w-5 h-5 ${text}`} />}
                </div>
            </div>
            <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div className={`h-full rounded-full bg-gradient-to-r ${gradient.replace('100', '500').replace('200', '600')} animate-shimmer`} style={{ width: '85%' }}></div>
            </div>
        </div>
    );
};

export default StatCard;
