// Utilities
import { defineStore } from 'pinia'
import { useMeStore } from "@/store/me";

/* importing axios globally doesn't work */
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export const useAuthStore = defineStore('auth', {
    state: () => ({}),
    actions:{
        sanctum(){
            return axios.get('sanctum/csrf-cookie')
        },
        login(email, password){
            return axios.post('api/login', {
                email,
                password,
            }).then((response) => {
                const meStore = useMeStore();
                meStore.user = response.data.data
            })
        },
        register(firstName, email, password){
            return axios.post('api/register', {
                first_name: firstName,
                email,
                password
            })
        }
    },
    getters:{},
})
