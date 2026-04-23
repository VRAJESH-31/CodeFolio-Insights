import { useState } from 'react';
import {
  CheckCircle,
  Target,
  Zap,
  Award,
  Rocket,
  BarChart3,
  TrendingUp,
  AlertCircle,
  Shield,
  FileText,
  Sparkles,
  Search,
  Loader2,
} from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { getRandomHexColor } from '../../utils/colors.js';
import {
  BadgeCollection,
  ScoreMeter,
  TopicStats,
  ErrorContainer,
  MemeContainer,
} from '../../components/export.js';
import {
  StatCard,
  VideoSuggestionCard,
  AnalysisCard,
} from '../../components/card/export.js';
import {
  SubmissionHeatmap,
  DistributionChart,
} from '../../components/charts/export.js';
import { useAuthStore } from '../../store/export.js';
import { useLeetcodeAnalysis } from '../../hooks/useAnalyzer.js';
import { useProfileLinks } from '../../hooks/useProfiles.js';
import { getStreaksAndActiveDays } from '../../utils/calendar.js';

const LeetcodeAnalyse = () => {
  const user = useAuthStore((state) => state.user);
  const { data: profile } = useProfileLinks(user?._id);
  const [userId, setUserId] = useState(profile?.leetCodeUsername || '');
  const queryClient = useQueryClient();

  const {
    data: analysisData,
    isError,
    error,
    refetch,
    isFetching,
  } = useLeetcodeAnalysis(userId.trim());

  const handleAnalyze = () => {
    if (!userId.trim()) return;
    refetch();
  };

  const { currentStreak } = getStreaksAndActiveDays(
    analysisData?.multiYearSubmissionCalendar || {},
  );

  const getLeetcodeDifficultyData = (difficultyData) => [
    { name: 'Easy', value: difficultyData?.[1]?.count, color: '#34D399' },
    { name: 'Medium', value: difficultyData?.[2]?.count, color: '#F59E0B' },
    { name: 'Hard', value: difficultyData?.[3]?.count, color: '#EF4444' },
  ];

  const getLeetcodeTopicData = (topicData) => {
    if (!topicData) return [];
    const responseTopicData = [];
    const topicDataArray = Object.entries(topicData).map(
      (topicLevelData) => topicLevelData[1],
    );
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
    return responseTopicData.sort(() => Math.random() - 0.5).slice(0, 10);
  };

  const getLeetCodeStats = (analysisData) => {
    return [
      {
        title: 'Total Solved',
        value:
          analysisData?.problemsCount?.userStats?.acSubmissionNum?.[0]?.count ??
          0,
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
              value: Math.round(
                analysisData?.contestData?.userContestRanking?.rating ?? 0,
              ),
              color: 'purple',
              Icon: Award,
            },
            {
              title: 'Global rank',
              value:
                analysisData?.contestData?.userContestRanking?.globalRanking ??
                0,
              color: 'purple',
              Icon: Award,
            },
            {
              title: 'Top Percentage',
              value:
                analysisData?.contestData?.userContestRanking?.topPercentage ??
                0,
              color: 'purple',
              Icon: Award,
            },
            {
              title: 'Contests Attended',
              value:
                analysisData?.contestData?.userContestRanking
                  ?.attendedContestsCount ?? 0,
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
        errorAdditionalHelp={[
          'Check if username is correct',
          'Ensure profile is public',
          'Try again in a few minutes',
        ]}
      />
    );
  } else {
    content = (
      <div className="w-full">
        {/* Initial Screen / Header Area */}
        {!analysisData ? (
          <div className="min-h-[70vh] flex flex-col justify-center items-center w-full">
            <div className="w-full mx-auto p-6 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/60 space-y-8 animate-float-in">
              <div className="text-center space-y-2">
                <Rocket className="h-10 w-10 text-blue-600 mx-auto" />
                <h1 className="text-3xl font-black text-gray-800">
                  LeetCode Analytics
                </h1>
                <p className="text-gray-500 max-w-xl mx-auto">
                  Enter your LeetCode username to master your coding journey
                  with AI-powered insights.
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Search className="h-4 w-4 text-blue-500" /> LeetCode Username
                </label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="e.g. neetcode"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm font-medium"
                  onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold text-blue-800 text-sm">
                      Key Benefits
                    </span>
                  </div>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Detailed problem stats</li>
                    <li>• Strengths & weaknesses</li>
                    <li>• AI recommendations</li>
                  </ul>
                </div>
                <div className="bg-purple-50/50 p-4 rounded-2xl border border-purple-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-purple-600" />
                    <span className="font-semibold text-purple-800 text-sm">
                      Focus Areas
                    </span>
                  </div>
                  <ul className="text-xs text-purple-700 space-y-1">
                    <li>• Topic mastery</li>
                    <li>• Consistency tracking</li>
                    <li>• Difficulty breakdowns</li>
                  </ul>
                </div>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={!userId || isFetching}
                className={`w-full flex items-center justify-center gap-3 font-bold py-4 px-6 rounded-2xl shadow-lg transition-all transform group ${userId && !isFetching ? 'bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:shadow-xl hover:-translate-y-1' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
              >
                {isFetching ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="text-lg">Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span className="text-lg">Analyze Profile</span>
                    <FileText className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        ) : null}

        {/* Analysis Data */}
        {analysisData && (
          <div className="space-y-8 animate-fade-in-up mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <ScoreMeter
                score={analysisData?.scoreData?.overall}
                scoreComparison={analysisData?.scoreComparison}
              />

              <MemeContainer
                score={analysisData?.scoreData?.overall ?? 0}
                className="lg:col-span-2"
              />

              {Object.keys(analysisData?.profileAnalysis || {}).length > 0 ? (
                <div
                  className="lg:col-span-3 animate-float-in"
                  style={{ animationDelay: '300ms' }}
                >
                  <div className="space-y-6">
                    <AnalysisCard
                      title="Profile Analysis"
                      points={analysisData?.profileAnalysis?.analysis || []}
                      Icon={BarChart3}
                      PointIcon={CheckCircle}
                      iconBg="bg-purple-100"
                      iconColor="text-purple-600"
                      pointIconColor="text-green-500"
                      pointColor="text-purple-700"
                      titleColor="text-purple-800"
                      className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 border-purple-200"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <AnalysisCard
                        title="Strengths"
                        points={analysisData?.profileAnalysis?.strongPoints}
                        Icon={TrendingUp}
                        PointIcon={CheckCircle}
                        iconBg="bg-blue-100"
                        iconColor="text-blue-600"
                        pointIconColor="text-green-500"
                        pointColor="text-blue-700"
                        className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 border-blue-200"
                      />

                      <AnalysisCard
                        title="Areas to Improve"
                        points={analysisData?.profileAnalysis?.improvementAreas}
                        Icon={Target}
                        PointIcon={AlertCircle}
                        iconBg="bg-amber-100"
                        iconColor="text-amber-600"
                        pointIconColor="text-amber-500"
                        pointColor="text-amber-700"
                        titleColor="text-amber-800"
                        className="bg-gradient-to-br from-amber-50 via-white to-orange-50 border-amber-200"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="lg:col-span-3 bg-white/90 backdrop-blur-sm p-12 rounded-3xl shadow-xl border border-dashed border-gray-200 text-center animate-float-in"
                  style={{ animationDelay: '300ms' }}
                >
                  <div className="mx-auto w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                    <AlertCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Analysis Not Available
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    We couldn&apos;t generate a detailed profile analysis at
                    this time. This might be due to insufficient public activity
                    or API limitations.
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {getLeetCodeStats(analysisData).map((stat, index) => (
                <StatCard key={stat.title} {...stat} index={index} />
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <BadgeCollection
                badges={analysisData?.badges?.badges}
                defaultBadgesCount={6}
              />

              <DistributionChart
                title="Difficulty Breakdown"
                data={getLeetcodeDifficultyData(
                  analysisData?.problemsCount?.userStats?.acSubmissionNum,
                )}
              />
            </div>

            <SubmissionHeatmap
              calendar={analysisData?.multiYearSubmissionCalendar}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TopicStats
                topicData={getLeetcodeTopicData(
                  analysisData?.topicWiseProblems,
                )}
              />

              {analysisData?.profileAnalysis?.video && (
                <VideoSuggestionCard
                  suggestedVideo={analysisData?.profileAnalysis?.video}
                />
              )}
            </div>

            <div className="sticky bottom-2 w-full flex justify-end z-50 pointer-events-none">
              <button
                onClick={() => {
                  queryClient.resetQueries({
                    queryKey: ['leetcodeData', userId.trim()],
                  });
                  setUserId('');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="pointer-events-auto flex items-center gap-0 hover:gap-3 px-4 py-4 hover:px-8 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white font-bold rounded-full hover:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 group"
              >
                <Search className="w-6 h-6 group-hover:scale-110 transition-transform shrink-0" />
                <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                  Analyze Another Profile
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return <div className="flex-1 w-full">{content}</div>;
};

export default LeetcodeAnalyse;
