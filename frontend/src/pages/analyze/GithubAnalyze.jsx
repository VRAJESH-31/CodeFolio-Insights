import { useState } from 'react';
import { TrendingUp, Code, Zap, FolderOpen, GitCommit, Star, GitFork, Users, UserPlus, GitPullRequest, AlertCircle, CheckCircle, Target, BarChart3, Shield, FileText, Search, Loader2, User, Dot, Sparkles } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useGithubAnalysis } from '@/hooks/useAnalyzer.js';
import { useAuthStore } from '@/store/export.js';
import { useProfileLinks } from '@/hooks/useProfiles.js';
import { StatCard, InsightCard, VideoSuggestionCard } from '@/components/cards/export.js';
import { SubmissionHeatmap, DistributionChart } from '@/components/charts/export.js';
import { ErrorContainer, ScoreMeter, MemeContainer, BadgeCollection, EmptyState } from '@/components/export.js';
import { getGithubLanguageStats } from '@/utils/codingData.js';
import { UploadHeader } from '@/components/analyze/export.js';

const GithubAnalyse = () => {
  const user = useAuthStore((state) => state.user);
  const { data: profile } = useProfileLinks(user?._id);
  const [username, setUsername] = useState(profile?.githubUsername || '');
  const queryClient = useQueryClient();

  const { data: analysisData, isError, error, refetch, isFetching } = useGithubAnalysis(username.trim());

  const handleAnalyze = async () => {
    if (!username.trim()) return;
    await refetch();
  };

  const suggestedVideo = analysisData?.profileAnalysis?.video;
  const languageData = getGithubLanguageStats(analysisData?.languageStats || {});

  const repoTypeData = [
    {
      name: 'Personal',
      value: analysisData?.userRepos?.filter((repo) => !repo.fork)?.length || 0,
      color: { gradient: '#10b981', class: 'bg-emerald-500' },
    },
    {
      name: 'Forked',
      value: analysisData?.userRepos?.filter((repo) => repo.fork)?.length || 0,
      color: { gradient: '#6366f1', class: 'bg-indigo-500' },
    },
  ];

  const gitHubStats = [
    {
      title: 'Total Repos',
      value: analysisData?.userData?.public_repos || 0,
      color: 'green',
      Icon: FolderOpen,
    },
    {
      title: 'Total Commits',
      value: analysisData?.contributionCount?.commitsCount || 0,
      color: 'blue',
      Icon: GitCommit,
    },
    {
      title: 'Total Stars',
      value: analysisData?.starsCount || 0,
      color: 'amber',
      Icon: Star,
    },
    {
      title: 'Total Forks',
      value: analysisData?.forksCount || 0,
      color: 'purple',
      Icon: GitFork,
    },
    {
      title: 'Followers',
      value: analysisData?.userData?.followers || 0,
      color: 'blue',
      Icon: Users,
    },
    {
      title: 'Following',
      value: analysisData?.userData?.following || 0,
      color: 'purple',
      Icon: UserPlus,
    },
    {
      title: 'Pull Requests',
      value: analysisData?.contributionCount?.pullRequestsCount || 0,
      color: 'green',
      Icon: GitPullRequest,
    },
    {
      title: 'Contributions',
      value: analysisData?.totalContributions || 0,
      color: 'amber',
      Icon: Zap,
    },
  ];

  let content;

  if (isError) {
    content = (
      <ErrorContainer
        error={error}
        onRetry={handleAnalyze}
        isLoading={isFetching}
        onBack={() => {
          queryClient.resetQueries({
            queryKey: ['githubData', username.trim()],
          });
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        errorAdditionalHelp={['Check your internet connection', 'Check if username is correct', 'Try again in a few minutes']}
      />
    );
  } else {
    content = (
      <>
        {/* Initial Screen / Header Area */}
        {!analysisData && (
          <div className="min-h-[70vh] flex flex-col justify-center items-center w-full">
            <div className="w-full mx-auto p-6 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/60 space-y-8 animate-float-in">
              <div className="text-center space-y-2">
                <Code className="h-10 w-10 text-blue-600 mx-auto" />
                <h1 className="text-3xl font-black text-gray-800">GitHub Analytics</h1>
                <p className="text-gray-500 max-w-xl mx-auto">Enter your GitHub username to unlock AI-powered insights and contribution analysis.</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Search className="h-4 w-4 text-blue-500" /> GitHub Username
                </label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="e.g. torvalds" className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm font-medium" onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InsightCard title="Key Benefits" points={['Contribution metrics', 'Profile strengths', 'Areas for improvement']} Icon={Sparkles} iconColor="text-blue-600" iconBg="bg-blue-100" PointIcon={Dot} pointIconColor="text-blue-500" pointColor="text-blue-700" titleColor="text-blue-800" className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-blue-200" listClass="space-y-0" />

                <InsightCard title="Focus Areas" points={['Language insights', 'Commit history', 'Repository types']} Icon={Target} iconColor="text-purple-600" iconBg="bg-purple-100" PointIcon={Dot} pointIconColor="text-purple-500" pointColor="text-purple-700" titleColor="text-purple-800" className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 border-purple-200" listClass="space-y-0" />
              </div>

              <button onClick={handleAnalyze} disabled={!username || isFetching} className={`w-full flex items-center justify-center gap-3 font-bold py-4 px-6 rounded-2xl shadow-lg transition-all transform group ${username && !isFetching ? 'bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:shadow-xl hover:-translate-y-1' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}>
                {isFetching ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="text-lg">Analyzing...</span>
                  </>
                ) : (
                  <>
                    {/* <Shield className="h-5 w-5 group-hover:scale-110 transition-transform" /> */}
                    <span className="text-lg">Analyze Profile</span>
                    <FileText className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Analysis Data */}
        {analysisData && (
          <div className="space-y-8 animate-fade-in-up">
            {/* Top Action Header - Consistent with Resume Analyzer */}
            <UploadHeader
              icon={Code}
              title="GitHub Analysis"
              subtitle="Comprehensive AI-Powered Report"
              buttonText="Analyze Another Profile"
              buttonIcon={User}
              onAction={() => {
                queryClient.resetQueries({ queryKey: ['githubData', username.trim()] });
                setUsername('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <ScoreMeter score={analysisData?.scoreData?.overall} scoreComparison={analysisData?.scoreComparison} />

              <MemeContainer score={analysisData?.scoreData?.overall ?? 0} className="lg:col-span-2" />

              {Object.keys(analysisData?.profileAnalysis || {}).length > 0 ? (
                <div className="lg:col-span-3 animate-float-in" style={{ animationDelay: '300ms' }}>
                  <div className="space-y-6">
                    <InsightCard title="Profile Analysis" points={analysisData?.profileAnalysis?.analysis} Icon={BarChart3} PointIcon={CheckCircle} iconBg="bg-purple-100" iconColor="text-purple-600" pointIconColor="text-green-500" pointColor="text-purple-700" titleColor="text-purple-800" className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 border-purple-200" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InsightCard title="Strengths" points={analysisData?.profileAnalysis?.strongPoints || []} Icon={TrendingUp} PointIcon={CheckCircle} iconBg="bg-blue-100" iconColor="text-blue-600" pointIconColor="text-green-500" pointColor="text-blue-700" className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 border-blue-200" />

                      <InsightCard title="Areas to Improve" points={analysisData?.profileAnalysis?.improvementAreas || []} Icon={Target} PointIcon={AlertCircle} iconBg="bg-amber-100" iconColor="text-amber-600" pointIconColor="text-amber-500" pointColor="text-amber-700" titleColor="text-amber-800" className="bg-gradient-to-br from-amber-50 via-white to-orange-50 border-amber-200" />
                    </div>
                  </div>
                </div>
              ) : (
                <EmptyState title="Analysis Not Available" message="We couldn't generate a detailed profile analysis at this time. This might be due to insufficient public activity or API limitations." className="lg:col-span-3" />
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {gitHubStats.map((stat, index) => (
                <StatCard key={stat.title} {...stat} index={index} />
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <DistributionChart title="Language Distribution" data={languageData.map((item) => ({ ...item, value: item.percentage }))} className="col-span-1" includeLabels={true} />

              <DistributionChart title="Repo Type Distribution" data={repoTypeData} className="col-span-1" includeLabels={true} />
            </div>

            <SubmissionHeatmap calendar={analysisData?.multiYearContributionCalendar} />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <BadgeCollection badges={analysisData?.contributionBadges || []} title="GitHub Badges" />

              {suggestedVideo && <VideoSuggestionCard suggestedVideo={suggestedVideo} />}
            </div>
          </div>
        )}
      </>
    );
  }

  return <div className="flex-1 w-full">{content}</div>;
};

export default GithubAnalyse;
