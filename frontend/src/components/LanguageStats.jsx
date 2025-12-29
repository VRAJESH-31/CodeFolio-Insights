const colorMap = [
    'bg-indigo-600',
    'bg-emerald-500',
    'bg-yellow-600',
    'bg-pink-500',
    'bg-teal-600',
    'bg-slate-400'
];

const LanguageItem = ({ name, percentage, colorClass }) => (
    <div className="flex items-center space-x-2">
        <span className={`w-3 h-3 rounded-full ${colorClass} shadow-md`}></span>
        <span className="text-gray-900 font-bold">{name}</span>
        <span className="text-gray-700 text-sm font-semibold">{percentage}%</span>
    </div>
);

const processLanguageData = (languageStats) => {
    if (!languageStats || Object.keys(languageStats).length === 0) return [];

    const totalBytes = Object.values(languageStats).reduce((sum, bytes) => sum + bytes, 0);
    const sortedLanguages = Object.entries(languageStats)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);

    const topLanguages = sortedLanguages.slice(0, 5);
    const otherLanguages = sortedLanguages.slice(5);

    let processedData = topLanguages.map((lang, index) => ({
        name: lang.name,
        value: lang.value,
        percentage: ((lang.value / totalBytes) * 100).toFixed(1),
        colorClass: colorMap[index % colorMap.length]
    }));

    if (otherLanguages.length > 0) {
        const otherBytes = otherLanguages.reduce((sum, lang) => sum + lang.value, 0);
        processedData.push({
            name: 'Others',
            value: otherBytes,
            percentage: ((otherBytes / totalBytes) * 100).toFixed(1),
            colorClass: colorMap[colorMap.length - 1]
        });
    }

    return processedData.sort((a, b) => b.percentage - a.percentage);
};

const LanguageStats = ({ languageStats }) => {
    const processedData = processLanguageData(languageStats);

    if (processedData.length === 0) {
        return (
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100/50">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Languages</h3>
                <p className="text-gray-500">No language data available.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Languages</h3>
            <div className="flex w-full h-4 mb-8 rounded-full overflow-hidden shadow-inner bg-gray-100">
                {processedData.map((lang) => (
                    <div
                        key={lang.name}
                        className={`${lang.colorClass} transition-all duration-700`}
                        style={{ width: `${lang.percentage}%` }}
                        title={`${lang.name}: ${lang.percentage}%`}
                    />
                ))}
            </div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                {processedData.map((lang) => (
                    <LanguageItem
                        key={lang.name}
                        name={lang.name}
                        percentage={lang.percentage}
                        colorClass={lang.colorClass}
                    />
                ))}
            </div>
        </div>
    );
};

export default LanguageStats;