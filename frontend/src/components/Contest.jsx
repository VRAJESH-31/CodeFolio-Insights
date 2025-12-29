import { useState, useEffect } from 'react';
import { ContestGraph } from './charts/export.js';

const Contest = ({ data }) => {
    const platforms = Object.keys(data || {});
    const [selectedPlatform, setSelectedPlatform] = useState(platforms[0] || null);

    useEffect(() => {
        if (platforms.length > 0 && !platforms.includes(selectedPlatform)) {
            setSelectedPlatform(platforms[0]);
        }
    }, [platforms, selectedPlatform]);

    if (!data || platforms.length === 0) {
        return null;
    }

    const currentContestData = data[selectedPlatform] || [];
    const totalContests = Object.values(data || {}).reduce((acc, curr) => acc + (curr?.length || 0), 0);

    return (
        <div className="w-full">
            <div className="bg-white rounded-xl p-6 mb-6 flex flex-col md:flex-row items-stretch shadow-lg border border-gray-200">
                <div className="flex flex-col items-center justify-center w-full md:w-1/2 mb-6 md:mb-0 md:border-r border-gray-100 p-4">
                    <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-1">Total Contests</span>
                    <span className="text-gray-900 text-5xl font-black tracking-tight">{totalContests}</span>
                </div>

                <div className="flex flex-col justify-center gap-3 w-full md:w-1/2 p-4">
                    {platforms.map((platform) => {
                        const count = data[platform]?.length || 0;
                        const isSelected = selectedPlatform === platform;

                        return (
                            <button
                                key={platform}
                                onClick={() => setSelectedPlatform(platform)}
                                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 border ${isSelected
                                    ? 'bg-gray-50 border-gray-400 text-gray-900 shadow-sm scale-[1.02]'
                                    : 'bg-white border-gray-100 text-gray-500 hover:border-gray-300 hover:text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`font-semibold text-sm ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>{platform}</span>
                                </div>
                                <span className={`text-sm font-bold ${isSelected ? 'text-gray-900' : 'text-gray-400'}`}>{count}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <ContestGraph contestData={currentContestData} />
        </div>
    );
};

export default Contest;
