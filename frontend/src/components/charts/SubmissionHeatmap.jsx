import { useState, useMemo, useEffect } from 'react';
import { getStreaksAndActiveDays, groupDataByMonth, generateCalendarData, getFirstActiveYear, getEnrichedCalendar } from '@/utils/calendar.js';
import { EmptyState } from '@/components/export.js';

const getGreenHeatColor = (count) => {
  if (count <= 0) return 'white';
  if (count === 1) return 'rgb(1, 102, 32)';
  if (count === 2) return 'rgb(16, 153, 50)';
  if (count >= 3 && count <= 5) return 'rgb(40, 194, 68)';
  if (count >= 6) return 'rgb(127, 255, 139)';
  return 'white';
};

const StatCard = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-gray-400 text-[10px] uppercase tracking-wider font-bold">{label}</span>
    <span className="text-gray-900 text-lg font-bold">{value}</span>
  </div>
);

const HeatSquare = ({ day }) => {
  const heatColor = day ? getGreenHeatColor(day.count) : 0;
  return (
    <div
      style={{
        backgroundColor: day ? heatColor : 'transparent',
      }}
      className={`w-3 h-3 rounded-[2px] transition-all duration-300 border ${day ? (day.count > 0 ? 'border border-green-400/10' : 'border border-gray-200') : ''}`}
      title={day ? `${day.count} submissions on ${day.dateString}` : ''}
    />
  );
};

const SubmissionHeatmap = ({ calendar, className }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const { totalContributions, maxStreak, currentStreak } = useMemo(() => getStreaksAndActiveDays(calendar), [calendar]);
  const enrichedCalendar = useMemo(() => getEnrichedCalendar(calendar), [calendar]);
  const firstActiveYear = useMemo(() => getFirstActiveYear(enrichedCalendar), [enrichedCalendar]);

  const years = useMemo(() => {
    if (!enrichedCalendar) return [];
    return Object.keys(enrichedCalendar)
      .sort((a, b) => {
        if (a === 'current') return -1;
        if (b === 'current') return 1;
        return b - a;
      })
      .filter((year) => year >= firstActiveYear);
  }, [enrichedCalendar, firstActiveYear]);

  useEffect(() => {
    if (years.length > 0 && !selectedYear) {
      setSelectedYear(years[0]);
    }
  }, [years, selectedYear]);

  const currentYearData = useMemo(() => {
    if (!enrichedCalendar || !selectedYear) return {};
    return enrichedCalendar[selectedYear] ?? {};
  }, [enrichedCalendar, selectedYear]);

  const monthlyGroups = useMemo(() => {
    if (selectedYear === 'current') {
      const fullData = generateCalendarData(currentYearData, new Date() - 364, new Date());
      return groupDataByMonth(fullData);
    } else {
      const fullYearData = generateCalendarData(currentYearData, new Date(selectedYear, 0, 1), new Date(selectedYear, 11, 31));
      return groupDataByMonth(fullYearData);
    }
  }, [selectedYear, currentYearData]);

  const currentYearTotal = useMemo(() => {
    return Object.values(currentYearData).reduce((sum, count) => sum + count, 0);
  }, [currentYearData]);

  if (!calendar || Object.keys(calendar).length === 0) {
    return <EmptyState message="No submission data available" className={className} />;
  }

  return (
    <div className={`flex flex-col bg-white p-6 rounded-2xl shadow-xl border border-gray-100 font-sans text-gray-800 w-full ${className}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b pb-4 border-gray-100 gap-4">
        <div className="flex flex-wrap gap-8 text-sm font-bold">
          <StatCard label="Total" value={totalContributions} />
          <StatCard label={selectedYear} value={currentYearTotal} />
          <StatCard label="Max Streak" value={maxStreak} />
          <StatCard label="Current Streak" value={currentStreak} />
        </div>

        <div className="flex items-center">
          <select value={selectedYear || ''} onChange={(e) => setSelectedYear(e.target.value)} className="bg-gray-50 border border-gray-200 text-gray-800 text-sm font-bold rounded-xl focus:ring-2 focus:ring-green-500 block w-full p-2.5 outline-none cursor-pointer transition-all">
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex gap-4 min-w-max">
          <div className="flex flex-col justify-between py-1 mr-2 text-[10px] text-gray-500 font-black h-[112px] uppercase">
            <span>Mon</span>
            <span className="invisible">Tue</span>
            <span>Wed</span>
            <span className="invisible">Thu</span>
            <span>Fri</span>
            <span className="invisible">Sat</span>
            <span>Sun</span>
          </div>

          {monthlyGroups.map((month, index) => (
            <div key={`${month.name}-${index}`} className="flex flex-col gap-2">
              <div className="flex gap-1">
                {month.weeks.map((week, wIndex) => (
                  <div key={wIndex} className="flex flex-col gap-1">
                    {week.map((day, dIndex) => (
                      <HeatSquare key={dIndex} day={day} />
                    ))}
                  </div>
                ))}
              </div>
              <span className="text-[10px] font-black text-gray-500 text-center uppercase tracking-widest">{month.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubmissionHeatmap;
