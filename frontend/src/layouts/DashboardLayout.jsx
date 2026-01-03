import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../components/sidebars/DashboardSidebar.jsx';
import { useAuthStore } from '../store/export.js';
import { useProfileCache, useProfileRefresh } from '../hooks/useProfiles.js';
import Loader from '../components/skeletons/Loader.jsx';

const DashboardLayout = () => {
    const user = useAuthStore((state) => state.user);
    const { data: cacheData, isLoading: isLoadingCache } = useProfileCache(user?._id);
    const { data: refreshData, isLoading: isRefreshing, refetch: triggerRefresh } = useProfileRefresh(user?._id);

    const data = refreshData || cacheData;

    // Stale Check Logic
    useEffect(() => {
        if (!user?._id) return;

        if (!isLoadingCache) {
            if (!cacheData) {
                triggerRefresh();
            } else {
                const lastUpdated = cacheData.lastUpdated;
                const oneHour = 60 * 60 * 1000;
                const now = Date.now();

                if (!lastUpdated || (now - new Date(lastUpdated).getTime() > oneHour)) {
                    triggerRefresh();
                }
            }
        }
    }, [user, cacheData, isLoadingCache]);

    return (
        <div className="flex flex-1 overflow-hidden h-screen bg-white">
            <DashboardSidebar />
            <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-slate-50/50">
                {isLoadingCache && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                        <div className="relative flex items-center justify-center">
                            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        </div>
                    </div>
                )}

                {isRefreshing && <Loader text="Refreshing stats..." showLoading={true} />}

                <Outlet
                    context={{ data, isLoading: isLoadingCache }}
                />
            </main>
        </div>
    );
};

export default DashboardLayout;
