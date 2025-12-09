import ProblemsCard from "../components/ProblemsCard";
import Sidebar from "../components/Sidebar.jsx"
import BadgeCollection from "../components/BadgeCollection.jsx";
import SubmissionHeatmap from "../components/SubmissionHeatmap.jsx";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance.js";
import conf from "../config/config.js"
import useAuthStore from "../../store/useAuthStore.js";


const CodingDashboard = () => {

    const [data, setData] = useState(null);
    const user = useAuthStore((state)=>state.user);

    const fetchCodingProfilesData = async () => {
        console.log("started");
        const res = await axiosInstance.get(`${conf.SERVER_BASE_URL}/profiles/fetch/${user.username}`);
        console.log("ended");
        setData(res.data);
        console.log(res.data);
    }

    /**
     * Polishes a heatmap by ensuring the month and day parts of the date keys are two digits (zero-padded).
     *
     * @param {Object<string, number>} heatmap - The input heatmap object with keys in the format YYYY-M-D or YYYY-MM-DD.
     * @returns {Object<string, number>} A new heatmap object with polished keys in the format YYYY-MM-DD.
     */
    const getPolishedCodechefHeatmap = (heatmap) => {
        // Initialize an empty object for the polished heatmap
        const polishedHeatmap = {};

        // Iterate over each key (date) in the input heatmap
        for (const date in heatmap) {
            if (Object.hasOwnProperty.call(heatmap, date)) {
                // Split the date string into its components: Year, Month, and Day
                const parts = date.split('-');
                
                // Check if the date string has exactly three parts (Year, Month, Day)
                if (parts.length === 3) {
                    const year = parts[0];
                    const month = parts[1];
                    const day = parts[2];

                    // Function to add a leading zero if the number part is a single digit
                    const zeroPad = (numStr) => {
                        // Convert to number, then back to string to handle '03' -> '3' correctly
                        const num = parseInt(numStr, 10); 
                        // Use String.prototype.padStart() for efficient zero padding
                        return num.toString().padStart(2, '0');
                    };

                    // Apply zero-padding to the month and day parts
                    const polishedMonth = zeroPad(month);
                    const polishedDay = zeroPad(day);

                    // Reconstruct the date string in the desired YYYY-MM-DD format
                    const polishedDate = `${year}-${polishedMonth}-${polishedDay}`;

                    // Assign the original count to the new, polished date key
                    polishedHeatmap[polishedDate] = heatmap[date];
                } else {
                    // If the date format is unexpected, copy the key/value as is 
                    // (or you could choose to throw an error/skip it)
                    polishedHeatmap[date] = heatmap[date]; 
                }
            }
        }

        return polishedHeatmap;
    };

    const getPolishedGithubHeatmap = (githubData) => {
        // Helper function to ensure month and day strings are zero-padded (e.g., '3' -> '03').
        const zeroPad = (numStr) => {
            const num = parseInt(numStr, 10);
            return num.toString().padStart(2, '0');
        };

        const polishedHeatmap = {};

        // 1. Iterate through each week object in the top-level array
        for (const week of githubData) {
            // We only care about the contributionDays array inside the week object
            const days = week.contributionDays;

            if (!days || !Array.isArray(days)) {
                console.warn("Skipping a week object: 'contributionDays' array not found or invalid.");
                continue;
            }

            // 2. Iterate through each day object in the contributionDays array
            for (const day of days) {
                const { contributionCount, date } = day;

                if (contributionCount === undefined || !date) {
                    console.warn("Skipping day object: missing contributionCount or date.");
                    continue;
                }

                // 3. Split and polish the date string (e.g., "2025-5-13" -> "2025-05-13")
                const parts = date.split('-');

                if (parts.length === 3) {
                    const year = parts[0];
                    const month = parts[1];
                    const dayOfMonth = parts[2];

                    // Apply zero-padding
                    const polishedMonth = zeroPad(month);
                    const polishedDay = zeroPad(dayOfMonth);

                    // Reconstruct the date string in the desired YYYY-MM-DD format
                    const polishedDate = `${year}-${polishedMonth}-${polishedDay}`;

                    // 4. Store the data in the result object
                    polishedHeatmap[polishedDate] = contributionCount;
                } else {
                    console.warn(`Skipping date: Unexpected date format '${date}'`);
                }
            }
        }

        return polishedHeatmap;
    };

    const getCombinedHeatmap = (...heatmaps) => {
        // Initialize an empty object for the combined heatmap
        const combinedHeatmap = {};

        // Iterate over each heatmap object provided in the input
        for (const heatmap of heatmaps) {
            // Iterate over each key-value pair (date and count) in the current heatmap
            for (const date in heatmap) {
                if (Object.hasOwnProperty.call(heatmap, date)) {
                    const count = heatmap[date];

                    // Check if the date already exists in the combined heatmap
                    if (combinedHeatmap[date]) {
                        // If the date exists, add the new count to the existing total (Requirement 3)
                        combinedHeatmap[date] += count;
                    } else {
                        // If the date does not exist, add it to the combined heatmap (Requirement 2)
                        combinedHeatmap[date] = count;
                    }
                }
            }
        }

        // Return the final combined heatmap object
        return combinedHeatmap;
    };

    /**
     * Generates a mapping for the last 365 days, filling in submission counts 
     * from the input data and defaulting to 0 for missing dates.
     * * @param {string} dataString - A JSON string representing the object {timestamp: submissionCount} (timestamps in seconds).
     * @returns {Object<string, number>} - A date-ordered object with {date: submissionCount} for the last 365 days.
     */
    function getPolishedLeetcodeHeatmap(tempTimestampData) {
        let rawTimestampData;
        
        try {
            rawTimestampData = {};

            // Convert raw data into a Map keyed by YYYY-MM-DD (UTC) for easy lookup
            for (const timestampStr in tempTimestampData) {
                const submissions = tempTimestampData[timestampStr];
                
                // Convert seconds to milliseconds
                const milliseconds = parseInt(timestampStr) * 1000;
                const date = new Date(milliseconds);
                
                // Format the date to YYYY-MM-DD (UTC)
                const dateString = date.toISOString().slice(0, 10);
                
                // If the same date appears twice (shouldn't happen with day-start timestamps, 
                // but good practice): sum the submissions.
                rawTimestampData[dateString] = (rawTimestampData[dateString] || 0) + submissions;
            }

        } catch (error) {
            console.error("Error parsing JSON:", error);
            return {}; 
        }

        // 2. Generate the full 365-day range and merge data
        const completeDateMapping = {};
        const today = new Date();
        
        // Set today to the start of the day in UTC for consistent dating
        today.setUTCHours(0, 0, 0, 0); 

        for (let i = 0; i < 365; i++) {
            // Create a date object for the day 'i' days ago
            const dateToCheck = new Date(today);
            dateToCheck.setUTCDate(today.getUTCDate() - i); 

            // Format the date to YYYY-MM-DD (This is correct because 'dateToCheck' is already UTC-aligned)
            const dateString = dateToCheck.toISOString().slice(0, 10);

            // Check if the date exists in the input data
            const submissions = rawTimestampData[dateString] || 0; // Default to 0 if missing

            // Store in the final, ordered object
            completeDateMapping[dateString] = submissions;
        }
        
        // Note: In modern JavaScript environments (ES2015+), insertion order is guaranteed 
        // for string keys, so the map will be ordered from oldest (364 days ago) to newest (today).
        // If you need the output strictly sorted from NEWEST to OLDEST, 
        // you would need to convert this object to an array and sort it manually.
        
        return completeDateMapping;
    }

    useEffect(()=>{
        // fetchCodingProfilesData();
        setData(dummyCodingPlatformsData);
    }, []);

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
                    {data && <BadgeCollection badges={data.leetcode.badges.badges}/>}
                  </div>
                 {data && <div>
                    <ProblemsCard 
                      title="GFG Fundamentals"
                      problemsData={
                        [{ name: 'School', value: (data.gfg?.profile?.problemsSolved?.School || 0), color: '#10B981' },
                        { name: 'Basic', value: (data.gfg?.profile?.problemsSolved?.Basic || 0), color: '#FBBF24' },]
                      }
                    />
                    <ProblemsCard 
                      title="DSA"
                      problemsData={
                        [{ name: 'Easy', value: (data.leetcode?.problems?.acSubmissionNum[1]?.count || 0) + (data.interviewbit?.profile?.problemsSolved?.Easy || 0) + (data.gfg?.problemsSolved?.Easy || 0), color: '#10B981' },
                        { name: 'Medium', value: (data.leetcode?.problems?.acSubmissionNum[2]?.count || 0) + (data.interviewbit?.profile?.problemsSolved?.Medium || 0) + (data.gfg?.problemsSolved?.Medium || 0), color: '#FBBF24' },
                        { name: 'Hard', value: (data.leetcode?.problems?.acSubmissionNum[3]?.count || 0) + (data.interviewbit?.profile?.problemsSolved?.Hard || 0) + (data.gfg?.problemsSolved?.Hard || 0), color: '#FF4524' }]
                      }
                    />
                    <ProblemsCard 
                      title="Competitive Programming"
                      problemsData={
                        [{ name: 'Codechef', value: (data.codechef?.profile?.problemsSolved || 0), color: '#10B981' },]
                      }
                    />
                  </div>}   
                  {data && <SubmissionHeatmap calendar={getCombinedHeatmap(getPolishedLeetcodeHeatmap(JSON.parse(data.leetcode.submission.submissionCalendar)), getPolishedCodechefHeatmap(data.codechef.submission), getPolishedGithubHeatmap(data.github.calendar))} className="col-span-3"/>}
              </div>
          </div>
      </main>
  </div>
  );
};

export default CodingDashboard;