import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { BadgeCollection, TopicAnalysis, Contest, ContestAchievements } from '../components/export.js';
import { StatCard, ProblemsCard } from '../components/card/export.js';
import { SubmissionHeatmap } from '../components/charts/export.js';
import { getTotalProblems, getTotalActiveDays, getBadges, getTopicAnalysis, getContestCount, getContestData, getDsaProblemsData, getContestAchievements, getCombinedHeatmap } from '../utils/dataHelpers.js';

const CodingProfiles = () => {
    const { data } = useOutletContext();

    const combinedHeatmapData = useMemo(() => getCombinedHeatmap(
        data?.leetcode?.submission,
        data?.gfg?.submission,
        data?.codechef?.submission,
        data?.interviewbit?.submission,
        data?.code360?.submission
    ), [data]);

    if (!data) {
        return <div className="text-center text-slate-500">Loading profile data...</div>;
    }

    return (
        <div className="space-y-8 animate-float-in">
            <h2 className="text-3xl font-bold text-slate-800">Coding Profiles</h2>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="xl:col-span-1 space-y-8">
                    <div className="grid grid-cols-2 gap-4">
                        <StatCard
                            title="Total Problems"
                            value={getTotalProblems(data)}
                            color="blue"
                            index={0}
                        />
                        <StatCard
                            title="Active Days"
                            value={getTotalActiveDays(combinedHeatmapData)}
                            color="green"
                            index={1}
                        />
                    </div>

                    <BadgeCollection
                        title="Badges"
                        defaultBadgesCount={2}
                        badges={getBadges(data)}
                    />

                    <TopicAnalysis
                        title="DSA Topic Analysis"
                        data={getTopicAnalysis(data)}
                    />

                    {getContestCount(data) > 0 && (
                        <Contest
                            data={getContestData(data)}
                        />
                    )}
                </div>

                <div className="xl:col-span-1 space-y-8">
                    <ProblemsCard
                        title="Fundamentals"
                        problemsData={
                            [{ name: 'GeeksForGeeks', value: (data.gfg?.profile?.problemsSolved?.School || 0) + (data.gfg?.profile?.problemsSolved?.Basic || 0), color: '#10B981' },
                            { name: 'HackerRank', value: data?.hackerrank?.profile?.badges?.reduce((total, badge) => total + badge.solved, 0) || 0, color: '#FBBF24' },]
                        }
                    />

                    <ProblemsCard
                        title="DSA"
                        problemsData={getDsaProblemsData(data)}
                    />

                    <ProblemsCard
                        title="Competitive Programming"
                        problemsData={
                            [{ name: 'Codechef', value: (data?.codechef?.profile?.problemsSolved || 0), color: '#10B981' },]
                        }
                    />

                    {getContestCount(data) > 0 && <ContestAchievements
                        achievements={getContestAchievements(data)}
                    />}
                </div>

                <SubmissionHeatmap
                    calendar={combinedHeatmapData}
                    className="col-span-1 lg:col-span-2"
                />
            </div>
        </div>
    );
};

export default CodingProfiles;
