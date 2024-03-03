import { useMeStore } from "@/store/me";
import { redirectIfNotAuthenticated } from "@/router/guards";

export default {
    path: '/',
    component: () => import('@/layouts/full/FullLayout.vue'),
    beforeEnter: redirectIfNotAuthenticated,
    children: [
        {
            name: 'dashboard',
            path: '/',
            component: () => import('@/views/dashboard/index.vue')
        }
    ]
};

