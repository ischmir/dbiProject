import { createRouter, createWebHistory } from 'vue-router';

// Import your page components
import DashboardPage from '@/pages/DashboardPage.vue';
import ReportsPage from '@/pages/ReportsPage.vue';

const routes = [
  { path: '/', name: 'Dashboard', component: DashboardPage },
  { path: '/reports', name: 'Reports', component: ReportsPage },
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
