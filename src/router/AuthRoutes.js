import { useMeStore } from "@/store/me";
import { redirectIfAuthenticated } from "@/router/guards";

export default [
    {
        path: '/login',
        component: () => import('@/layouts/blank/BlankLayout.vue'),
        beforeEnter: redirectIfAuthenticated,
        children: [
            {
                name: 'login',
                path: '',
                component: () => import('@/views/auth/Login.vue')
            },
        ]
    },
    {
        path: '/register',
        component: () => import('@/layouts/blank/BlankLayout.vue'),
        children: [
            {
                name: 'register',
                path: '',
                component: () => import('@/views/auth/Register.vue')
            },
        ]
    }
];

