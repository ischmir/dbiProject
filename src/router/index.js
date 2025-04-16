import { createRouter, createWebHistory } from 'vue-router';

// Import your page components
import DashboardPage from '@/pages/DashboardPage.vue';
import ReportsPage from '@/pages/ReportsPage.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { 
            path: '/',
            name: 'Dashboard',
            component: DashboardPage 
        },
        {
            path: '/reports',
            name: 'Reports',
            component: ReportsPage
        },
    ]
});  

export default router;