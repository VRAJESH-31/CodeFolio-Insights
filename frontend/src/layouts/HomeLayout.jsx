import { Outlet } from 'react-router-dom';
import { MainSidebar } from '@/components/sidebars/export.js';
import { MainNavbar } from '@/components/navbars/export.js';

const HomeLayout = () => {
    return (
        <div className="flex h-screen overflow-hidden bg-gradient-to-br from-green-50/30 via-white to-blue-50/30 font-sans">
            <MainSidebar />
            <div className="flex-1 flex flex-col min-w-0 h-full">
                <MainNavbar />
                <div className="flex-1 overflow-x-hidden relative">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default HomeLayout;
