import React, { useState, useMemo, useEffect } from 'react';

const normalizeDayOfWeek = (date) => {
  const day = date.getDay();
  return day === 0 ? 6 : day - 1;
};

// Generates a complete list of days for the given year to ensure the heatmap is dense and accurate
const generateFullYearData = (year, calendarData) => {
  if (!year) return [];
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);
  const days = [];

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    // Format key as YYYY-MM-DD to match the input data keys
    const isoDate = d.toISOString().split('T')[0];
    // We also need to construct the key manually to be safe with timezone offsets if input keys are local string based,
    // but assuming standard ISO strings from the previous step:
    const y = d.getFullYear(); // Should match year
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dayOfMonth = String(d.getDate()).padStart(2, '0');
    const key = `${y}-${m}-${dayOfMonth}`;

    days.push({
      date: new Date(d),
      count: calendarData[key] || 0,
      dateString: key
    });
  }
  return days;
};

// Groups the linear list of days into Months, and then Weeks within those Months
const groupDataByMonth = (days) => {
  const months = [];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Group by Month Index (0-11)
  const daysByMonth = {};
  days.forEach(day => {
    const mIndex = day.date.getMonth();
    if (!daysByMonth[mIndex]) daysByMonth[mIndex] = [];
    daysByMonth[mIndex].push(day);
  });

  Object.keys(daysByMonth).sort((a, b) => a - b).forEach(mIndex => {
    const monthDays = daysByMonth[mIndex];
    if (monthDays.length === 0) return;

    const weeks = [];
    let currentWeek = Array(7).fill(null);

    monthDays.forEach(dayObj => {
      const dayOfWeek = normalizeDayOfWeek(dayObj.date);
      currentWeek[dayOfWeek] = dayObj;

      if (dayOfWeek === 6) { // Sunday, end of week
        weeks.push(currentWeek);
        currentWeek = Array(7).fill(null);
      }
    });

    // Push last partial week if it has any data
    if (currentWeek.some(d => d !== null)) {
      weeks.push(currentWeek);
    }

    months.push({
      name: monthNames[mIndex],
      weeks: weeks
    });
  });

  return months;
};


const getColorClass = (count) => {
  if (count === 0) return 'bg-gray-100';
  if (count <= 2) return 'bg-green-100';
  if (count <= 4) return 'bg-green-300';
  if (count <= 8) return 'bg-green-500';
  return 'bg-green-700';
};

const getBorderClass = (count) => {
  return 'border-gray-400';
};

