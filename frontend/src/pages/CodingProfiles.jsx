import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { BadgeCollection, TopicAnalysis, Contest, ContestAchievements } from '../components/export.js';
import { StatCard, ProblemsCard } from '../components/card/export.js';
import { SubmissionHeatmap } from '../components/charts/export.js';
import { InfoLayout } from '../layouts/export.js';
import { getTotalProblems, getBadges, getTopicAnalysis, getContestData, getDsaProblemsData, getContestAchievements, getFundamentalProblemsData, getCompetitiveProgrammingProblemsData } from '../utils/dataHelpers.js';
import { getCombinedHeatmap } from '../utils/export.js';
import { getStreaksAndActiveDays } from "../utils/calendar.js"

const CodingProfiles = () => {
    const { data } = useOutletContext();

    const combinedHeatmapData = useMemo(() => getCombinedHeatmap(
        data?.leetcode?.submission,
        data?.gfg?.submission,
        data?.codechef?.submission,
        data?.interviewbit?.submission,
        data?.code360?.submission
    ), [data]);

    const totalProblems = useMemo(() => getTotalProblems(data), [data]);
    const badges = useMemo(() => Object.values(getBadges(data)).flat(), [data]);
    const topicAnalysis = useMemo(() => getTopicAnalysis(data), [data]);
    const contestData = useMemo(() => getContestData(data), [data]);
    const dsaProblemsData = useMemo(() => getDsaProblemsData(data), [data]);
    const fundamentalProblemsData = useMemo(() => getFundamentalProblemsData(data), [data]);
    const competitiveProgrammingProblemsData = useMemo(() => getCompetitiveProgrammingProblemsData(data), [data]);
    const contestAchievements = useMemo(() => getContestAchievements(data), [data]);
    const { activeDays } = useMemo(() => getStreaksAndActiveDays(combinedHeatmapData), [combinedHeatmapData]);
    const contestCount = useMemo(() => Object.values(contestData).reduce((total, value) => total + value.length, 0), [contestData]);

    return (
        <div className="space-y-8 animate-float-in overflow-x-hidden">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="xl:col-span-1 space-y-8">
                    <div className="grid grid-cols-2 gap-4">
                        <InfoLayout
                            text="Total problems solved across all platforms combined"
                            direction="down"
                            placement="top-right"
                        >
                            <StatCard
                                title="Total Problems"
                                value={totalProblems}
                                color="blue"
                                index={0}
                        />
                        </InfoLayout>

                        <InfoLayout
                            text={`Total no of active days on atleast one platform. Note: Data for CodeChef is mostly from ${new Date().getFullYear() - 1} and data for HackerRank is not available.`}
                            direction="down"
                            placement="top-right"
                        >
                            <StatCard
                                title="Active Days"
                                value={activeDays}
                                color="green"
                                index={1}
                        />
                        </InfoLayout>
                    </div>

                    <BadgeCollection
                        title="Badges"
                        badges={badges}
                    />

                    <InfoLayout
                        text="Topic data is from Leetcode and Interviewbit only"
                        direction="right"
                        placement="top-right"
                    >
                        <TopicAnalysis
                            title="DSA Topic Analysis"
                            data={topicAnalysis}
                        />
                    </InfoLayout>

                    {contestCount > 0 && <Contest
                        data={contestData}
                    />}
                </div>

                <div className="xl:col-span-1 space-y-8">
                    <InfoLayout
                        text="This includes all problems from HackerRank and all School and Basic problems from GeeksforGeeks"
                        direction="bottomLeft"
                        placement="top-right"
                    >
                        <ProblemsCard
                            title="Fundamentals"
                            problemsData={fundamentalProblemsData}
                        />
                    </InfoLayout>

                    <InfoLayout
                        text="This includes all problems solved on different platforms except Codechef and HackerRank. It also excludes School and Basic problems from GeeksforGeeks."
                        direction="left"
                        placement="top-right"
                    >
                        <ProblemsCard
                            title="DSA"
                            problemsData={dsaProblemsData}
                        />
                    </InfoLayout>

                    <InfoLayout
                        text="This includes all problems solved on Codechef"
                        direction="left"
                        placement="top-right"
                    >
                        <ProblemsCard
                            title="Competitive Programming"
                            problemsData={competitiveProgrammingProblemsData}
                        />
                    </InfoLayout>   

                    {contestCount > 0 && 
                        <ContestAchievements
                            achievements={contestAchievements}
                        />
                    }
                </div>

                <InfoLayout
                    text={`It includes submission counts from each platform. Note: Data for CodeChef is mostly from ${new Date().getFullYear() - 1} and data for HackerRank is not available.`}
                    direction="left"
                    placement="top-right"
                    className="col-span-1 lg:col-span-2"
                >
                    <SubmissionHeatmap
                        calendar={combinedHeatmapData}
                    />
                </InfoLayout>
            </div>
        </div>
    );
};

export default CodingProfiles;
