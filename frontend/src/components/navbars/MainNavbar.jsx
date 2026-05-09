import { usePreferenceStore } from '@/store/export.js';
import { PanelsTopLeft, LogOut } from 'lucide-react';
import { useLogout } from '@/hooks/useUsers.js';
import { useAuthStore } from '@/store/export.js';

const MainNavbar = () => {
  const { toggleSidebar } = usePreferenceStore();
  const { mutate: logout, isPending } = useLogout();
  const { user } = useAuthStore();

  return (
    <header className="h-12 flex items-center justify-between px-6 bg-white border-b-2 border-gray-200 flex-shrink-0 z-40 shadow-md">
      <button onClick={toggleSidebar} className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-slate-50 transition-all" title="Toggle Sidebar">
        <PanelsTopLeft size={20} />
      </button>

      {user && (
        <button onClick={() => logout()} disabled={isPending} className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-red-500 hover:bg-red-50 font-bold transition-all disabled:opacity-50 group" title="Sign Out">
          <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
        </button>
      )}
    </header>
  );
};

export default MainNavbar;
