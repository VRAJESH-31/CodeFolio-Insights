import {create} from "zustand";

const validAuthTypes = ["Email-Password Auth", "Google Auth"];

const useAuthStore = create((set) => ({
    user : null,
    token : localStorage.getItem("token") || null,
    authType : "",

    setAuth : (user, token, authType) => {
        if (validAuthTypes.includes(authType)){
            localStorage.setItem("token", token);
            set({user: user, token: token, authType: authType});   
        } else {
            console.log("Invalid Auth Type");
        }
    },

    logout : () => {
        localStorage.removeItem("token");
        set({user:null, token: null, authType: ""});
    },
}));

export default useAuthStore;