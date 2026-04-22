import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useMemo } from 'react';
import { getStreaksAndActiveDays } from '../../utils/calendar.js';
import { StatCard, ProblemsCard } from '../../components/card/export.js';
import { SubmissionHeatmap } from '../../components/charts/export.js';

const GFG = () => {
  const { data } = useOutletContext();

  const platformData = data.gfg;

  const platformDsaProblemsData = useMemo(
    () => [
      {
        name: 'Easy',
        value: platformData?.profile?.problemsSolved?.Easy || 0,
        color: '#10B981',
      },
      {
        name: 'Medium',
        value: platformData?.profile?.problemsSolved?.Medium || 0,
        color: '#FBBF24',
      },
      {
        name: 'Hard',
        value: platformData?.profile?.problemsSolved?.Hard || 0,
        color: '#FF4524',
      },
    ],
    [platformData],
  );

  const platformFundamentalsProblemsData = useMemo(
    () => [
      {
        name: 'School',
        value: platformData?.profile?.problemsSolved?.School || 0,
        color: '#10B981',
      },
      {
        name: 'Basic',
        value: platformData?.profile?.problemsSolved?.Basic || 0,
        color: '#FBBF24',
      },
    ],
    [platformData],
  );

  const { activeDays } = useMemo(
    () => getStreaksAndActiveDays(platformData?.submission || {}),
    [platformData],
  );
  const totalProblems = useMemo(
    () => platformData?.profile?.totalProblemsSolved || 0,
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

        <ProblemsCard
          title="Fundamentals Problems"
          problemsData={platformFundamentalsProblemsData}
        />

        <ProblemsCard
          title="DSA Problems"
          problemsData={platformDsaProblemsData}
        />

        <SubmissionHeatmap
          calendar={platformData?.submission}
          className="xl:col-span-2"
        />
      </div>
    </div>
  );
};

export default GFG;
