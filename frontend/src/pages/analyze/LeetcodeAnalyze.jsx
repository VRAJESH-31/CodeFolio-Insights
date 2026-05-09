import { useState } from 'react';
import { CheckCircle, Target, Zap, Award, Rocket, BarChart3, TrendingUp, AlertCircle, Shield, FileText, Sparkles, Search, Loader2, User, Dot } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { getRandomHexColor } from '@/utils/colors.js';
import { BadgeCollection, ScoreMeter, TopicStats, ErrorContainer, MemeContainer, EmptyState } from '@/components/export.js';
import { StatCard, VideoSuggestionCard, InsightCard } from '@/components/cards/export.js';
import { SubmissionHeatmap, DistributionChart } from '@/components/charts/export.js';
import { useAuthStore } from '@/store/export.js';
import { useLeetcodeAnalysis } from '@/hooks/useAnalyzer.js';
import { useProfileLinks } from '@/hooks/useProfiles.js';
import { getStreaksAndActiveDays } from '@/utils/calendar.js';
import { UploadHeader } from '@/components/analyze/export.js';

const LeetcodeAnalyse = () => {
  const user = useAuthStore((state) => state.user);
  const { data: profile } = useProfileLinks(user?._id);
  const [userId, setUserId] = useState(profile?.leetCodeUsername || '');
  const queryClient = useQueryClient();

  const { data: analysisData, isError, error, refetch, isFetching } = useLeetcodeAnalysis(userId.trim());

  const handleAnalyze = () => {
    if (!userId.trim()) return;
    refetch();
  };

  const { currentStreak } = getStreaksAndActiveDays(analysisData?.multiYearSubmissionCalendar || {});

  const getLeetcodeDifficultyData = (difficultyData) => [
    {
      name: 'Easy',
      value: difficultyData?.[1]?.count,
      color: '#34D399',
    },
    {
      name: 'Medium',
      value: difficultyData?.[2]?.count,
      color: '#F59E0B',
    },
    {
      name: 'Hard',
      value: difficultyData?.[3]?.count,
      color: '#EF4444',
    },
  ];

  const getLeetcodeTopicData = (topicData) => {
    if (!topicData) return [];
    const responseTopicData = [];
    const topicDataArray = Object.entries(topicData).map((topicLevelData) => topicLevelData[1]);
    for (let i = 0; i < topicDataArray.length; i++) {
      for (let j = 0; j < topicDataArray[i].length; j++) {
        responseTopicData.push({
          name: topicDataArray[i][j].tagName,
          value: topicDataArray[i][j].problemsSolved,
          mastery: Math.min(100, topicDataArray[i][j].problemsSolved * 2),
          color: getRandomHexColor(),
        });
      }
    }
    return responseTopicData;
  };

  const getLeetCodeStats = (analysisData) => {
    return [
      {
        title: 'Total Solved',
        value: analysisData?.problemsCount?.userStats?.acSubmissionNum?.[0]?.count ?? 0,
        color: 'green',
        Icon: CheckCircle,
      },
      {
        title: 'Acceptance',
        value: `${((analysisData?.acceptanceRate || 0) * 100).toFixed(1)}%`,
        color: 'blue',
        Icon: Target,
      },
      {
        title: 'Current Streak',
        value: currentStreak ?? 0,
        color: 'amber',
        Icon: Zap,
      },
      {
        title: 'Badges Earned',
        value: analysisData?.badges?.badges?.length ?? 0,
        color: 'purple',
        Icon: Award,
      },
      ...(analysisData?.contestData?.userContestRanking
        ? [
            {
              title: 'Contest Rating',
              value: Math.round(analysisData?.contestData?.userContestRanking?.rating ?? 0),
              color: 'purple',
              Icon: Award,
            },
            {
              title: 'Global rank',
              value: analysisData?.contestData?.userContestRanking?.globalRanking ?? 0,
              color: 'purple',
              Icon: Award,
            },
            {
              title: 'Top Percentage',
              value: analysisData?.contestData?.userContestRanking?.topPercentage ?? 0,
              color: 'purple',
              Icon: Award,
            },
            {
              title: 'Contests Attended',
              value: analysisData?.contestData?.userContestRanking?.attendedContestsCount ?? 0,
              color: 'purple',
              Icon: Award,
            },
          ]
        : []),
    ];
  };

  let content;

  if (isError) {
    content = (
      <ErrorContainer
        error={error}
        onRetry={handleAnalyze}
        isLoading={isFetching}
        onBack={() => {
          queryClient.resetQueries({
            queryKey: ['leetcodeData', userId.trim()],
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
                <Rocket className="h-10 w-10 text-blue-600 mx-auto" />
                <h1 className="text-3xl font-black text-gray-800">LeetCode Analytics</h1>
                <p className="text-gray-500 max-w-xl mx-auto">Enter your LeetCode username to master your coding journey with AI-powered insights.</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Search className="h-4 w-4 text-blue-500" /> LeetCode Username
                </label>
                <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="e.g. neetcode" className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm font-medium" onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InsightCard title="Key Benefits" points={['Detailed Problem Stats', 'Strengths & Weaknesses', 'AI Recommendations']} Icon={Sparkles} iconColor="text-blue-600" iconBg="bg-blue-100" PointIcon={Dot} pointIconColor="text-blue-500" pointColor="text-blue-700" titleColor="text-blue-800" className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-blue-200" listClass="space-y-0" />

                <InsightCard title="Focus Areas" points={['Topic mastery', 'Consistency tracking', 'Difficulty breakdowns']} Icon={Target} iconColor="text-purple-600" iconBg="bg-purple-100" PointIcon={Dot} pointIconColor="text-purple-500" pointColor="text-purple-700" titleColor="text-purple-800" className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 border-purple-200" listClass="space-y-0" />
              </div>

              <button onClick={handleAnalyze} disabled={!userId || isFetching} className={`w-full flex items-center justify-center gap-3 font-bold py-4 px-6 rounded-2xl shadow-lg transition-all transform group ${userId && !isFetching ? 'bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:shadow-xl hover:-translate-y-1' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}>
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
              icon={Rocket}
              title="LeetCode Analysis"
              subtitle="Comprehensive AI-Powered Report"
              buttonText="Analyze Another Profile"
              buttonIcon={User}
              onAction={() => {
                queryClient.resetQueries({ queryKey: ['leetcodeData', userId.trim()] });
                setUserId('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <ScoreMeter score={analysisData?.scoreData?.overall} scoreComparison={analysisData?.scoreComparison} />

              <MemeContainer score={analysisData?.scoreData?.overall ?? 0} className="lg:col-span-2" />

              {Object.keys(analysisData?.profileAnalysis || {}).length > 0 ? (
                <div className="lg:col-span-3 animate-float-in" style={{ animationDelay: '300ms' }}>
                  <div className="space-y-6">
                    <InsightCard title="Profile Analysis" points={analysisData?.profileAnalysis?.analysis || []} Icon={BarChart3} PointIcon={CheckCircle} iconBg="bg-purple-100" iconColor="text-purple-600" pointIconColor="text-green-500" pointColor="text-purple-700" titleColor="text-purple-800" className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 border-purple-200" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InsightCard title="Strengths" points={analysisData?.profileAnalysis?.strongPoints} Icon={TrendingUp} PointIcon={CheckCircle} iconBg="bg-blue-100" iconColor="text-blue-600" pointIconColor="text-green-500" pointColor="text-blue-700" className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 border-blue-200" />

                      <InsightCard title="Areas to Improve" points={analysisData?.profileAnalysis?.improvementAreas} Icon={Target} PointIcon={AlertCircle} iconBg="bg-amber-100" iconColor="text-amber-600" pointIconColor="text-amber-500" pointColor="text-amber-700" titleColor="text-amber-800" className="bg-gradient-to-br from-amber-50 via-white to-orange-50 border-amber-200" />
                    </div>
                  </div>
                </div>
              ) : (
                <EmptyState title="Analysis Not Available" message="We couldn't generate a detailed profile analysis at this time. This might be due to insufficient public activity or API limitations." className="lg:col-span-3" />
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {getLeetCodeStats(analysisData).map((stat, index) => (
                <StatCard key={stat.title} {...stat} index={index} />
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <BadgeCollection badges={analysisData?.badges?.badges} defaultBadgesCount={6} />

              <DistributionChart title="Difficulty Breakdown" data={getLeetcodeDifficultyData(analysisData?.problemsCount?.userStats?.acSubmissionNum)} />
            </div>

            <SubmissionHeatmap calendar={analysisData?.multiYearSubmissionCalendar} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TopicStats topicData={getLeetcodeTopicData(analysisData?.topicWiseProblems)} />

              {analysisData?.profileAnalysis?.video && <VideoSuggestionCard suggestedVideo={analysisData?.profileAnalysis?.video} />}
            </div>
          </div>
        )}
      </>
    );
  }

  return <div className="flex-1 w-full">{content}</div>;
};

export default LeetcodeAnalyse;
