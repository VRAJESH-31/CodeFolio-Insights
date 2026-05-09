import { useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { DashboardSidebar } from '@/components/sidebars/export.js';
import { useProfileCache, useProfileRefresh } from '@/hooks/useProfiles.js';
import { useUser } from '@/hooks/useUsers.js';
import { LoaderLabel } from '@/components/loaders/export.js';
import { DashboardSkeleton } from '@/components/skeletons/export.js';
import { PageNotFound } from '@/pages/export.js';

const DashboardLayout = () => {
  const { displayName } = useParams();
  const { data: cacheData, isLoading: isLoadingCache, isError: isCachingError } = useProfileCache(displayName);
  const { data: refreshData, isLoading: isRefreshing, refetch: triggerRefresh } = useProfileRefresh(displayName);
  const { data: userData, isLoading: isLoadingUser, isError: isUserError } = useUser(displayName);

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

        if (!lastUpdated || now - new Date(lastUpdated).getTime() > dataRefreshRateInMs) {
          triggerRefresh();
        }
      }
    }
  }, [displayName, cacheData, isLoadingCache]);

  if (isLoadingUser || isLoadingCache) {
    return <DashboardSkeleton />;
  } else if (!data || isUserError || isCachingError) {
    return <PageNotFound />;
  } else {
    return (
      <div className="flex flex-1 overflow-hidden bg-white h-full">
        <DashboardSidebar userData={userData} />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-slate-50/50 h-full">
          {isRefreshing && <LoaderLabel text="Refreshing stats..." showLoading={true} />}

          <Outlet
            context={{
              data,
            }}
          />
        </main>
      </div>
    );
  }
};

export default DashboardLayout;
