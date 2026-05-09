import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePreferenceStore = create(
    persist(
        (set) => ({
            colorMode: "light",
            isSidebarOpen: true,
            themeVariant: "blue",
            layout: "comfortable",
            pageView: {
                "Analyzers": "tab",
                "Public APIs": "tab",
                "Settings": "tab",
            },

            setColorMode: (colorMode) => set({ colorMode }),

            toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
            
            setThemeVariant: (themeVariant) => set({ themeVariant }),

            setPageView: (pageName, viewType) => set((state) => {
                if ((pageName !== "Analyzers" && pageName !== "Public APIs" && pageName !== "Settings") || (viewType !== "tab" && viewType !== "sidebar")) {
                    return state;
                }

                return { pageView: { ...state.pageView, [pageName]: viewType } }
            }),

            setLayout: (layout) => set((state) => {
                if (layout !== "compact" && layout !== "comfortable" && layout !== "spacious") {
                    return state;
                }

                return { layout };
            }),
        }),
        {
            name: "preference-storage",
        }
    )
);

export default usePreferenceStore;