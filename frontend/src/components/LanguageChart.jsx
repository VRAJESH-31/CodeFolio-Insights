import React from 'react';
import ReactApexChart from './ReactApexChart';

const LanguageChart = ({ githubData }) => {
    const languages = githubData?.languageUsageInBytes || {};
    const sortedLanguages = Object.entries(languages)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);
    const languageLabels = sortedLanguages.map(([lang]) => lang);
    const languageSeries = sortedLanguages.map(([, bytes]) => bytes);

    const options = {
        chart: {
            toolbar: { show: false },
            fontFamily: 'Inter, sans-serif',
            background: 'transparent',
        },
        dataLabels: { enabled: false },
        labels: languageLabels.length > 0 ? languageLabels : ["No Data"],
        colors: ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"],
        plotOptions: {
            pie: {
                donut: {
                    size: "65%",
                    background: 'transparent'
                },
            },
        },
        legend: {
            position: "bottom",
            horizontalAlign: "center",
            fontSize: "13px",
            fontFamily: 'Inter, sans-serif',
            markers: {
                radius: 4,
                offsetX: -3,
                offsetY: 1
            }
        },
        stroke: {
            colors: ['transparent']
        }
    };

    const series = languageSeries.length > 0 ? languageSeries : [1];

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100/30 shadow-lg hover:shadow-xl transition-all duration-500 p-5 lg:p-6 animate-float-in" style={{ animationDelay: '200ms' }}>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-black text-gray-800 mb-2">Languages</h2>
                    <p className="text-sm text-gray-500">Top languages by usage</p>
                </div>
            </div>
            <div className="h-60 lg:h-64">
                <ReactApexChart type="donut" height="100%" width="100%" series={series} options={options} />
            </div>
        </div>
    );
};

export default LanguageChart;
