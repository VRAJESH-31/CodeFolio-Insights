import { useState, useMemo, useEffect } from 'react';

const normalizeDayOfWeek = (date) => {
  const day = date.getDay();
  return day === 0 ? 6 : day - 1;
};

const generateFullYearData = (year, calendarData) => {
  if (!year) return [];
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);
  const days = [];

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const y = d.getFullYear();
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

const groupDataByMonth = (days) => {
  const months = [];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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

      if (dayOfWeek === 6) {
        weeks.push(currentWeek);
        currentWeek = Array(7).fill(null);
      }
    });

    if (currentWeek.some(d => d !== null)) weeks.push(currentWeek);

    months.push({ name: monthNames[mIndex], weeks });
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

  let currentStreak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const formatDateKey = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  let checkDate = new Date(today);
  if (allDataMap[formatDateKey(checkDate)]) {
    currentStreak++;
  }

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
      if (allDataMap[formatDateKey(checkDate)]) currentStreak++;
      else break;
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

  const monthlyGroups = useMemo(() => {
    const fullYearData = generateFullYearData(selectedYear, currentYearData);
    return groupDataByMonth(fullYearData);
  }, [selectedYear, currentYearData]);

  const currentYearTotal = useMemo(() => {
    return Object.values(currentYearData).reduce((sum, count) => sum + count, 0);
  }, [currentYearData]);

  if (!calendar || Object.keys(calendar).length === 0) {
    return (
      <div className={`bg-white p-6 rounded-2xl shadow-xl border border-gray-100 w-full ${className} flex justify-center items-center h-48 text-gray-400 font-bold`}>
        No submission data available
      </div>
    )
  }

  return (
    <div className={`flex flex-col bg-white p-6 rounded-2xl shadow-xl border border-gray-100 font-sans text-gray-800 w-full ${className}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b pb-4 border-gray-100 gap-4">
        <div className="flex flex-wrap gap-8 text-sm font-bold">
          <div className="flex flex-col">
            <span className="text-gray-400 text-[10px] uppercase tracking-wider">Total</span>
            <span className="text-gray-900 text-lg">{globalStats.totalSubmissions}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400 text-[10px] uppercase tracking-wider">{selectedYear}</span>
            <span className="text-gray-900 text-lg">{currentYearTotal}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400 text-[10px] uppercase tracking-wider">Max Streak</span>
            <span className="text-gray-900 text-lg">{globalStats.maxStreak}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400 text-[10px] uppercase tracking-wider">Current Streak</span>
            <span className="text-gray-900 text-lg">{globalStats.currentStreak}</span>
          </div>
        </div>

        <div className="flex items-center">
          <select
            value={selectedYear || ''}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-gray-50 border border-gray-200 text-gray-800 text-sm font-bold rounded-xl focus:ring-2 focus:ring-green-500 block w-full p-2.5 outline-none cursor-pointer transition-all"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex gap-4 min-w-max">
          <div className="flex flex-col justify-between py-1 mr-2 text-[10px] text-gray-400 font-black h-[112px] uppercase">
            <span>Mon</span><span className="invisible">Tue</span><span>Wed</span><span className="invisible">Thu</span><span>Fri</span><span className="invisible">Sat</span><span>Sun</span>
          </div>

          {monthlyGroups.map((month) => (
            <div key={month.name} className="flex flex-col gap-2">
              <div className="flex gap-1">
                {month.weeks.map((week, wIndex) => (
                  <div key={wIndex} className="flex flex-col gap-1">
                    {week.map((day, dIndex) => (
                      <div
                        key={dIndex}
                        className={`w-3 h-3 rounded-[2px] border transition-all duration-300 ${day ? `${getColorClass(day.count)} ${day.count > 0 ? 'border-green-200' : 'border-gray-200'}` : 'bg-transparent border-transparent'}`}
                        title={day ? `${day.count} submissions on ${day.dateString}` : ''}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <span className="text-[10px] font-black text-gray-400 text-center uppercase tracking-widest">{month.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubmissionHeatmap;