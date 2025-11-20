import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import useAuthStore from '../../store/useAuthStore.js';

const ReactApexChart = ({ options, series, type, width, height }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartRef.current && !chartInstance.current && typeof ApexCharts !== 'undefined') {
            const newOptions = {
                ...options,
                chart: { ...options.chart, type, width, height },
                series,
            };
            chartInstance.current = new ApexCharts(chartRef.current, newOptions);
            chartInstance.current.render();
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.updateOptions(options);
            chartInstance.current.updateSeries(series);
        }
    }, [options, series]);

    return <div ref={chartRef} />;
};

const App = () => {
    const [activeMenu, setActiveMenu] = useState('Dashboard');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    // const user = useAuthStore((state)=>state.user);
    // const [mounted, setMounted] = useState(false);

    const navigate = useNavigate();

    // useEffect(() => {
    //     setMounted(true);
    //     const storedUser = localStorage.getItem('user');
    //     if (storedUser) {
    //         setUser(JSON.parse(storedUser));
    //     } else {
    //         const fetchUser = async () => {
    //             try {
    //                 const res = await fetch('http://localhost:8080/auth/user', { credentials: 'include' });
    //                 if (res.ok) {
    //                     const data = await res.json();
    //                     setUser(data);
    //                     localStorage.setItem('user', JSON.stringify(data));
    //                 }
    //             } catch (error) {
    //                 console.error('Error fetching user:', error);
    //             }
    //         };
    //         fetchUser();
    //     }
    // }, [navigate]);

    const handleLogout = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        try {
            await fetch('http://localhost:8080/auth/logout', {
                method: 'POST',
            });
        } catch (error) {
            console.error('Logout failed:', error);
        }
        navigate('/');
    };

    const chartOptions = {
        area: {
            chart: {
                toolbar: { show: false },
                zoom: { enabled: false },
                fontFamily: 'Inter, sans-serif',
                background: 'transparent',
            },
            dataLabels: { enabled: false },
            stroke: { 
                curve: "smooth", 
                width: 3,
                lineCap: 'round'
            },
            colors: ["#3b82f6", "#8b5cf6"],
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.2,
                    stops: [0, 90, 100]
                },
            },
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: {
                    style: {
                        colors: '#6b7280',
                        fontSize: '12px',
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
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5,
                fontSize: '13px',
                fontFamily: 'Inter, sans-serif',
                markers: {
                    radius: 4,
                    offsetX: -3,
                    offsetY: 1
                }
            },
            tooltip: {
                theme: 'light',
                y: {
                    formatter: (val) => val,
                },
            },
            grid: {
                borderColor: '#f3f4f6',
                strokeDashArray: 4,
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            }
        },
        donut: {
            chart: {
                toolbar: { show: false },
                fontFamily: 'Inter, sans-serif',
                background: 'transparent',
            },
            dataLabels: { enabled: false },
            labels: ["Dynamic Programming", "Arrays & Strings", "Trees & Graphs", "Linked Lists", "Other"],
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
        },
        bar: {
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
        },
    };

    const chartSeries = {
        area: [
            { name: "GitHub Commits", data: [42, 38, 45, 56, 49, 62, 69, 91, 82, 86, 95, 113] },
            { name: "LeetCode Problems", data: [15, 12, 18, 22, 19, 25, 28, 32, 29, 33, 39, 42] },
        ],
        donut: [38, 24, 18, 12, 8],
        bar: [{ name: "Problems Solved", data: [124, 78, 43] }],
    };

    const repositories = [
        { name: "algorithms-visualizer", stars: 128, forks: 42, lastCommit: "2 days ago" },
        { name: "react-portfolio-template", stars: 95, forks: 38, lastCommit: "1 week ago" },
        { name: "leetcode-solutions", stars: 76, forks: 24, lastCommit: "3 days ago" },
        { name: "ml-projects", stars: 52, forks: 17, lastCommit: "2 weeks ago" },
    ];

    const animationStyles = `
        @keyframes floatIn {
            0% { opacity: 0; transform: translateY(20px) scale(0.95); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes glowPulse {
            0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.1); }
            50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.2); }
        }
        @keyframes shimmer {
            0% { background-position: -200px 0; }
            100% { background-position: 200px 0; }
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-float-in { animation: floatIn 0.6s ease-out forwards; }
        .animate-slide-in-right { animation: slideInRight 0.5s ease-out forwards; }
        .animate-glow-pulse { animation: glowPulse 3s ease-in-out infinite; }
        .animate-shimmer {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            background-size: 200px 100%;
            animation: shimmer 2s infinite;
        }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.4s ease-out forwards; }
    `;

    return (
        <div className="flex h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 font-sans overflow-hidden relative">
            <style>{animationStyles}</style>
            
            {/* Enhanced Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100/10 to-purple-100/10 rounded-full blur-3xl"></div>
            </div>
            
            <Sidebar
                isSidebarCollapsed={isSidebarCollapsed}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
            />

            <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* Enhanced Header with Glass Morphism */}
                <header className="bg-white/70 backdrop-blur-xl shadow-sm border-b border-blue-100/30 z-20 sticky top-0">
                    <div className="flex items-center justify-between p-4 lg:p-6">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                                className="p-3 rounded-2xl text-gray-600 hover:text-blue-600 hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 transform hover:scale-105 group backdrop-blur-sm"
                            >
                                <i className="fa-solid fa-bars text-lg group-hover:rotate-90 transition-transform duration-300"></i>
                            </button>
                            <div className="flex flex-col">
                                <h1 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-slide-in-right">
                                    CodeFolio Insights
                                </h1>
                                <p className="text-sm text-gray-500 mt-1 animate-slide-in-right" style={{animationDelay: '0.1s'}}>
                                    Your comprehensive development analytics
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 lg:space-x-6">
                            {/* Enhanced Date Filter */}
                            <div className="relative">
                                <details className="group [&[open]>summary>i]:-rotate-180">
                                    <summary className="flex items-center gap-2 lg:gap-3 text-sm cursor-pointer list-none p-2.5 lg:p-3 rounded-2xl border border-blue-100/50 hover:border-blue-200 hover:bg-white/80 transition-all duration-300 backdrop-blur-sm bg-white/50">
                                        <i className="fa-solid fa-calendar-days text-blue-500 text-sm"></i>
                                        <span className="font-semibold text-gray-700 hidden sm:inline">Last 30 days</span>
                                        <i className="fa-solid fa-chevron-down transition-transform duration-300 text-xs text-blue-500"></i>
                                    </summary>
                                    <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-blue-100/50 z-30 animate-scale-in overflow-hidden">
                                        <div className="py-2">
                                            {['Today', 'Yesterday', 'Last 7 days', 'Last 30 days', 'This month', 'Custom range'].map((item, index) => (
                                                <a key={item} href="#" className={`flex items-center gap-3 px-4 py-3 text-sm transition-all duration-300 hover:bg-blue-50/80 group/item ${
                                                    item === 'Last 30 days' ? 'text-blue-600 bg-blue-50/50' : 'text-gray-700'
                                                }`}>
                                                    <i className={`fa-solid ${
                                                        ['fa-sun', 'fa-clock-rotate-left', 'fa-calendar-week', 'fa-calendar-days', 'fa-chart-column', 'fa-sliders'][index]
                                                    } w-4 text-center group-hover/item:scale-110 transition-transform text-blue-400`}></i>
                                                    <span className="font-medium">{item}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </details>
                            </div>

                            {/* Enhanced Search */}
                            <div className="relative hidden sm:block">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search analytics..."
                                        className="py-2.5 pl-10 pr-4 text-sm border border-blue-100/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-300 transition-all duration-300 w-48 lg:w-56 bg-white/80 backdrop-blur-sm"
                                    />
                                    <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400"></i>
                                </div>
                            </div>

                            {/* Notification Bell */}
                            <button className="p-2.5 rounded-2xl text-gray-600 hover:text-blue-600 hover:bg-white/80 transition-all duration-300 relative group">
                                <i className="fa-solid fa-bell text-lg"></i>
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Enhanced Main Content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-6 xl:p-8 custom-scrollbar">
                    {/* Stats Grid with Enhanced Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
                        {[
                            { title: "LeetCode Problems", value: "245", change: "12.5%", icon: "fa-code", color: "blue" },
                            { title: "GitHub Commits", value: "1,254", change: "8.3%", icon: "fa-code-commit", color: "green" },
                            { title: "LinkedIn Profile Views", value: "472", change: "15.7%", icon: "fa-eye", color: "purple" },
                            { title: "Resume Score", value: "85/100", change: "5.3%", icon: "fa-file-lines", color: "amber" }
                        ].map((stat, index) => (
                            <div 
                                key={stat.title}
                                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100/30 shadow-lg hover:shadow-xl hover:border-blue-200/50 hover:-translate-y-1 transition-all duration-500 animate-float-in p-5 lg:p-6 group relative overflow-hidden"
                                style={{animationDelay: `${index * 100}ms`}}
                            >
                                {/* Background Accent */}
                                <div className={`absolute top-0 right-0 w-20 h-20 rounded-full -mr-6 -mt-6 opacity-10 ${
                                    stat.color === 'blue' ? 'bg-blue-500' :
                                    stat.color === 'green' ? 'bg-green-500' :
                                    stat.color === 'purple' ? 'bg-purple-500' : 'bg-amber-500'
                                }`}></div>
                                
                                <div className="flex justify-between items-start relative z-10">
                                    <div className="flex-1">
                                        <p className="text-xs lg:text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">{stat.title}</p>
                                        <h3 className="text-2xl lg:text-3xl font-black text-gray-800 mb-3">{stat.value}</h3>
                                        <div className="flex items-center">
                                            <span className={`text-xs lg:text-sm font-semibold flex items-center ${
                                                stat.color === 'blue' ? 'text-blue-600' :
                                                stat.color === 'green' ? 'text-green-600' :
                                                stat.color === 'purple' ? 'text-purple-600' : 'text-amber-600'
                                            }`}>
                                                <i className="fa-solid fa-arrow-trend-up mr-2 text-sm"></i>
                                                {stat.change}
                                            </span>
                                            <span className="text-gray-400 text-xs ml-2">vs last month</span>
                                        </div>
                                    </div>
                                    <div className={`p-3 lg:p-4 rounded-2xl bg-gradient-to-br ${
                                        stat.color === 'blue' ? 'from-blue-100 to-blue-200 shadow-blue-200/50' :
                                        stat.color === 'green' ? 'from-green-100 to-green-200 shadow-green-200/50' :
                                        stat.color === 'purple' ? 'from-purple-100 to-purple-200 shadow-purple-200/50' : 'from-amber-100 to-amber-200 shadow-amber-200/50'
                                    } group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                        <i className={`fa-solid ${stat.icon} text-lg ${
                                            stat.color === 'blue' ? 'text-blue-600' :
                                            stat.color === 'green' ? 'text-green-600' :
                                            stat.color === 'purple' ? 'text-purple-600' : 'text-amber-600'
                                        }`}></i>
                                    </div>
                                </div>
                                <div className="mt-4 w-full bg-gray-200/50 rounded-full h-1.5">
                                    <div className={`h-1.5 rounded-full bg-gradient-to-r ${
                                        stat.color === 'blue' ? 'from-blue-500 to-blue-600' :
                                        stat.color === 'green' ? 'from-green-500 to-green-600' :
                                        stat.color === 'purple' ? 'from-purple-500 to-purple-600' : 'from-amber-500 to-amber-600'
                                    } animate-shimmer`} style={{width: '85%'}}></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Charts Grid with Improved Spacing */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
                        {/* Main Chart */}
                        <div className="xl:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100/30 shadow-lg hover:shadow-xl transition-all duration-500 p-5 lg:p-6 animate-float-in">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                                <div>
                                    <h2 className="text-xl lg:text-2xl font-black text-gray-800 mb-2">Coding Activity</h2>
                                    <p className="text-sm text-gray-500">Your coding progress over time</p>
                                </div>
                                <div className="flex items-center space-x-2 bg-white/80 rounded-2xl p-1 border border-blue-100/30 mt-3 sm:mt-0">
                                    {['Monthly', 'Weekly', 'Daily'].map((period) => (
                                        <button
                                            key={period}
                                            className={`py-2 px-3 lg:px-4 text-xs lg:text-sm font-semibold rounded-xl transition-all duration-300 ${
                                                period === 'Monthly' 
                                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                                                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
                                            }`}
                                        >
                                            {period}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="h-72 lg:h-80">
                                <ReactApexChart type="area" height="100%" width="100%" series={chartSeries.area} options={chartOptions.area} />
                            </div>
                        </div>

                        {/* Side Charts */}
                        <div className="space-y-4 lg:space-y-6">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100/30 shadow-lg hover:shadow-xl transition-all duration-500 p-5 lg:p-6 animate-float-in" style={{animationDelay: '200ms'}}>
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h2 className="text-xl font-black text-gray-800 mb-2">Problem Categories</h2>
                                        <p className="text-sm text-gray-500">Distribution by type</p>
                                    </div>
                                </div>
                                <div className="h-60 lg:h-64">
                                    <ReactApexChart type="donut" height="100%" width="100%" series={chartSeries.donut} options={chartOptions.donut} />
                                </div>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100/30 shadow-lg hover:shadow-xl transition-all duration-500 p-5 lg:p-6 animate-float-in" style={{animationDelay: '300ms'}}>
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h2 className="text-xl font-black text-gray-800 mb-2">Problem Difficulty</h2>
                                        <p className="text-sm text-gray-500">Solved by difficulty level</p>
                                    </div>
                                </div>
                                <div className="h-40 lg:h-44">
                                    <ReactApexChart type="bar" height="100%" width="100%" series={chartSeries.bar} options={chartOptions.bar} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Repositories Table */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100/30 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden animate-float-in" style={{animationDelay: '400ms'}}>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-blue-100/30 p-5 lg:p-6">
                            <div className="mb-4 sm:mb-0">
                                <h2 className="text-xl lg:text-2xl font-black text-gray-800">Top Repositories</h2>
                                <p className="text-sm text-gray-500 mt-1">Most active GitHub repositories</p>
                            </div>
                            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2.5 px-5 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm lg:text-base">
                                View All Repositories
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                        {['Repository', 'Stars', 'Forks', 'Last Commit', 'Status'].map((header) => (
                                            <th key={header} className="px-4 lg:px-6 py-3 lg:py-4 font-black text-xs lg:text-sm">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-blue-100/30">
                                    {repositories.map((repo, index) => (
                                        <tr 
                                            key={repo.name} 
                                            className="hover:bg-blue-50/30 transition-all duration-300 group"
                                        >
                                            <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl flex items-center justify-center mr-3 lg:mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                        <i className="fab fa-github text-sm lg:text-lg"></i>
                                                    </div>
                                                    <div>
                                                        <span className="font-bold text-gray-800 text-sm lg:text-base">{repo.name}</span>
                                                        <p className="text-xs text-gray-500 mt-0.5">Updated {repo.lastCommit}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <i className="fa-solid fa-star text-amber-500 mr-2 text-sm"></i>
                                                    <span className="font-semibold text-gray-800 text-sm lg:text-base">{repo.stars}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <i className="fa-solid fa-code-fork text-blue-500 mr-2 text-sm"></i>
                                                    <span className="font-semibold text-gray-800 text-sm lg:text-base">{repo.forks}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                                                <span className="text-xs lg:text-sm font-medium text-gray-600 bg-gray-100/80 py-1.5 px-3 rounded-full">
                                                    {repo.lastCommit}
                                                </span>
                                            </td>
                                            <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                                                    Active
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>

            <style>{`
    .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(59, 130, 246, 0.05);
        border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
        border-radius: 10px;
        opacity: 0.6;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(to bottom, #2563eb, #7c3aed);
        opacity: 0.8;
    }
`}</style>

        </div>
    );
};

export default App;