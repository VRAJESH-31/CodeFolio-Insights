import { useEffect } from 'react';
import { useNavigate, useParams, Outlet } from 'react-router-dom';
import { DashboardSidebar } from '../components/sidebars/export.js';
import { useProfileCache, useProfileRefresh } from '../hooks/useProfiles.js';
import { useUser } from '../hooks/useUsers.js';
import { LoaderLabel } from '../components/loaders/export.js';
import { DashboardSkeleton } from '../components/skeletons/export.js';
import { CircleAlert, Plus } from 'lucide-react';
import { PageNotFound } from "../pages/export.js"

const DashboardLayout = () => {
    const { displayName } = useParams();
    const { data: cacheData, isLoading: isLoadingCache, isError: isCachingError } = useProfileCache(displayName);
    const { data: refreshData, isLoading: isRefreshing, refetch: triggerRefresh } = useProfileRefresh(displayName);
    const { data: userData, isLoading: isLoadingUser, isError: isUserError } = useUser(displayName);
    const navigate = useNavigate();

    const data = refreshData || cacheData;

    // Stale Check Logic
    useEffect(() => {
        if (!displayName) return;

        if (!isLoadingCache) {
            if (!cacheData) {
                triggerRefresh();
            } else {
                const lastUpdated = cacheData.lastUpdated;
                const dataRefreshRateInMs = 15 * 60 * 1000;
                const now = Date.now();

                if (!lastUpdated || (now - new Date(lastUpdated).getTime() > dataRefreshRateInMs)) {
                    triggerRefresh();
                }
            }
        }
    }, [displayName, cacheData, isLoadingCache]);

    if (isLoadingUser || isLoadingCache) {
        return <DashboardSkeleton />;
    }

    if (data) {
        return (
            <div className="flex flex-1 overflow-hidden h-screen bg-white">
                <DashboardSidebar userData={userData} />
                <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-slate-50/50">

                    {isRefreshing && <LoaderLabel text="Refreshing stats..." showLoading={true} />}

                    <Outlet
                        context={{ data, userData, isLoading: isLoadingCache }}
                    />
                </main>
            </div>
        )
    } else if (isUserError || isCachingError) {
        return <PageNotFound />
    } else {
        return (
            <div className="flex flex-1 items-center justify-center h-screen bg-slate-50/50 p-6">
                <div className="max-w-md w-full animate-float-in">
                    <div className="bg-white/80 backdrop-blur-xl border border-blue-100/50 rounded-3xl p-10 shadow-2xl shadow-blue-500/5 text-center space-y-8 relative overflow-hidden group">
                        {/* Decorative background element */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors duration-700" />

                        <div className="relative">
                            <div className="mx-auto w-24 h-24 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100/50 transform group-hover:scale-110 transition-transform duration-500">
                                <CircleAlert className="w-12 h-12 text-blue-500" />
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">No Platforms Connected</h2>
                                <p className="text-slate-500 font-medium leading-relaxed">
                                    Your dashboard is empty because you haven&apos;t linked any problem-solving or development platforms yet. Or maybe the latest data for the coding profiles whose link you attached is not loaded yet.
                                </p>
                            </div>

                            <div className="pt-6">
                                <button
                                    onClick={() => navigate('/settings/links')}
                                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-black px-8 py-4 rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all transform uppercase tracking-widest text-xs"
                                >
                                    Connect Your First Platform
                                    <div className="w-5 h-5 bg-white/20 rounded-lg flex items-center justify-center">
                                        <Plus className="w-4 h-4" />
                                    </div>
                                </button>

                                <p className="mt-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                    Takes less than a minute to setup
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default DashboardLayout;
