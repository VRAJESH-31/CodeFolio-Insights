import React, { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  LanguageStats,
  GithubStats,
  BadgeCollection,
} from '../../components/export.js';
import { SubmissionHeatmap } from '../../components/charts/export.js';
import {
  FolderGit,
  GitCommitHorizontal,
  GitPullRequest,
  Ban,
  Star,
  GitFork,
  Users,
  UserPlus,
  GitMerge,
  Lock,
} from 'lucide-react';

const Github = () => {
  const { data } = useOutletContext();

  const githubData = data?.github;

  const badges = useMemo(
    () =>
      githubData?.badges?.map((badge) => ({
        icon: badge.icon,
        name: badge.name,
        subTitle: null,
        subTitleIcon: null,
      })) || [],
    [githubData],
  );

  const githubContributionStats = [
    {
      icon: <GitCommitHorizontal className="text-orange-500" />,
      name: 'Commits',
      value: githubData?.contributions?.commitsCount || 0,
    },
    {
      icon: <GitPullRequest className="text-green-500" />,
      name: 'Pull Requests',
      value: githubData?.contributions?.pullRequestsCount || 0,
    },
    {
      icon: <GitMerge className="text-violet-500" />,
      name: 'PR Reviews',
      value: githubData?.contributions?.pullRequestReviewsCount || 0,
    },
    {
      icon: <Ban className="text-blue-500" />,
      name: 'Issues',
      value: githubData?.contributions?.issuesCount || 0,
    },
    {
      icon: <Lock className="text-red-500" />,
      name: 'Private Contributions',
      value: githubData?.contributions?.restrictedContributionCount || 0,
    },
  ];

  const githubProfileStats = [
    {
      icon: <FolderGit className="text-yellow-500" />,
      name: 'Repos',
      value: githubData?.profile?.public_repos || 0,
    },
    {
      icon: <Star className="text-amber-500" />,
      name: 'Stars',
      value: githubData?.starsAndForks?.starsCount || 0,
    },
    {
      icon: <GitFork className="text-indigo-500" />,
      name: 'Forks',
      value: githubData?.starsAndForks?.forksCount || 0,
    },
    {
      icon: <Users className="text-blue-500" />,
      name: 'Followers',
      value: githubData?.profile?.followers || 0,
    },
    {
      icon: <UserPlus className="text-cyan-500" />,
      name: 'Following',
      value: githubData?.profile?.following || 0,
    },
  ];

  return (
    <div className="space-y-8 animate-float-in">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <LanguageStats languageStats={githubData?.languageStats} />

        <BadgeCollection title="Badges" badges={badges} />

        <GithubStats
          title="Contribution Stats"
          statsArray={githubContributionStats}
        />

        <GithubStats title="Profile Stats" statsArray={githubProfileStats} />

        <SubmissionHeatmap
          calendar={githubData?.calendar}
          className="xl:col-span-2"
        />
      </div>
    </div>
  );
};

export default Github;
