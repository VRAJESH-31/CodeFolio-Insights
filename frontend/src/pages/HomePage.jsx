import ProblemsCard from "../components/ProblemsCard";
import Sidebar from "../components/Sidebar.jsx"
import BadgeCollection from "../components/BadgeCollection.jsx";
import SubmissionHeatmap from "../components/SubmissionHeatmap.jsx";

const CodingDashboard = () => {

  const badgesDummyData = [
                        {
                            "id": "7848058",
                            "name": "Submission Badge",
                            "shortName": "365 Days Badge",
                            "displayName": "365 Days Badge",
                            "icon": "https://assets.leetcode.com/static_assets/marketing/lg365.png",
                            "creationDate": "2025-08-18",
                            "expired": false,
                            "hoverText": "365 Days Badge",
                            "medal": {
                                "slug": "365-days-badge-all",
                                "config": {
                                    "icon": "https://assets.leetcode.com/static_assets/marketing/lg365.png",
                                    "iconGif": "https://assets.leetcode.com/static_assets/marketing/365_new.gif"
                                }
                            }
                        },
                        {
                            "id": "8027338",
                            "name": "Annual Badge",
                            "shortName": "200 Days Badge 2025",
                            "displayName": "200 Days Badge 2025",
                            "icon": "https://assets.leetcode.com/static_assets/others/lg200.png",
                            "creationDate": "2025-09-05",
                            "expired": false,
                            "hoverText": "200 Days Badge 2025",
                            "medal": {
                                "slug": "200-days-badge-2025",
                                "config": {
                                    "icon": "https://assets.leetcode.com/static_assets/others/lg200.png",
                                    "iconGif": "https://assets.leetcode.com/static_assets/others/200.gif"
                                }
                            }
                        },
                        {
                            "id": "7070959",
                            "name": "Annual Badge",
                            "shortName": "100 Days Badge 2025",
                            "displayName": "100 Days Badge 2025",
                            "icon": "https://assets.leetcode.com/static_assets/others/lg25100.png",
                            "creationDate": "2025-05-16",
                            "expired": false,
                            "hoverText": "100 Days Badge 2025",
                            "medal": {
                                "slug": "100-days-badge-2025",
                                "config": {
                                    "icon": "https://assets.leetcode.com/static_assets/others/lg25100.png",
                                    "iconGif": "https://assets.leetcode.com/static_assets/others/25100.gif"
                                }
                            }
                        },
                        {
                            "id": "6618429",
                            "name": "Annual Badge",
                            "shortName": "50 Days Badge 2025",
                            "displayName": "50 Days Badge 2025",
                            "icon": "https://assets.leetcode.com/static_assets/others/lg2550.png",
                            "creationDate": "2025-03-24",
                            "expired": false,
                            "hoverText": "50 Days Badge 2025",
                            "medal": {
                                "slug": "50-days-badge-2025",
                                "config": {
                                    "icon": "https://assets.leetcode.com/static_assets/others/lg2550.png",
                                    "iconGif": "https://assets.leetcode.com/static_assets/others/2550.gif"
                                }
                            }
                        },
                        {
                            "id": "4857916",
                            "name": "Annual Badge",
                            "shortName": "100 Days Badge 2024",
                            "displayName": "100 Days Badge 2024",
                            "icon": "https://assets.leetcode.com/static_assets/marketing/2024-100-lg.png",
                            "creationDate": "2024-09-05",
                            "expired": false,
                            "hoverText": "100 Days Badge 2024",
                            "medal": {
                                "slug": "100-days-badge-2024",
                                "config": {
                                    "icon": "https://assets.leetcode.com/static_assets/marketing/2024-100-lg.png",
                                    "iconGif": "https://assets.leetcode.com/static_assets/marketing/2024-100-new.gif"
                                }
                            }
                        },
                        {
                            "id": "3763584",
                            "name": "Annual Badge",
                            "shortName": "50 Days Badge 2024",
                            "displayName": "50 Days Badge 2024",
                            "icon": "https://assets.leetcode.com/static_assets/marketing/2024-50-lg.png",
                            "creationDate": "2024-04-20",
                            "expired": false,
                            "hoverText": "50 Days Badge 2024",
                            "medal": {
                                "slug": "50-days-badge-2024",
                                "config": {
                                    "icon": "https://assets.leetcode.com/static_assets/marketing/2024-50-lg.png",
                                    "iconGif": "https://assets.leetcode.com/static_assets/marketing/2024-50.gif"
                                }
                            }
                        },
                        {
                            "id": "2870909",
                            "name": "Annual Badge",
                            "shortName": "50 Days Badge 2023",
                            "displayName": "50 Days Badge 2023",
                            "icon": "https://assets.leetcode.com/static_assets/marketing/lg50.png",
                            "creationDate": "2023-12-16",
                            "expired": false,
                            "hoverText": "50 Days Badge 2023",
                            "medal": {
                                "slug": "50-days-badge-2023",
                                "config": {
                                    "icon": "https://assets.leetcode.com/static_assets/marketing/lg50.png",
                                    "iconGif": "https://assets.leetcode.com/static_assets/marketing/2023-50.gif"
                                }
                            }
                        },
                        {
                            "id": "4458914",
                            "name": "Study Plan V2 Award",
                            "shortName": "Introduction to Pandas",
                            "displayName": "Introduction to Pandas",
                            "icon": "https://assets.leetcode.com/static_assets/others/Introduction_to_Pandas_Badge.png",
                            "creationDate": "2024-07-22",
                            "expired": false,
                            "hoverText": "Introduction to Pandas",
                            "medal": {
                                "slug": "introduction-to-pandas",
                                "config": {
                                    "icon": "https://assets.leetcode.com/static_assets/others/Introduction_to_Pandas_Badge.png",
                                    "iconGif": "https://assets.leetcode.com/static_assets/others/Introduction_to_Pandas.gif"
                                }
                            }
                        }
                    ]
  const dummyHeatmap = {
                    "2025-5-27": 0,
                    "2025-5-28": 0,
                    "2025-5-29": 0,
                    "2025-5-30": 0,
                    "2025-5-31": 0,
                    "2025-6-1": 0,
                    "2025-6-2": 0,
                    "2025-6-3": 0,
                    "2025-6-4": 0,
                    "2025-6-5": 0,
                    "2025-6-6": 0,
                    "2025-6-7": 0,
                    "2025-6-8": 0,
                    "2025-6-9": 0,
                    "2025-6-10": 0,
                    "2025-6-11": 0,
                    "2025-6-12": 4,
                    "2025-6-13": 0,
                    "2025-6-14": 0,
                    "2025-6-15": 0,
                    "2025-6-16": 0,
                    "2025-6-17": 0,
                    "2025-6-18": 0,
                    "2025-6-19": 0,
                    "2025-6-20": 0,
                    "2025-6-21": 0,
                    "2025-6-22": 0,
                    "2025-6-23": 0,
                    "2025-6-24": 0,
                    "2025-6-25": 0,
                    "2025-6-26": 0,
                    "2025-6-27": 2,
                    "2025-6-28": 0,
                    "2025-6-29": 0,
                    "2025-6-30": 0,
                    "2025-7-1": 30,
                    "2025-7-2": 0,
                    "2025-7-3": 0,
                    "2025-7-4": 0,
                    "2025-7-5": 0,
                    "2025-7-6": 0,
                    "2025-7-7": 0,
                    "2025-7-8": 0,
                    "2025-7-9": 0,
                    "2025-7-10": 0,
                    "2025-7-11": 0,
                    "2025-7-12": 0,
                    "2025-7-13": 0,
                    "2025-7-14": 0,
                    "2025-7-15": 0,
                    "2025-7-16": 0,
                    "2025-7-17": 0,
                    "2025-7-18": 0,
                    "2025-7-19": 10,
                    "2025-7-20": 0,
                    "2025-7-21": 0,
                    "2025-7-22": 0,
                    "2025-7-23": 10,
                    "2025-7-24": 0,
                    "2025-7-25": 0,
                    "2025-7-26": 0,
                    "2025-7-27": 0,
                    "2025-7-28": 0,
                    "2025-7-29": 0,
                    "2025-7-30": 0,
                    "2025-7-31": 0,
                    "2025-8-1": 0,
                    "2025-8-2": 10,
                    "2025-8-3": 0,
                    "2025-8-4": 0,
                    "2025-8-5": 0,
                    "2025-8-6": 0,
                    "2025-8-7": 10,
                    "2025-8-8": 0,
                    "2025-8-9": 0,
                    "2025-8-10": 0,
                    "2025-8-11": 0,
                    "2025-8-12": 0,
                    "2025-8-13": 10,
                    "2025-8-14": 0,
                    "2025-8-15": 0,
                    "2025-8-16": 0,
                    "2025-8-17": 0,
                    "2025-8-18": 0,
                    "2025-8-19": 10,
                    "2025-8-20": 0,
                    "2025-8-21": 0,
                    "2025-8-22": 0,
                    "2025-8-23": 0,
                    "2025-8-24": 10,
                    "2025-8-25": 0,
                    "2025-8-26": 0,
                    "2025-8-27": 0,
                    "2025-8-28": 0,
                    "2025-8-29": 0,
                    "2025-8-30": 0,
                    "2025-8-31": 0,
                    "2025-9-1": 0,
                    "2025-9-2": 0,
                    "2025-9-3": 0,
                    "2025-9-4": 0,
                    "2025-9-5": 0,
                    "2025-9-6": 0,
                    "2025-9-7": 0,
                    "2025-9-8": 0,
                    "2025-9-9": 0,
                    "2025-9-10": 0,
                    "2025-9-11": 0,
                    "2025-9-12": 0,
                    "2025-9-13": 0,
                    "2025-9-14": 0,
                    "2025-9-15": 0,
                    "2025-9-16": 0,
                    "2025-9-17": 0,
                    "2025-9-18": 0,
                    "2025-9-19": 0,
                    "2025-9-20": 0,
                    "2025-9-21": 0,
                    "2025-9-22": 0,
                    "2025-9-23": 0,
                    "2025-9-24": 0,
                    "2025-9-25": 0,
                    "2025-9-26": 0,
                    "2025-9-27": 0,
                    "2025-9-28": 0,
                    "2025-9-29": 0,
                    "2025-9-30": 0,
                    "2025-10-1": 0,
                    "2025-10-2": 0,
                    "2025-10-3": 0,
                    "2025-10-4": 0,
                    "2025-10-5": 0,
                    "2025-10-6": 0,
                    "2025-10-7": 0,
                    "2025-10-8": 0,
                    "2025-10-9": 0,
                    "2025-10-10": 0,
                    "2025-10-11": 0,
                    "2025-10-12": 0,
                    "2025-10-13": 0,
                    "2025-10-14": 0,
                    "2025-10-15": 0,
                    "2025-10-16": 0,
                    "2025-10-17": 0,
                    "2025-10-18": 0,
                    "2025-10-19": 0,
                    "2025-10-20": 0,
                    "2025-10-21": 0,
                    "2025-10-22": 0,
                    "2025-10-23": 0,
                    "2025-10-24": 0,
                    "2025-10-25": 0,
                    "2025-10-26": 0,
                    "2025-10-27": 0,
                    "2025-10-28": 0,
                    "2025-10-29": 0,
                    "2025-10-30": 0,
                    "2025-10-31": 0,
                    "2025-11-1": 0,
                    "2025-11-2": 0,
                    "2025-11-3": 0,
                    "2025-11-4": 0,
                    "2025-11-5": 0,
                    "2025-11-6": 0,
                    "2025-11-7": 0,
                    "2025-11-8": 0,
                    "2025-11-9": 0,
                    "2025-11-10": 0,
                    "2025-11-11": 0,
                    "2025-11-12": 0,
                    "2025-11-13": 0,
                    "2025-11-14": 0,
                    "2025-11-15": 0,
                    "2025-11-16": 0,
                    "2025-11-17": 0,
                    "2025-11-18": 0,
                    "2025-11-19": 0,
                    "2025-11-20": 0,
                    "2025-11-21": 0,
                    "2025-11-22": 0,
                    "2025-11-23": 0,
                    "2025-11-24": 0,
                    "2025-11-25": 0,
                    "2025-11-26": 0,
                    "2025-11-27": 0,
                    "2025-11-28": 0
                }

  const animationStyles = `
        @keyframes floatIn {
            0% { opacity: 0; transform: translateY(30px) scale(0.9); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes glowPulse {
            0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.2); }
            50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.4); }
        }
        @keyframes scoreProgress {
            0% { stroke-dashoffset: 283; }
        }
        @keyframes shimmer {
            0% { background-position: -200px 0; }
            100% { background-position: 200px 0; }
        }
        @keyframes bounceIn {
            0% { transform: scale(0.3); opacity: 0; }
            50% { transform: scale(1.05); }
            70% { transform: scale(0.9); }
            100% { transform: scale(1); opacity: 1; }
        }
        .animate-float-in { animation: floatIn 0.6s ease-out forwards; }
        .animate-glow-pulse { animation: glowPulse 3s ease-in-out infinite; }
        .animate-score-progress { animation: scoreProgress 2s ease-out forwards; }
        .animate-shimmer {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
            background-size: 200px 100%;
            animation: shimmer 3s infinite;
        }
        .animate-bounce-in { animation: bounceIn 1s ease-out forwards; }
    `;

  return (
    <div className="flex h-screen bg-gradient-to-br from-green-50/30 via-white to-blue-50/30 font-sans">
      <style>{animationStyles}</style>

      <Sidebar
          isSidebarCollapsed={false}
          activeMenu="GitHub"
          setActiveMenu={() => { }}
          user={{ name: 'John Doe', jobTitle: 'Developer' }}
          handleLogout={() => alert('Logged out')}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4 animate-float-in">
              <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                  Coding Progress Dashboard
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Aggregated stats from multiple competitive platforms.
              </p>
          </div>

          <div className="space-y-8">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2">
                    <BadgeCollection badges={badgesDummyData}/>
                  </div>
                  <div>
                    <ProblemsCard 
                      title="Fundamentals"
                      problemsData={
                        [{ name: 'GFG', value: 92, color: '#10B981' },
                        { name: 'HackerRank', value: 69, color: '#FBBF24' }]
                      }
                    />
                    <ProblemsCard 
                      title="DSA"
                      problemsData={
                        [{ name: 'Easy', value: 23, color: '#10B981' },
                        { name: 'Medium', value: 67, color: '#FBBF24' },
                        { name: 'Hard', value: 156, color: '#FF4524' }]
                      }
                    />
                    <ProblemsCard 
                      title="Competitive Programming"
                      problemsData={
                        [{ name: 'Codechef', value: 200, color: '#10B981' },
                        { name: 'Codeforces', value: 300, color: '#FBBF24' }]
                      }
                    />
                  </div>
                  <SubmissionHeatmap calendar={dummyHeatmap} className="col-span-3"/>
              </div>
          </div>
      </main>
  </div>
  );
};

export default CodingDashboard;