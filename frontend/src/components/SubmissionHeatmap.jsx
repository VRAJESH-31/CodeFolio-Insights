// src/components/SubmissionHeatmap.jsx
import React from 'react';

// --- Helper Functions and Data Processing (Modified) ---

/**
 * Normalizes day of the week: 0 (Mon) to 6 (Sun).
 * Date.getDay() returns 0 (Sun) to 6 (Sat).
 */
const normalizeDayOfWeek = (date) => {
  const day = date.getDay();
  return day === 0 ? 6 : day - 1;
};

/**
 * Transforms the input object {dateString: count} into a sorted array of objects
 * {date: Date, count: number}.
 * @param {Object<string, number>} calendarObject - The input data object.
 * @returns {Array<{date: Date, count: number}>} A sorted array of calendar entries.
 */
const transformAndSortData = (calendarObject) => {
  if (!calendarObject || Object.keys(calendarObject).length === 0) return [];
  
  const transformedData = Object.entries(calendarObject).map(([dateString, count]) => ({
    date: new Date(dateString),
    count: count,
  }));

  // Sort data chronologically
  return transformedData.sort((a, b) => a.date - b.date);
};


/**
 * Processes the flat data array into a grid structure (rows=days, columns=weeks).
 * @param {Array<{date: Date, count: number}>} data - The calendar array.
 * @returns {Array<Array<Object | null>>} A 2D array representing the heatmap grid.
 */
const processDataForHeatmap = (data) => {
  if (!data || data.length === 0) return Array.from({ length: 7 }, () => []);

  // 1. Initialize a 7-row array for Mon-Sun
  const weeks = Array.from({ length: 7 }, () => []);
  
  const firstDay = data[0].date;

  // 2. Calculate padding for the first week
  const startPadding = normalizeDayOfWeek(firstDay);

  // Pad the start of the first week column
  for (let i = 0; i < startPadding; i++) {
    weeks[i].push(null);
  }

  // 3. Populate the grid
  data.forEach(day => {
    const normalizedDayIndex = normalizeDayOfWeek(day.date);
    weeks[normalizedDayIndex].push(day);
  });

  // 4. Pad the last week column to ensure all rows are the same length
  const lastWeekLength = weeks[0].length;
  for (let i = 0; i < 7; i++) {
    while (weeks[i].length < lastWeekLength) {
      weeks[i].push(null);
    }
  }

  return weeks;
};

/**
 * Calculates month labels and their starting column index.
 */
const getMonthLabels = (data) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const labels = [];
  let currentMonthIndex = -1;
  
  if (data.length === 0) return [];
  
  const firstDay = data[0].date;

  for (let i = 0; i < data.length; i++) {
    const day = data[i].date;
    
    if (day.getMonth() !== currentMonthIndex) {
        // Calculate the column index (week number)
        // Days Passed = Index in the array
        const daysPassed = i;
        // Total slots passed including initial padding
        const totalSlots = daysPassed + normalizeDayOfWeek(firstDay); 
        const column = Math.floor(totalSlots / 7);
        
        labels.push({
            name: months[day.getMonth()],
            column: column, 
        });
        currentMonthIndex = day.getMonth();
    }
  }
  return labels;
};


// Determine color based on submission count (Light Mode)
const getColorClass = (count) => {
  if (count === 0) return 'bg-gray-200';
  if (count <= 4) return 'bg-green-300';
  if (count <= 9) return 'bg-green-500';
  if (count <= 14) return 'bg-green-600';
  return 'bg-green-700';
};

// --- Component Definition ---

/**
 * @param {{calendar: Object<string, number>, className: String}} props 
 */
const SubmissionHeatmap = ({ calendar, className }) => {
  
  // 1. Transform and sort the incoming object data
  const processedCalendar = transformAndSortData(calendar);

  // 2. Process data for the 7-day row heatmap grid
  const weeks = processDataForHeatmap(processedCalendar);
  const monthLabels = getMonthLabels(processedCalendar);

  // Placeholder stats for the header
  const totalSubmissions = processedCalendar.reduce((sum, day) => sum + day.count, 0);

  // Heatmap constants
  const cellWidth = 20; 

  return (
    <div className={`flex flex-col bg-white p-6 rounded-xl shadow-lg border border-gray-200 font-sans text-gray-800 w-full  ${className}`}>
      
      {/* Header with stats and navigation */}
      <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200">
        <div className="flex space-x-4 text-sm font-medium">
          <span className="text-gray-900">Submissions <span className="text-green-600">{totalSubmissions}</span></span>
          {/* <span className="text-gray-900">Max.Streak <span className="text-green-600">{maxStreak}</span></span>
          <span className="text-gray-900">Current.Streak <span className="text-green-600">{currentStreak}</span></span> */}
        </div>
        {/* <div className="flex items-center space-x-2">
          Dropdown for year/period selection
          <select className="bg-gray-100 text-gray-700 rounded px-3 py-1 text-sm border border-gray-300 appearance-none pr-8">
            <option>Current</option>
          </select>
          Navigation Arrows
          <div className="flex space-x-1">
            <button className="bg-gray-100 p-1 rounded text-gray-500 hover:bg-gray-200 transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
            </button>
            <button className="bg-gray-100 p-1 rounded text-gray-500 hover:bg-gray-200 transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
            </button>
          </div>
        </div> */}
      </div>
      
      {/* Heatmap Grid */}
      <div className="flex overflow-x-auto pb-2 scrollbar-hide ">
        
        {/* Day labels (Y-axis: Mon, Wed, Fri, Sun) */}
        <div className="flex flex-col justify-between text-xs text-gray-500 mr-2 py-1 h-full">
            <span>Mon</span>
            <span></span>
            <span>Wed</span>
            <span></span>
            <span>Fri</span>
            <span></span>
            <span>Sun</span>
        </div>
        
        {/* Main Grid Area */}
        <div className="flex space-x-1">
          {/* Iterate over columns (weeks) */}
          {weeks[0].map((_, colIndex) => (
            <div key={colIndex} className="flex flex-col space-y-1">
              {/* Iterate over rows (days Mon-Sun) */}
              {weeks.map((dayRow, rowIndex) => {
                const day = dayRow[colIndex];
                const dateString = day?.date?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) || 'No Data';
                
                return (
                  <div
                    key={`${colIndex}-${rowIndex}`}
                    className={`w-4 h-4 rounded-sm transition duration-150 ${day ? getColorClass(day.count) : 'bg-gray-100'}`}
                    title={day ? `${day.count} submissions on ${dateString}` : 'No submissions'}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Month Labels */}
      <div className="flex justify-start text-xs text-gray-500 mt-2 relative overflow-x-hidden">
        {monthLabels.map((month, index) => {
          const leftOffset = month.column * cellWidth; 
          return (
            <span key={index} className="absolute" style={{ left: `${leftOffset}px` }}>
              {month.name}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default SubmissionHeatmap;