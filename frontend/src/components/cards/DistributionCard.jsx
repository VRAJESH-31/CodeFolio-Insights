import { EmptyState } from '@/components/export.js';

const StatItem = ({ name, percentage, color }) => (
    <div className="flex items-center space-x-2">
        <span className={`w-3 h-3 rounded-full ${color.class} shadow-md`}></span>
        <span className="text-gray-900 font-bold">{name}</span>
        <span className="text-gray-700 text-sm font-semibold">{percentage}%</span>
    </div>
);

const DistributionCard = ({ title, stats }) => {

    if (stats.length === 0) {
        return (
            <EmptyState title={title} message="No data available." />
        );
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{title}</h3>
            <div className="flex w-full h-4 mb-8 rounded-full overflow-hidden shadow-inner bg-gray-100">
                {stats.map((item) => (
                    <div
                        key={item.name}
                        className={`${item.color.class} transition-all duration-700`}
                        style={{ width: `${item.percentage}%` }}
                        title={`${item.name}: ${item.percentage}%`}
                    />
                ))}
            </div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                {stats.map((item) => (
                    <StatItem
                        key={item.name}
                        name={item.name}
                        percentage={item.percentage}
                        color={item.color}
                    />
                ))}
            </div>
        </div>
    );
};

export default DistributionCard;