const calculateOverallStats = (calendar) => {
  if (!calendar) return { totalSubmissions: 0, maxStreak: 0, currentStreak: 0 };

  let totalSubmissions = 0;
  const allDates = [];
  const allDataMap = {};

  Object.values(calendar).forEach(yearData => {
    Object.entries(yearData).forEach(([dateStr, count]) => {
      if (count > 0) {
        totalSubmissions += count;
        allDataMap[dateStr] = count;
        allDates.push(new Date(dateStr));
      }
    });
  });

  allDates.sort((a, b) => a - b);

  let maxStreak = 0;
  let currentRun = 0;
  let prevDate = null;

  for (const date of allDates) {
    if (!prevDate) {
      currentRun = 1;
    } else {
      const diffTime = Math.abs(date - prevDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays === 1) currentRun += 1;
      else if (diffDays > 1) currentRun = 1;
    }
    if (currentRun > maxStreak) maxStreak = currentRun;
    prevDate = date;
  }

  // Calculate Current Streak
  let currentStreak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today

  // Format helper
  const formatDateKey = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  // Check today and backwards
  let checkDate = new Date(today);
  if (allDataMap[formatDateKey(checkDate)]) {
    currentStreak++;
  }
  // Ideally check yesterday if today has no submission but streak is still valid? 
  // Standard simple streak: strict contiguous days including today? 
  // Or allowed to miss today if it's not over yet? 
  // Let's assume strict backwards search from yesterday if today is 0.
  if (currentStreak === 0) {
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (allDataMap[formatDateKey(yesterday)]) {
      checkDate = yesterday;
      currentStreak = 1;
    }
  }

  if (currentStreak > 0) {
    while (true) {
      checkDate.setDate(checkDate.getDate() - 1);
      if (allDataMap[formatDateKey(checkDate)]) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  return { totalSubmissions, maxStreak, currentStreak };
};

const SubmissionHeatmap = ({ calendar, className, title }) => {
  const [selectedYear, setSelectedYear] = useState(null);

  const years = useMemo(() => {
    if (!calendar) return [];
    return Object.keys(calendar).sort((a, b) => b - a);
  }, [calendar]);

  useEffect(() => {
    if (years.length > 0 && !selectedYear) {
      setSelectedYear(years[0]);
    }
  }, [years, selectedYear]);

  const globalStats = useMemo(() => calculateOverallStats(calendar), [calendar]);

  const currentYearData = useMemo(() => {
    if (!calendar || !selectedYear) return {};
    return calendar[selectedYear] || {};
  }, [calendar, selectedYear]);

  // Generate full year dense data and render-ready structure
  const monthlyGroups = useMemo(() => {
    const fullYearData = generateFullYearData(selectedYear, currentYearData);
    return groupDataByMonth(fullYearData);
  }, [selectedYear, currentYearData]);

  const currentYearTotal = useMemo(() => {
    return Object.values(currentYearData).reduce((sum, count) => sum + count, 0);
  }, [currentYearData]);

  if (!calendar || Object.keys(calendar).length === 0) {
    return (
      <div className={`bg-white p-6 rounded-xl shadow-lg border border-gray-200 w-full ${className} flex justify-center items-center h-48 text-gray-400`}>
        {title && <h3 className="text-xl font-bold text-gray-800 mb-4 absolute top-4 left-6">{title}</h3>}
        No submission data available
      </div>
    )
  }

  return (
    <div className={`flex flex-col bg-white p-4 rounded-xl shadow-lg border border-gray-200 font-sans text-gray-800 w-full ${className}`}>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 border-b pb-2 border-gray-200 gap-4">

        {/* Stats */}
        <div className="flex flex-wrap gap-10 text-sm font-medium">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs uppercase tracking-wider">Total Submissions</span>
            <span className="text-gray-900 text-lg">{globalStats.totalSubmissions}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs uppercase tracking-wider">Submissions ({selectedYear})</span>
            <span className="text-gray-900 text-lg">{currentYearTotal}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs uppercase tracking-wider">Max Streak</span>
            <span className="text-gray-900 text-lg">{globalStats.maxStreak}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs uppercase tracking-wider">Current Streak</span>
            <span className="text-gray-900 text-lg">{globalStats.currentStreak}</span>
          </div>
        </div>

        {/* Year Dropdown */}
        <div className="flex items-center">
          <select
            value={selectedYear || ''}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 outline-none cursor-pointer"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Heatmap Container */}
      <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex gap-4 min-w-max">
          {/* Render Labels for Weeks (Optional, vertical labels Mon/Wed/Fri?) 
                 Standard heatmaps often don't label every day row in this view, or just Mon/Wed/Fri.
                 Let's stick to simple or no row labels if space corresponds to Month blocks.
                 Let's add a small legend column on the left if needed, but per Month-Group request, sticky labels are tricky.
                 We'll omit row labels (Mon-Sun) to keep it clean, or put them sticky on left. 
                 User didn't strictly ask for row labels, but "render each block at correct day".
                 Let's rely on tooltip for exact day.
             */}

          {/* Left Sticky Day Labels (Optional) */}
          <div className="flex flex-col justify-between py-1 mr-2 text-[10px] text-gray-400 font-medium h-[112px]">
            {/* h-112px approx 7 * 12px gap + ... calculated: 7 * (12px height + 4px gap) = 7*16 = 112px */}
            <span>Mon</span>
            <span className="invisible">Tue</span>
            <span>Wed</span>
            <span className="invisible">Thu</span>
            <span>Fri</span>
            <span className="invisible">Sat</span>
            <span>Sun</span>
          </div>

          {monthlyGroups.map((month) => (
            <div key={month.name} className="flex flex-col gap-2">
              {/* The Seven-Row Grid for this Month */}
              <div className="flex gap-1">
                {month.weeks.map((week, wIndex) => (
                  <div key={wIndex} className="flex flex-col gap-1">
                    {week.map((day, dIndex) => (
                      <div
                        key={dIndex}
                        className={`w-3 h-3 rounded-[2px] border transition-colors duration-200 ${day ? `${getColorClass(day.count)} ${getBorderClass(day.count)}` : 'bg-transparent border-transparent'}`}
                        title={day ? `${day.count} submissions on ${day.dateString}` : ''}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Month Name Below */}
              <span className="text-xs font-semibold text-gray-500 text-center">{month.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
          .custom-scrollbar::-webkit-scrollbar {
              height: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
              background: #f1f5f9;
              border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #cbd5e1;
              border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #94a3b8;
          }
      `}</style>
    </div>
  );
};

export default SubmissionHeatmap;