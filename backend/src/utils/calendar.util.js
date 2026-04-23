const getNormalizedGithubHeatmap = (githubData) => {
  const zeroPad = (numStr) => {
    const num = parseInt(numStr, 10);
    return num.toString().padStart(2, '0');
  };

  const polishedHeatmap = {};

  if (!githubData) return {};

  for (const week of githubData) {
    const days = week.contributionDays;

    if (!days || !Array.isArray(days)) continue;

    for (const day of days) {
      const { contributionCount, date } = day;

      if (contributionCount === undefined || !date) continue;

      const parts = date.split('-');

      if (parts.length === 3) {
        const year = parts[0];
        const month = parts[1];
        const dayOfMonth = parts[2];

        const polishedMonth = zeroPad(month);
        const polishedDay = zeroPad(dayOfMonth);
        const polishedDate = `${year}-${polishedMonth}-${polishedDay}`;

        polishedHeatmap[polishedDate] = contributionCount;
      }
    }
  }
  return polishedHeatmap;
};

const getStreaksAndActiveDays = (calendar) => {

  const allDates = Object.values(calendar)
    .flatMap(yearData => Object.keys(yearData))
    .sort((a, b) => new Date(a) - new Date(b));

  if (allDates.length === 0) {
    return { currentStreak: 0, maxStreak: 0, activeDays: 0, totalContributions: 0 };
  }

  let maxStreak = 0;
  let currentStreak = 0;
  let tempStreak = 0;
  const activeDays = allDates.filter((date) => calendar[new Date(date).getFullYear()][date] > 0).length;
  const totalContributions = allDates.filter((date) => calendar[new Date(date).getFullYear()][date] > 0).reduce((acc, date) => acc + calendar[new Date(date).getFullYear()][date], 0);

  for (let i = 0; i < allDates.length; i++) {
    if (calendar[new Date(allDates[i]).getFullYear()][allDates[i]] > 0) {
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

const getSortedHeatmap = (heatmap) => {
  const finalSortedHeatmap = {};
  Object.keys(heatmap).sort().forEach(key => {
    finalSortedHeatmap[key] = heatmap[key];
  });
  return finalSortedHeatmap;
}

const getNormalizedCodeChefHeatmap = (heatmap) => {
  if (!heatmap || typeof heatmap !== 'object' || Array.isArray(heatmap)) {
    return {};
  }
  const yearlyData = {};
  for (const key in heatmap) {
    if (Object.prototype.hasOwnProperty.call(heatmap, key)) {
      const parts = key.split('-');
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        let month = parts[1].padStart(2, '0');
        let day = parts[2].padStart(2, '0');
        const normalizedKey = `${parts[0]}-${month}-${day}`;
        const value = heatmap[key];
        if (!yearlyData[year]) {
          yearlyData[year] = {};
        }
        yearlyData[year][normalizedKey] = value;
      }
    }
  }
  for (const year in yearlyData) {
    if (Object.prototype.hasOwnProperty.call(yearlyData, year)) {
      const sortedDates = {};
      Object.keys(yearlyData[year]).sort().forEach(dateKey => {
        sortedDates[dateKey] = yearlyData[year][dateKey];
      });
      yearlyData[year] = sortedDates;
    }
  }
  return yearlyData;
};

const getNormalizedLeetCodeHeatmap = (heatmap, year) => {
  if (!heatmap || typeof heatmap !== 'object' || Array.isArray(heatmap) || typeof year !== 'number' || year < 1900) {
    return {};
  }
  const completedHeatmap = {};
  for (const timestampKey in heatmap) {
    if (Object.prototype.hasOwnProperty.call(heatmap, timestampKey)) {
      const timestampSeconds = parseInt(timestampKey, 10);
      const timestampMilliseconds = timestampSeconds * 1000;
      const date = new Date(timestampMilliseconds);
      const y = date.getUTCFullYear();
      const m = String(date.getUTCMonth() + 1).padStart(2, '0');
      const d = String(date.getUTCDate()).padStart(2, '0');
      const normalizedKey = `${y}-${m}-${d}`;
      completedHeatmap[normalizedKey] = heatmap[timestampKey];
    }
  }
  const startDate = new Date(Date.UTC(year, 0, 1));
  const endDate = new Date(Date.UTC(year, 11, 31));
  for (let currentDate = startDate; currentDate <= endDate; currentDate.setUTCDate(currentDate.getUTCDate() + 1)) {
    const currentYear = currentDate.getUTCFullYear();
    if (currentYear === year) {
      const currentMonth = String(currentDate.getUTCMonth() + 1).padStart(2, '0');
      const currentDay = String(currentDate.getUTCDate()).padStart(2, '0');
      const dateKey = `${currentYear}-${currentMonth}-${currentDay}`;
      if (!Object.prototype.hasOwnProperty.call(completedHeatmap, dateKey)) {
        completedHeatmap[dateKey] = 0;
      }
    }
  }
  return getSortedHeatmap(completedHeatmap);
};

const getNormalizedInterviewBitHeatmap = (heatmap, year) => {
  if (!heatmap || typeof heatmap !== 'object' || Array.isArray(heatmap) || typeof year !== 'number' || year < 1900) {
    return {};
  }
  const getAllDatesInYear = (y) => {
    const dates = [];
    let date = new Date(y, 0, 1);
    const end = new Date(y + 1, 0, 1);
    while (date < end) {
      const yearStr = date.getFullYear();
      const monthStr = String(date.getMonth() + 1).padStart(2, '0');
      const dayStr = String(date.getDate()).padStart(2, '0');
      dates.push(`${yearStr}-${monthStr}-${dayStr}`);
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };
  const allDates = getAllDatesInYear(year);
  const normalizedHeatmap = {};
  allDates.forEach(date => {
    normalizedHeatmap[date] = heatmap[date] || 0;
  });
  return getSortedHeatmap(normalizedHeatmap);
};

const getNormalizedCode360Heatmap = (heatmap, year) => {
  if (!heatmap || typeof heatmap !== 'object' || Array.isArray(heatmap) || typeof year !== 'number' || year < 1900) {
    return {};
  }
  const getAllDatesInYear = (y) => {
    const dates = [];
    let date = new Date(y, 0, 1);
    const end = new Date(y + 1, 0, 1);
    while (date < end) {
      const yearStr = date.getFullYear();
      const monthStr = String(date.getMonth() + 1).padStart(2, '0');
      const dayStr = String(date.getDate()).padStart(2, '0');
      dates.push(`${yearStr}-${monthStr}-${dayStr}`);
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };
  const allDates = getAllDatesInYear(year);
  const normalizedHeatmap = {};
  allDates.forEach(date => {
    normalizedHeatmap[date] = heatmap[date]?.total || 0;
  });
  return getSortedHeatmap(normalizedHeatmap);
}

const getNormalizedGfgHeatmap = (heatmap, year) => {
  if (!heatmap || typeof heatmap !== 'object' || Array.isArray(heatmap) || typeof year !== 'number' || year < 1900) {
    return {};
  }
  const getAllDatesInYear = (y) => {
    const dates = [];
    let date = new Date(y, 0, 1);
    const end = new Date(y + 1, 0, 1);
    while (date < end) {
      const yearStr = date.getFullYear();
      const monthStr = String(date.getMonth() + 1).padStart(2, '0');
      const dayStr = String(date.getDate()).padStart(2, '0');
      dates.push(`${yearStr}-${monthStr}-${dayStr}`);
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };
  const allDates = getAllDatesInYear(year);
  const normalizedHeatmap = {};
  allDates.forEach(date => {
    normalizedHeatmap[date] = heatmap[date] || 0;
  });
  return getSortedHeatmap(normalizedHeatmap);
}

export {
  getStreaksAndActiveDays,
  getSortedHeatmap,
  getNormalizedGithubHeatmap,
  getNormalizedCodeChefHeatmap,
  getNormalizedLeetCodeHeatmap,
  getNormalizedInterviewBitHeatmap,
  getNormalizedCode360Heatmap,
  getNormalizedGfgHeatmap,
};