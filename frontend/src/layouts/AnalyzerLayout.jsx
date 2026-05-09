import { Outlet } from 'react-router-dom';
import { TabNavigation } from '@/components/export.js';
import { Sidebar } from '@/components/sidebars/export.js';
import { usePreferenceStore } from '@/store/export.js';
import { ANALYZER_NAV_ITEMS } from '@/constants/navigation.js';

const AnalyzerLayout = () => {
  const { pageView } = usePreferenceStore();

  return (
    <div className={`flex-1 flex ${pageView['Analyzers'] === 'tab' ? 'flex-col' : 'flex-row'} min-w-0 bg-white overflow-hidden h-full`}>
      {pageView['Analyzers'] === 'tab' ? <TabNavigation tabs={ANALYZER_NAV_ITEMS} /> : <Sidebar title="Analyzers" items={ANALYZER_NAV_ITEMS} />}

      <main className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-slate-50/50">
        <div className="max-w-7xl h-full mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AnalyzerLayout;
