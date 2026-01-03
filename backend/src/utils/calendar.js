const getPolishedGithubHeatmap = (githubData) => {
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
  const activeDays = allDates.filter((date)=>calendar[new Date(date).getFullYear()][date] > 0).length;
  const totalContributions = allDates.filter((date)=>calendar[new Date(date).getFullYear()][date] > 0).reduce((acc, date)=>acc + calendar[new Date(date).getFullYear()][date], 0);

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

export {
    getPolishedGithubHeatmap,
    getStreaksAndActiveDays,
}