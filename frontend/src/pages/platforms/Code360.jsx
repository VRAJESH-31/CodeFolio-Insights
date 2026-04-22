import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { getStreaksAndActiveDays } from '../../utils/calendar.js';
import { StatCard, ProblemsCard } from '../../components/card/export.js';
import {
  BadgeCollection,
  ContestAchievements,
} from '../../components/export.js';
import {
  SubmissionHeatmap,
  ContestGraph,
} from '../../components/charts/export.js';
import {
  getContestData,
  getContestAchievements,
  getBadges,
} from '../../utils/dataHelpers.js';
import { useMemo } from 'react';

const Code360 = () => {
  const { data } = useOutletContext();

  const platformData = data.code360;

  const platformProblemsData = [
    {
      name: 'Easy',
      value:
        platformData?.profile?.dsa_domain_data?.problem_count_data
          ?.difficulty_data?.[0]?.count || 0,
      color: '#10B981',
    },
    {
      name: 'Medium',
      value:
        platformData?.profile?.dsa_domain_data?.problem_count_data
          ?.difficulty_data?.[1]?.count || 0,
      color: '#FBBF24',
    },
    {
      name: 'Hard',
      value:
        platformData?.profile?.dsa_domain_data?.problem_count_data
          ?.difficulty_data?.[2]?.count || 0,
      color: '#FF4524',
    },
  ];

  const totalProblems = useMemo(
    () =>
      platformData?.profile?.dsa_domain_data?.problem_count_data?.total_count ||
      0,
    [platformData],
  );
  const totalContests = useMemo(
    () => platformData?.profile?.contests?.user_rating_data?.length || 0,
    [platformData],
  );
  const { activeDays } = useMemo(
    () => getStreaksAndActiveDays(platformData?.submission || {}),
    [platformData],
  );
  const contestData = useMemo(
    () => getContestData(data)?.Code360 || [],
    [data],
  );
  const achievements = useMemo(
    () =>
      getContestAchievements(data).filter(
        (achievement) => achievement.platform === 'Code360',
      ),
    [data],
  );
  const badges = useMemo(() => getBadges(data).Code360, [data]);

  return (
    <div className="space-y-8 animate-float-in">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <StatCard
          title="Total Problems"
          value={totalProblems}
          color="blue"
          index={0}
        />

        <StatCard
          title="Active Days"
          value={activeDays}
          color="green"
          index={1}
        />

        <BadgeCollection title="Badges" badges={badges} />

        <ProblemsCard
          title="DSA Problems"
          problemsData={platformProblemsData}
        />

        {totalContests > 0 && (
          <>
            <ContestGraph contestData={contestData} className="col-span-1" />

            <ContestAchievements
              achievements={achievements}
              className="col-span-1"
            />
          </>
        )}

        <SubmissionHeatmap
          calendar={platformData?.submission}
          className="col-span-1 lg:col-span-2"
        />
      </div>
    </div>
  );
};

export default Code360;
