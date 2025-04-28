//
import { createRouter, createWebHistory } from 'vue-router';
// Layouts
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
// Views
import DashboardView from '@/views/DashboardView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';


const MockupComponent = { template: '<div>Mockup Page</div>' }; // Fallback for mockup routes

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: AuthLayout,
    meta: {
      title: 'Authentication',
      showInNav: false,
    },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: LoginView,
      },
      {
        path: 'register',
        name: 'Register',
        component: RegisterView,
      },
    ],
  },
  {
    path: '/Dashboard',
    name: 'Default',
    component: DefaultLayout,
    meta: {
      title: 'DefaultLayout',
    },
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: DashboardView,
        meta: {
          title: 'Dashboard',
          iconName: 'dashboard',
        },
      },
      {
        path: '/reports',
        name: 'Reports',
        component: MockupComponent,
        meta: {
          title: 'Rapporter',
          iconName: 'report',
        },
      },
      {
        path: '/deadlines',
        name: 'Deadlines',
        component: MockupComponent,
        meta: {
          title: 'Overskredet Deadline',
          iconName: 'warning',
        },
      },
      {
        path: '/fill-in-form',
        name: 'Fill in form',
        component: MockupComponent,
        meta: {
          title: 'Udfyld skema',
          iconName: 'edit-schedule',
        },
      },
      {
        path: '/form-overview',
        name: 'Form Overview',
        component: () => import('../views/FormOverviewView.vue'),
        meta: {
          title: 'Schemaoversigt',
          iconName: 'schema',
        },
      },
      {
        path: '/users',
        name: 'Users',
        component: MockupComponent,
        meta: {
          title: 'Brugere',
          iconName: 'users',
        },
      },
      {
        path: '/groups',
        name: 'Groups',
        component: MockupComponent,
        meta: {
          title: 'Grupper',
          iconName: 'groups',
        },
      },
      {
        path: '/documents',
        name: 'Documents',
        component: MockupComponent,
        meta: {
          title: 'Dokumenter',
          iconName: 'folder',
        },
      },
      {
        path: '/plans',
        name: 'Plans',
        component: MockupComponent,
        meta: {
          title: 'Planlægning',
          iconName: 'edit-calendar',
        },
      },
      {
        path: '/calendar',
        name: 'Calendar',
        component: MockupComponent,
        meta: {
          title: 'Kalender',
          iconName: 'calendar',
        },
      },
      {
        path: '/settings',
        name: 'Administration',
        component: MockupComponent,
        meta: {
          title: 'Administration',
          iconName: 'settings',
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log('before each', to.meta);
  if (to.meta.requireAuth === true && !localStorage.getItem('token')) {
    router.push('/login');
    alert('MAX SECURITY LOGIN ALERT! #safety');
  }
  next();
});

export default router;
