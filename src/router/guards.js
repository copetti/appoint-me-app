import { useMeStore } from "@/store/me";

export const redirectIfNotAuthenticated= (to, from, next) => {
    const meStore = useMeStore();
    if(!meStore.isLoggedIn){
        next({ name: 'login' });
    }
    next();
}

export const redirectIfAuthenticated = (to, from, next) => {
    const meStore = useMeStore();
    if(meStore.isLoggedIn){
        next({ name: 'dashboard' });
    }
    next();
}