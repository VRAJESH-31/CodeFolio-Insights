const colorMap = [
    'bg-indigo-600',   // Deep Violet/Blue (Excellent primary)
    'bg-emerald-500',  // Bright Green (More lively than green-600)
    'bg-yellow-600',   // Warm Gold/Mustard (Better contrast than yellow-500)
    'bg-pink-500',     // Rose/Fuschia (Distinct, eye-catching hue)
    'bg-teal-600',     // Deep Cyan/Teal (Separates well from blue/green)
    'bg-slate-400'     // Cool Gray/Slate (Neutral, clearly indicates 'Others')
];

// Reusable Language Legend Item
const LanguageItem = ({ name, percentage, colorClass }) => (
    <div className="flex items-center space-x-2">
        {/* Color Legend Dot */}
        <span 
            className={`w-3 h-3 rounded-full ${colorClass} shadow-md`}
        ></span>
        <span className="text-gray-900 font-bold transition-colors duration-300">
            {name}
        </span>
        <span className="text-gray-700 text-sm font-semibold">
            {percentage}%
        </span>
    </div>
);


/**
 * Utility function to process the raw language stats.
 * (Logic remains the same: Top 5 + Others aggregation)
 *
 * @param {Object} languageStats - Object where keys are language names and values are byte counts.
 * @returns {Array<Object>} - Array of objects { name: string, value: number, percentage: number, colorClass: string }.
 */
const processLanguageData = (languageStats) => {
    if (!languageStats || Object.keys(languageStats).length === 0) {
        return [];
    }

    const totalBytes = Object.values(languageStats).reduce((sum, bytes) => sum + bytes, 0);

    const sortedLanguages = Object.entries(languageStats)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);

    const topLanguages = sortedLanguages.slice(0, 5);
    const otherLanguages = sortedLanguages.slice(5);

    let processedData = [];
    let otherBytes = 0;

    // 1. Process Top Languages
    topLanguages.forEach((lang, index) => {
        processedData.push({
            name: lang.name,
            value: lang.value,
            percentage: ((lang.value / totalBytes) * 100).toFixed(1),
            colorClass: colorMap[index % colorMap.length] // Assign color
        });
    });

    // 2. Aggregate and Process 'Other'
    if (otherLanguages.length > 0) {
        otherBytes = otherLanguages.reduce((sum, lang) => sum + lang.value, 0);
        const otherPercentage = ((otherBytes / totalBytes) * 100).toFixed(1);

        processedData.push({
            name: 'Others', // Changed name to plural 'Others'
            value: otherBytes,
            percentage: otherPercentage,
            colorClass: colorMap[colorMap.length - 1] // Use the last color (gray)
        });
    }

    // 3. Final sort by percentage for display consistency (largest first)
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
            {/* Header */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Languages</h3>
            
            {/* Visual Bar/Chart */}
            <div className="flex w-full h-4 mb-8 rounded-full overflow-hidden shadow-inner bg-gray-100">
                {processedData.map((lang, index) => (
                    <div
                        key={lang.name}
                        className={`${lang.colorClass} transition-all duration-700`}
                        style={{ width: `${lang.percentage}%` }}
                        title={`${lang.name}: ${lang.percentage}%`}
                    />
                ))}
            </div>

            {/* Two-Column Detailed Legend */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                {processedData.map((lang, index) => (
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