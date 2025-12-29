import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePreferenceStore = create(
    persist(
        (set) => ({
            theme: "light",
            isSidebarOpen: true,

            setTheme: (theme) => set({ theme }),
            toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
            setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
        }),
        {
            name: "preference-storage",
        }
    )
);

export default usePreferenceStore;