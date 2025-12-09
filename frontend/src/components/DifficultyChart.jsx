import React from 'react';
import ReactApexChart from './ReactApexChart';

const DifficultyChart = ({ leetcodeData }) => {
    const acSubmissionNum = leetcodeData?.problemsCount?.acSubmissionNum;
    const easyCount = acSubmissionNum?.find(i => i.difficulty === 'Easy')?.count || acSubmissionNum?.[1]?.count || 0;
    const mediumCount = acSubmissionNum?.find(i => i.difficulty === 'Medium')?.count || acSubmissionNum?.[2]?.count || 0;
    const hardCount = acSubmissionNum?.find(i => i.difficulty === 'Hard')?.count || acSubmissionNum?.[3]?.count || 0;

    const options = {
        chart: {
            toolbar: { show: false },
            fontFamily: 'Inter, sans-serif',
            background: 'transparent',
        },
        dataLabels: { enabled: false },
        colors: ["#3b82f6", "#8b5cf6", "#ec4899"],
        plotOptions: {
            bar: {
                borderRadius: 8,
                columnWidth: "45%",
                distributed: true,
            },
        },
        xaxis: {
            categories: ["Easy", "Medium", "Hard"],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: {
                    colors: '#6b7280',
                    fontSize: '13px',
                    fontFamily: 'Inter, sans-serif',
                }
            }
        },
        yaxis: {
            labels: {
                formatter: (val) => val.toFixed(0),
                style: {
                    colors: '#6b7280',
                    fontSize: '12px',
                    fontFamily: 'Inter, sans-serif',
                }
            }
        },
        tooltip: {
            theme: 'light',
            y: {
                formatter: (val) => `${val} problems`,
            },
        },
        legend: { show: false },
        grid: {
            borderColor: '#f3f4f6',
            strokeDashArray: 4,
        }
    };

    const series = [{ name: "Problems Solved", data: [easyCount, mediumCount, hardCount] }];

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100/30 shadow-lg hover:shadow-xl transition-all duration-500 p-5 lg:p-6 animate-float-in" style={{ animationDelay: '300ms' }}>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-black text-gray-800 mb-2">Problem Difficulty</h2>
                    <p className="text-sm text-gray-500">Solved by difficulty level</p>
                </div>
            </div>
            <div className="h-40 lg:h-44">
                <ReactApexChart type="bar" height="100%" width="100%" series={series} options={options} />
            </div>
        </div>
    );
};

export default DifficultyChart;
