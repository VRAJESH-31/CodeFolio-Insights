import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { LanguageStats, GithubStats, BadgeCollection } from '../../components/export.js';
import { SubmissionHeatmap } from '../../components/charts/export.js';
import { FolderGit, GitCommitHorizontal, GitPullRequest, Ban } from "lucide-react";
import { getPolishedGithubHeatmap } from '../../utils/dataHelpers.js';

const Github = () => {
    const { data } = useOutletContext();

    if (!data) return <div className="text-center text-slate-500">Loading GitHub data...</div>;

    return (
        <div className="space-y-8 animate-float-in">
            <h2 className="text-3xl font-bold text-slate-800">GitHub Stats</h2>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <LanguageStats languageStats={data?.github?.languageStats} />
                
                <GithubStats statsArray={[
                    { icon: <FolderGit className="text-yellow-500" />, name: "Repos", value: data?.github?.profile?.public_repos },
                    { icon: <GitCommitHorizontal className="text-orange-500" />, name: "Commits", value: data?.github?.commits || 0 },
                    { icon: <GitPullRequest className="text-green-500" />, name: "PRs", value: data?.github?.contributions?.pullRequestContributions?.totalCount || 0 },
                    { icon: <Ban className="text-red-500" />, name: "issues", value: data?.github?.contributions?.issueContributions?.totalCount || 0 },
                ]} />

                <BadgeCollection
                    title="Badges"
                    badges={data?.github?.badges?.map((badge) => ({ icon: badge.icon, name: badge.name }))}
                    defaultBadgesCount={6}
                    className="xl:col-span-2"
                />

                <SubmissionHeatmap
                    calendar={getPolishedGithubHeatmap(data?.github?.calendar)}
                    className="xl:col-span-2"
                />
            </div>
        </div>
    );
};

export default Github;
