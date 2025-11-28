import ProblemsCard from "../components/ProblemsCard";
import ContestRatingPanel from "../components/ContestRatingPanel";
import Sidebar from "../components/Sidebar.jsx"
import { Code } from "lucide-react";

const CodingDashboard = () => {

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
              </div>
          </div>
      </main>
  </div>
  );
};

export default CodingDashboard;