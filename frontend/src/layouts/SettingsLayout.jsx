import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/export.js';
import { TabNavigation } from '@/components/export.js';
import { Sidebar } from '@/components/sidebars/export.js';
import { usePreferenceStore } from '@/store/export.js';
import { SETTINGS_NAV_ITEMS } from '@/constants/navigation.js';
import { SETTINGS_ANIMATION_STYLE } from '@/constants/styles.js';

const SettingsLayout = () => {
    const authUser = useAuthStore((state) => state.user);
    const [user, setUser] = useState(authUser);
    const pageView = usePreferenceStore((state) => state.pageView);

    // Sync local state when authUser changes
    useEffect(() => {
        if (authUser) setUser(authUser);
    }, [authUser]);

    return (
        <div className={`flex ${pageView["Settings"]=="tab" ? "flex-col" : "flex-row"} h-full w-full bg-gradient-to-br fromblue-50/30 via-white to-purple-50/30 font-sans overflow-hidden`}>
            <style>{SETTINGS_ANIMATION_STYLE}</style>

            {pageView["Settings"]=="tab" ? <TabNavigation tabs={SETTINGS_NAV_ITEMS} /> : <Sidebar title='Settings' items={SETTINGS_NAV_ITEMS} />}

            <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                <div className="w-full h-full animate-float-in">
                    <Outlet context={{ user, setUser }} />
                </div>
            </div>
        </div>
    );
};

export default SettingsLayout;
