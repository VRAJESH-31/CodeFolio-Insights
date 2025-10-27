import {create} from "zustand";

const validThemes = ["light", "dark", "system"];

const useAuthStore = create((set) => ({
    theme: localStorage.getItem("theme") || "light",

    setTheme : (theme) => {
        if (validThemes.includes(theme)){
            localStorage.setItem("theme", theme);
            set({theme: theme})
        } else {
            console.log("Invalid theme");
        }
    }
}));

export default useAuthStore;