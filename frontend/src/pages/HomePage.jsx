import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom';

// A wrapper component to integrate ApexCharts with React.
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
    const [hoveredItem, setHoveredItem] = useState(null);

    const [user, setUser] = useState(null);

    // Initialize useNavigate for redirection
    const navigate = useNavigate();

    // Fetch user from localStorage or API
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            console.log('Loaded user from localStorage:', JSON.parse(storedUser));
        } else {
            const fetchUser = async () => {
                try {
                    const res = await fetch('http://localhost:8080/auth/user', { credentials: 'include' });
                    if (res.ok) {
                        const data = await res.json();
                        setUser(data);
                        localStorage.setItem('user', JSON.stringify(data));
                    } else {
                        console.error('Failed to fetch user');
                    }
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            };
            fetchUser();
        }
    }, [navigate]);

    // Logout Function
    const handleLogout = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // 2. Notify the backend to destroy the server session
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
            },
            dataLabels: { enabled: false },
            stroke: { curve: "smooth", width: 2 },
            colors: ["#4f46e5", "#16a34a"],
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.5,
                    opacityTo: 0.1,
                },
            },
            xaxis: {
                categories: [
                    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
                ],
            },
            yaxis: {
                labels: {
                    formatter: (val) => val.toFixed(0),
                }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5
            },
            tooltip: {
                y: {
                    formatter: (val) => val,
                },
            },
        },
        donut: {
            chart: {
                toolbar: { show: false },
                fontFamily: 'Inter, sans-serif',
            },
            dataLabels: { enabled: false },
            labels: [
                "Dynamic Programming", "Arrays & Strings", "Trees & Graphs",
                "Linked Lists", "Other",
            ],
            colors: ["#4f46e5", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"],
            plotOptions: {
                pie: {
                    donut: { size: "60%" },
                },
            },
            legend: {
                position: "bottom",
                horizontalAlign: "center",
                fontSize: "12px",
            },
        },
        bar: {
            chart: {
                toolbar: { show: false },
                fontFamily: 'Inter, sans-serif',
            },
            dataLabels: { enabled: false },
            colors: ["#4f46e5", "#16a34a", "#f97316"],
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    columnWidth: "40%",
                    distributed: true,
                },
            },
            xaxis: { categories: ["Easy", "Medium", "Hard"] },
            yaxis: {
                labels: {
                    formatter: (val) => val.toFixed(0),
                },
            },
            tooltip: {
                y: {
                    formatter: (val) => `${val} problems`,
                },
            },
            legend: { show: false },
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

    const sidebarItems = [
        { name: 'Dashboard', icon: 'fa-solid fa-table-columns' },
        { name: 'LeetCode', icon: 'fa-solid fa-code' },
        { name: 'GitHub', icon: 'fa-brands fa-github' },
        { name: 'LinkedIn', icon: 'fa-brands fa-linkedin-in' },
        { name: 'Resume Analysis', icon: 'fa-solid fa-file-lines' },
        { name: 'Settings', icon: 'fa-solid fa-gear' },
    ];

    return (
        <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
            {/* Enhanced Sidebar */}
            <aside className={`hidden md:flex flex-col bg-white border-r border-gray-200 shadow-sm transition-all duration-500 ease-in-out ${isSidebarCollapsed ? 'w-20' : 'w-72'}`}>
                <div className={`flex items-center justify-center h-16 border-b border-gray-200 ${isSidebarCollapsed ? 'px-2' : 'px-4'}`}>
                    <div className="flex items-center space-x-2 overflow-hidden transition-all duration-300">
                        <svg className={`h-8 w-8 text-indigo-600 flex-shrink-0 transition-transform duration-300 ${isSidebarCollapsed ? 'scale-110' : 'scale-100'}`} viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 15.5v-3.5h3v3.5h-3zm0-5.5v-5h3v5h-3z" />
                        </svg>
                        {!isSidebarCollapsed && (
                            <span className="text-xl font-bold text-gray-800 whitespace-nowrap animate-fade-in">
                                CodeFolio-Insights
                            </span>
                        )}
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3">
                    <ul className="space-y-2">
                        {sidebarItems.map((item) => (
                            <li key={item.name} className="relative">
                                <a
                                    href="#"
                                    onClick={() => setActiveMenu(item.name)}
                                    onMouseEnter={() => setHoveredItem(item.name)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    className={`flex items-center p-3 text-gray-700 rounded-xl group transition-all duration-300 ease-out relative overflow-hidden ${activeMenu === item.name
                                            ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-800 font-semibold shadow-sm'
                                            : 'hover:bg-gray-50 hover:shadow-sm'
                                        }`}
                                >
                                    {/* Active indicator with smooth animation */}
                                    {activeMenu === item.name && (
                                        <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-r-full animate-slide-in-right"></div>
                                    )}

                                    {/* Icon with enhanced hover effects */}
                                    <div className={`relative z-10 transition-all duration-300 ${activeMenu === item.name
                                            ? 'transform scale-110'
                                            : 'group-hover:scale-105'
                                        }`}>
                                        <i className={`${item.icon} w-6 text-center text-xl transition-all duration-300 ${activeMenu === item.name
                                                ? 'text-indigo-600'
                                                : 'text-gray-500 group-hover:text-gray-800'
                                            }`}></i>
                                    </div>

                                    {/* Text with smooth appearance */}
                                    {!isSidebarCollapsed && (
                                        <span className="ml-4 whitespace-nowrap transition-all duration-300 animate-fade-in">
                                            {item.name}
                                        </span>
                                    )}

                                    {/* Enhanced tooltip for collapsed state */}
                                    {isSidebarCollapsed && (
                                        <div className={`absolute left-full ml-3 w-max px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-xl z-50 transition-all duration-200 ${hoveredItem === item.name
                                                ? 'opacity-100 scale-100 translate-x-0'
                                                : 'opacity-0 scale-95 -translate-x-2 pointer-events-none'
                                            }`}>
                                            {item.name}
                                            <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-0 border-r-4 border-r-gray-900 border-t-transparent border-b-transparent"></div>
                                        </div>
                                    )}

                                    {/* Enhanced Analyze Button with better positioning */}
                                    {!isSidebarCollapsed && activeMenu === item.name && !['Dashboard', 'Settings'].includes(item.name) && (
                                        <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold py-1.5 px-4 rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 animate-pulse-slow z-10">
                                            <span className="flex items-center space-x-1">
                                                <i className="fa-solid fa-chart-line text-xs"></i>
                                                <span>Analyze</span>
                                            </span>
                                        </button>
                                    )}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Info section with smooth collapse */}
                    {!isSidebarCollapsed && (
                        <div className="px-3 pt-4 mt-6 border-t border-gray-200 animate-fade-in">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                <p className="text-xs text-blue-700 font-medium">
                                    <i className="fa-solid fa-lightbulb mr-1"></i>
                                    Click on a category to get an AI-powered analysis of your profile.
                                </p>
                            </div>
                        </div>
                    )}
                </nav>

                {/* Enhanced User Profile Section */}
                <div className="p-4 border-t border-gray-200">
                    <details className="group">
                        <summary className={`flex items-center list-none cursor-pointer p-2 rounded-xl hover:bg-gray-50 transition-all duration-300 ${isSidebarCollapsed ? 'justify-center' : ''
                            }`}>
                            <div className={`relative transition-all duration-300 ${isSidebarCollapsed ? 'scale-110' : 'scale-100'
                                }`}>
                                <img
                                    src={user ? user.profilePicture : "https://placehold.co/40x40/E9D5FF/4F46E5?text=AC"}
                                    alt="User profile"
                                    className="h-10 w-10 rounded-full border-2 border-transparent group-hover:border-indigo-300 transition-all duration-300 flex-shrink-0 shadow-sm"
                                />
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>

                            {!isSidebarCollapsed && (
                                <>
                                    <div className="ml-3 overflow-hidden flex-1 min-w-0 animate-fade-in">
                                        <p className="text-sm font-semibold text-gray-800 truncate">{user ? user.name : 'Guest User'}</p>
                                        <p className="text-xs text-gray-500 truncate">{user ? user.jobTitle : 'Full Stack Developer'}</p>
                                    </div>
                                    <i className="fa-solid fa-chevron-up ml-2 text-gray-500 transition-transform duration-300 group-open:rotate-180 flex-shrink-0 text-sm"></i>
                                </>
                            )}
                        </summary>

                        {!isSidebarCollapsed && (
                            <div className="mt-2 space-y-1 animate-fade-in">
                                <Link to="/profile" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-all duration-200 group/item">
                                    <i className="fa-solid fa-user w-4 text-center group-hover/item:scale-110 transition-transform"></i>
                                    <span>Profile Settings</span>
                                </Link>
                                <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-all duration-200 group/item">
                                    <i className="fa-solid fa-link w-4 text-center group-hover/item:scale-110 transition-transform"></i>
                                    <span>Manage Links</span>
                                </a>
                                <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-all duration-200 group/item">
                                    <i className="fa-solid fa-share-nodes w-4 text-center group-hover/item:scale-110 transition-transform"></i>
                                    <span>Share Profile</span>
                                </a>
                                {/* ATTACH LOGOUT FUNCTION HERE */}
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg mt-2 group/item"
                                >
                                    <i className="fa-solid fa-arrow-right-from-bracket w-4 text-center group-hover/item:translate-x-0.5 transition-transform"></i>
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        )}
                    </details>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm border-b border-gray-200 z-10">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center">
                            <button
                                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                                className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
                            >
                                <i className="fa-solid fa-bars"></i>
                            </button>
                            <h1 className="ml-4 text-xl font-semibold text-gray-800 hidden sm:block animate-fade-in">
                                CodeFolio Insights Dashboard
                            </h1>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <details className="group [&[open]>summary>i]:-rotate-180">
                                    <summary className="flex items-center gap-2 text-sm cursor-pointer list-none p-2 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-all duration-200">
                                        <span className="font-medium">Last 30 days</span>
                                        <i className="fa-solid fa-chevron-down transition-transform duration-200 text-xs"></i>
                                    </summary>
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-20 animate-fade-in">
                                        <div className="py-1">
                                            <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition-colors">
                                                <i className="fa-solid fa-sun w-4 text-center"></i> Today
                                            </a>
                                            <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition-colors">
                                                <i className="fa-solid fa-clock-rotate-left w-4 text-center"></i> Yesterday
                                            </a>
                                            <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition-colors">
                                                <i className="fa-solid fa-calendar-week w-4 text-center"></i> Last 7 days
                                            </a>
                                            <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition-colors bg-indigo-50 text-indigo-700">
                                                <i className="fa-solid fa-calendar-days w-4 text-center"></i> Last 30 days
                                            </a>
                                            <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition-colors">
                                                <i className="fa-solid fa-chart-column w-4 text-center"></i> This month
                                            </a>
                                            <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition-colors">
                                                <i className="fa-solid fa-sliders w-4 text-center"></i> Custom range
                                            </a>
                                        </div>
                                    </div>
                                </details>
                            </div>
                            <div className="relative hidden sm:block">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="py-1.5 pl-9 pr-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 w-48"
                                />
                                <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                            </div>
                            <div className="relative">
                                <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200 transform hover:scale-105">
                                    <i className="fa-solid fa-bell text-lg"></i>
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
                    {/* Rest of your main content remains the same */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 hover:shadow-lg hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">LeetCode Problems</p>
                                    <h3 className="text-2xl font-bold mt-1">245</h3>
                                    <div className="flex items-center mt-2">
                                        <span className="text-emerald-500 text-sm flex items-center">
                                            <i className="fa-solid fa-arrow-trend-up mr-1"></i>12.5%
                                        </span>
                                        <span className="text-gray-400 text-xs ml-2">vs last month</span>
                                    </div>
                                </div>
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <i className="fa-solid fa-code text-blue-500 text-xl"></i>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 hover:shadow-lg hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">GitHub Commits</p>
                                    <h3 className="text-2xl font-bold mt-1">1,254</h3>
                                    <div className="flex items-center mt-2">
                                        <span className="text-emerald-500 text-sm flex items-center">
                                            <i className="fa-solid fa-arrow-trend-up mr-1"></i>8.3%
                                        </span>
                                        <span className="text-gray-400 text-xs ml-2">vs last month</span>
                                    </div>
                                </div>
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <i className="fa-solid fa-code-commit text-green-500 text-xl"></i>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 hover:shadow-lg hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">LinkedIn Profile Views</p>
                                    <h3 className="text-2xl font-bold mt-1">472</h3>
                                    <div className="flex items-center mt-2">
                                        <span className="text-emerald-500 text-sm flex items-center">
                                            <i className="fa-solid fa-arrow-trend-up mr-1"></i>15.7%
                                        </span>
                                        <span className="text-gray-400 text-xs ml-2">vs last month</span>
                                    </div>
                                </div>
                                <div className="p-3 bg-purple-100 rounded-lg">
                                    <i className="fa-solid fa-eye text-purple-500 text-xl"></i>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 hover:shadow-lg hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Resume Score</p>
                                    <h3 className="text-2xl font-bold mt-1">85/100</h3>
                                    <div className="flex items-center mt-2">
                                        <span className="text-emerald-500 text-sm flex items-center">
                                            <i className="fa-solid fa-arrow-trend-up mr-1"></i>5.3%
                                        </span>
                                        <span className="text-gray-400 text-xs ml-2">vs last month</span>
                                    </div>
                                </div>
                                <div className="p-3 bg-amber-100 rounded-lg">
                                    <i className="fa-solid fa-file-lines text-amber-500 text-xl"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-4 hover:shadow-lg transition-all duration-300">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                                <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">Coding Activity</h2>
                                <div className="flex items-center space-x-2">
                                    <button className="py-1 px-3 text-xs font-medium rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-all duration-200">Monthly</button>
                                    <button className="py-1 px-3 text-xs font-medium rounded-full text-gray-500 hover:bg-gray-100 transition-all duration-200">Weekly</button>
                                    <button className="py-1 px-3 text-xs font-medium rounded-full text-gray-500 hover:bg-gray-100 transition-all duration-200">Daily</button>
                                </div>
                            </div>
                            <div className="h-80">
                                <ReactApexChart type="area" height="100%" width="100%" series={chartSeries.area} options={chartOptions.area} />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 hover:shadow-lg transition-all duration-300">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-semibold text-gray-800">Problem Categories</h2>
                                </div>
                                <div className="h-64">
                                    <ReactApexChart type="donut" height="100%" width="100%" series={chartSeries.donut} options={chartOptions.donut} />
                                </div>
                            </div>
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 hover:shadow-lg transition-all duration-300">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-semibold text-gray-800">Problem Difficulty</h2>
                                </div>
                                <div className="h-40">
                                    <ReactApexChart type="bar" height="100%" width="100%" series={chartSeries.bar} options={chartOptions.bar} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between border-b border-gray-200 p-4">
                            <h2 className="text-lg font-semibold text-gray-800">Top Repositories</h2>
                            <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <th className="px-4 py-3">Repository</th>
                                        <th className="px-4 py-3">Stars</th>
                                        <th className="px-4 py-3">Forks</th>
                                        <th className="px-4 py-3">Last Commit</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {repositories.map((repo) => (
                                        <tr key={repo.name} className="hover:bg-gray-50 transition-colors duration-200">
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 bg-gray-700 text-white rounded-md flex items-center justify-center mr-3">
                                                        <i className="fab fa-github"></i>
                                                    </div>
                                                    <span className="font-medium text-gray-800">{repo.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{repo.stars}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{repo.forks}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{repo.lastCommit}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>

            <style>{`
                @keyframes fade-in-short {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slide-in-right {
                    from { transform: translateX(-10px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                @keyframes pulse-slow {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.02); }
                }
                
                .animate-fade-in-short {
                    animation: fade-in-short 0.3s ease-out forwards;
                }
                
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
                
                .animate-slide-in-right {
                    animation: slide-in-right 0.3s ease-out forwards;
                }
                
                .animate-pulse-slow {
                    animation: pulse-slow 2s infinite;
                }
                
                /* Smooth scrolling */
                .overflow-y-auto {
                    scrollbar-width: thin;
                    scrollbar-color: #cbd5e1 #f1f5f9;
                }
                
                .overflow-y-auto::-webkit-scrollbar {
                    width: 6px;
                }
                
                .overflow-y-auto::-webkit-scrollbar-track {
                    background: #f1f5f9;
                    border-radius: 3px;
                }
                
                .overflow-y-auto::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 3px;
                }
                
                .overflow-y-auto::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
            `}</style>
        </div>
    );
};

export default App;