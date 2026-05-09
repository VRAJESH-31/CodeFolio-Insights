import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useMemo } from 'react';
import { getStreaksAndActiveDays } from '@/utils/calendar.js';
import { StatCard } from '@/components/cards/export.js';
import { BadgeCollection, ContestAchievements } from '@/components/export.js';
import { SubmissionHeatmap, ContestGraph } from '@/components/charts/export.js';
import { getContestData, getContestAchievements } from '@/utils/codingData.js';
import InfoLayout from '@/layouts/InfoLayout.jsx';

const CodeChef = () => {
  const { data } = useOutletContext();

  const platformData = data.codechef;

  const badges = useMemo(
    () =>
      platformData?.profile?.badges?.map((badge) => ({
        icon: badge.badgeImage,
        name: badge.badgeTitle,
        subTitle: null,
        subTitleIcon: null,
      })) || [],
    [platformData],
  );

  const { activeDays } = useMemo(() => getStreaksAndActiveDays(platformData?.submission || {}), [platformData]);
  const problemsData = platformData?.profile?.problemsSolved || 0;
  const totalContests = useMemo(() => platformData?.profile?.contests?.history?.length || 0, [platformData]);
  const contestData = useMemo(() => getContestData(data)?.Codechef || [], [data]);
  const achievements = useMemo(() => getContestAchievements(data).filter((achievement) => achievement.platform === 'Codechef'), [data]);

  return (
    <div className="space-y-8 animate-float-in overflow-x-hidden">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <StatCard title="Total Problems" value={problemsData} color="blue" index={0} />

        <InfoLayout text={`Data is mostly available from ${new Date().getFullYear() - 1}`} direction="left" placement="top-right">
          <StatCard title="Active Days" value={activeDays} color="green" index={1} />
        </InfoLayout>

        <BadgeCollection title="Badges" badges={badges} className="xl:col-span-2" />

        {totalContests > 0 && (
          <>
            <ContestGraph contestData={contestData} className="col-span-1" />

            <ContestAchievements achievements={achievements} className="col-span-1" />
          </>
        )}

        <InfoLayout text={`Data is mostly available from ${new Date().getFullYear() - 1}`} direction="left" placement="top-right" className="xl:col-span-2">
          <SubmissionHeatmap calendar={platformData?.submission} />
        </InfoLayout>
      </div>
    </div>
  );
};

export default CodeChef;
