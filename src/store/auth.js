// Utilities
import { defineStore } from 'pinia'
/* importing axios globally doesn't work */
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
    }),
    actions:{
        sanctum(){
            return axios.get('sanctum/csrf-cookie')
        },
        login(email, password){
            return axios.post('api/login', {
                email,
                password,
            }).then((response) => {
                this.user = response.data.data
            })
        }
    },
    getters:{
        isLoggedIn: (state) => !!state?.user?.id
    },
})
