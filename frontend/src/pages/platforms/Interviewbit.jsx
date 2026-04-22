import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useMemo } from 'react';
import { getStreaksAndActiveDays } from '../../utils/calendar.js';
import { StatCard, ProblemsCard } from '../../components/card/export.js';
import { BadgeCollection, TopicAnalysis } from '../../components/export.js';
import { SubmissionHeatmap } from '../../components/charts/export.js';

const Interviewbit = () => {
  const { data } = useOutletContext();

  const platformData = data.interviewbit;

  const platformProblemsData = useMemo(
    () => [
      {
        name: 'Easy',
        value:
          platformData?.profile?.problems?.difficulty_problems_solved?.find(
            (d) => d.difficulty_level === 'easy',
          )?.solved_problems_count || 0,
        color: '#10B981',
      },
      {
        name: 'Medium',
        value:
          platformData?.profile?.problems?.difficulty_problems_solved?.find(
            (d) => d.difficulty_level === 'medium',
          )?.solved_problems_count || 0,
        color: '#FBBF24',
      },
      {
        name: 'Hard',
        value:
          platformData?.profile?.problems?.difficulty_problems_solved?.find(
            (d) => d.difficulty_level === 'hard',
          )?.solved_problems_count || 0,
        color: '#FF4524',
      },
    ],
    [platformData],
  );

  const topicStats = useMemo(
    () =>
      platformData?.profile?.problems?.topic_problems_solved?.reduce(
        (acc, topic) => {
          acc[topic.title] = topic.solved_problems_count;
          return acc;
        },
        {},
      ) || {},
    [platformData],
  );

  const badges = useMemo(
    () =>
      platformData?.badges?.map((badge) => ({
        icon: badge.image,
        name: badge.title,
        subTitle: null,
        subTitleIcon: null,
      })) || [],
    [platformData],
  );

  const { activeDays } = useMemo(
    () => getStreaksAndActiveDays(platformData?.submission || {}),
    [platformData],
  );
  const totalProblems = useMemo(
    () => platformData?.profile?.problems?.total_problems_solved || 0,
    [platformData],
  );

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

        <TopicAnalysis
          title="Topic Analysis"
          data={topicStats}
          className="xl:col-span-2"
        />

        <SubmissionHeatmap
          calendar={platformData?.submission}
          className="xl:col-span-2"
        />
      </div>
    </div>
  );
};

export default Interviewbit;
