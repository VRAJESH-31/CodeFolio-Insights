const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const formatDate = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export const getStreaksAndActiveDays = (calendar) => {

  const allDates = Object.values(calendar)
    .flatMap(yearData => Object.keys(yearData))
    .sort((a, b) => new Date(a) - new Date(b));

  if (allDates.length === 0) {
    return { currentStreak: 0, maxStreak: 0, activeDays: 0, totalContributions: 0 };
  }

  let maxStreak = 0;
  let currentStreak = 0;
  let tempStreak = 0;
  let activeDays = 0;
  let totalContributions = 0;

  for (let i = 0; i < allDates.length; i++) {
    const dailyContribution = calendar[new Date(allDates[i]).getFullYear()][allDates[i]];

    if (dailyContribution > 0) {
      activeDays++;
      totalContributions += dailyContribution;
      tempStreak++;
    } else {
      tempStreak = 0;
    }

    maxStreak = Math.max(maxStreak, tempStreak);

    if (new Date().toISOString().split('T')[0] === allDates[i]) {
      currentStreak = tempStreak;
    }
  }

  return {
    currentStreak,
    maxStreak,
    activeDays,
    totalContributions
  };
};

export const getFirstActiveYear = (calendar) => {
  const years = Object.keys(calendar).map(Number).sort((a, b) => a - b);
  for (const year of years) {
    if (Object.values(calendar[year]).some(count => count > 0)) return year;
  }
  return new Date().getFullYear();
};

export const getCombinedHeatmap = (...heatmaps) => {
  const combinedHeatmap = {};

  for (const heatmap of heatmaps) {
    if (!heatmap) continue;

    for (const year in heatmap) {
      if (Object.hasOwnProperty.call(heatmap, year)) {
        if (!combinedHeatmap[year]) {
          combinedHeatmap[year] = {};
        }
        const yearData = heatmap[year];
        for (const date in yearData) {
          if (Object.hasOwnProperty.call(yearData, date)) {
            const count = yearData[date];
            if (combinedHeatmap[year][date]) {
              combinedHeatmap[year][date] += count;
            } else {
              combinedHeatmap[year][date] = count;
            }
          }
        }
      }
    }
  }
  return combinedHeatmap;
};

export const normalizeDayOfWeek = (date) => {
  const day = date.getDay();
  return day === 0 ? 6 : day - 1;
};

export const generateCalendarData = (calendarData, startDate, endDate) => {
  const days = [];

  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    const key = formatDate(d);

    days.push({
      date: new Date(d),
      count: calendarData[key] || 0,
      dateString: key
    });
  }
  return days;
};

export const groupDataByMonth = (days) => {
    const months = [];
    let currentMonth = { name: '', weeks: [] };
    let currentWeek = Array(7).fill(null);

    days.forEach((dayObj) => {
        const monthName = MONTH_NAMES[dayObj.date.getMonth()];
        const dayOfWeek = dayObj.date.getDay() === 0 ? 6 : dayObj.date.getDay() - 1;

        if (monthName !== currentMonth.name) {
            if (currentMonth.name) months.push(currentMonth);
            currentMonth = { name: monthName, weeks: [] };
        }

        currentWeek[dayOfWeek] = dayObj;
        if (dayOfWeek === 6 || dayObj === days[days.length - 1]) {
            currentMonth.weeks.push([...currentWeek]);
            currentWeek = Array(7).fill(null);
        }
    });
    
    months.push(currentMonth);
    return months;
};

export const getEnrichedCalendar = (calendar) => {
    if (!calendar) return null;
    const currentYear = String(new Date().getFullYear());
    const previousYear = String(Number(currentYear) - 1);

    const enriched = { ...calendar };

    if (calendar[currentYear]) {
        const merged = { ...(calendar[previousYear] || {}), ...calendar[currentYear] };
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const cutoff = new Date(today);
        cutoff.setDate(cutoff.getDate() - 364);

        const currentData = {};
        Object.entries(merged).forEach(([dateStr, count]) => {
            const d = new Date(dateStr);
            if (d >= cutoff && d <= today) {
                currentData[dateStr] = count;
            }
        });
        enriched.current = currentData;
    }

    return enriched;
};