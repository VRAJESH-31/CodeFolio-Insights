import { Outlet } from 'react-router-dom';
import { TabNavigation } from '@/components/export.js';
import { Sidebar } from '@/components/sidebars/export.js';
import { usePreferenceStore } from '@/store/export.js';
import { PUBLIC_APIS_NAV_ITEMS } from '@/constants/navigation.js';

const PublicApisLayout = () => {

    const { pageView } = usePreferenceStore();

    return (
        <div className={`flex-1 flex ${pageView["Public APIs"] === "tab" ? "flex-col" : "flex-row"} min-w-0 bg-white overflow-hidden h-full`}>

            {pageView["Public APIs"] === "tab" ? <TabNavigation tabs={PUBLIC_APIS_NAV_ITEMS} /> : <Sidebar title='Public APIs' items={PUBLIC_APIS_NAV_ITEMS} />}

            <main className="flex-1 flex flex-col bg-slate-50/50 overflow-hidden">
                <Outlet />
            </main>
        </div>
    );
};

export default PublicApisLayout;
