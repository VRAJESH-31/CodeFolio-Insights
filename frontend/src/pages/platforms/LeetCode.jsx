import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useMemo } from 'react';
import { getStreaksAndActiveDays } from '@/utils/calendar.js';
import { StatCard, ProblemsCard } from '@/components/cards/export.js';
import { BadgeCollection, TopicAnalysis, ContestAchievements } from '@/components/export.js';
import { SubmissionHeatmap, ContestGraph } from '@/components/charts/export.js';
import { getContestData, getContestAchievements } from '@/utils/codingData.js';

const LeetCode = () => {
  const { data } = useOutletContext();

  const platformData = data.leetcode;

  const platformProblemsData = useMemo(
    () => [
      {
        name: 'Easy',
        value: platformData?.problems?.acSubmissionNum[1]?.count || 0,
        color: '#10B981',
      },
      {
        name: 'Medium',
        value: platformData?.problems?.acSubmissionNum[2]?.count || 0,
        color: '#FBBF24',
      },
      {
        name: 'Hard',
        value: platformData?.problems?.acSubmissionNum[3]?.count || 0,
        color: '#FF4524',
      },
    ],
    [platformData],
  );

  const topicStats = useMemo(
    () =>
      Object.values(platformData?.topicStats || [])
        ?.flat()
        ?.reduce((acc, { tagSlug, problemsSolved }) => {
          acc[tagSlug] = problemsSolved;
          return acc;
        }, {}),
    [platformData],
  );

  const { activeDays } = useMemo(() => getStreaksAndActiveDays(platformData?.submission || {}), [platformData]);
  const totalProblems = useMemo(() => platformData?.problems?.acSubmissionNum?.[0]?.count || 0, [platformData]);
  const totalContests = useMemo(() => platformData?.contest?.userContestRanking?.attendedContestsCount || 0, [platformData]);
  const contestData = useMemo(() => getContestData(data)?.LeetCode || [], [data]);
  const achievements = useMemo(() => getContestAchievements(data).filter((achievement) => achievement.platform === 'LeetCode'), [data]);
  const badges = useMemo(() => platformData?.badges?.badges);

  return (
    <div className="space-y-8 animate-float-in">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <StatCard title="Total Problems" value={totalProblems} color="blue" index={0} />

        <StatCard title="Active Days" value={activeDays} color="green" index={1} />

        <BadgeCollection title="Badges" badges={badges} />

        <ProblemsCard title="DSA Problems" problemsData={platformProblemsData} />

        {totalContests > 0 && (
          <>
            <ContestGraph contestData={contestData} className="col-span-1" />

            <ContestAchievements achievements={achievements} className="col-span-1" />
          </>
        )}

        <TopicAnalysis title="DSA Topic Analysis" data={topicStats} className="col-span-1 lg:col-span-2" />

        <SubmissionHeatmap calendar={platformData?.submission} className="col-span-1 lg:col-span-2" />
      </div>
    </div>
  );
};

export default LeetCode;
