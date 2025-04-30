import { createRouter, createWebHistory } from 'vue-router';
// Views
import DashboardView from '@/views/DashboardView.vue';
import RegisterView from '@/views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';
import FormOverviewView from '@/views/FormOverviewView.vue';
import FormLibraryComp from '@/components/FormLibraryComp.vue';
import CheckpointsComp from '@/components/CheckpointsComp.vue';

// Layouts
import DefaultLayout from '@/layouts/DefaultLayout.vue';


const MockupComponent = { template: '<div>Mockup Page</div>' }; // Fallback for mockup routes

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: {
      title: 'Login',
      requireAuth: false,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta: {
      title: 'Register',
      requireAuth: false,
    },
  },
  {
    path: '/',
    name: 'Default',
    component: DefaultLayout,
    redirect: '/dashboard',
    meta: {
      // requireAuth: true,
    },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardView,
        meta: {
          title: 'Dashboard',
          iconName: 'dashboard',
          // requireAuth: true,
        },
      },
      {
        path: 'reports',
        name: 'Reports',
        component: MockupComponent,
        meta: {
          title: 'Rapporter',
          iconName: 'report',
          requireAuth: true,
        },
      },
      {
        path: 'deadlines',
        name: 'Deadlines',
        component: MockupComponent,
        meta: {
          title: 'Overskredet Deadline',
          iconName: 'warning',
          requireAuth: true,
        },
      },
      {
        path: 'fill-in-form',
        name: 'Fill in form',
        component: MockupComponent,
        meta: {
          title: 'Udfyld skema',
          iconName: 'edit-schedule',
          requireAuth: true,
        },
      },
      {
        path: 'form-overview',
        name: 'Form Overview',
        component: () => import('../views/FormOverviewView.vue'),
        meta: {
          title: 'Schemaoversigt',
          iconName: 'schema',
          // requireAuth: true,
        },
      },
      {
        path: 'users',
        name: 'Users',
        component: MockupComponent,
        meta: {
          title: 'Brugere',
          iconName: 'users',
          requireAuth: true,
        },
      },
      {
        path: 'groups',
        name: 'Groups',
        component: MockupComponent,
        meta: {
          title: 'Grupper',
          iconName: 'groups',
          requireAuth: true,
        },
      },
      {
        path: 'documents',
        name: 'Documents',
        component: MockupComponent,
        meta: {
          title: 'Dokumenter',
          iconName: 'folder',
          requireAuth: true,
        },
      },
      {
        path: 'plans',
        name: 'Plans',
        component: MockupComponent,
        meta: {
          title: 'Planlægning',
          iconName: 'edit-calendar',
          requireAuth: true,
        },
      },
      {
        path: 'calendar',
        name: 'Calendar',
        component: MockupComponent,
        meta: {
          title: 'Kalender',
          iconName: 'calendar',
          requireAuth: true,
        },
      },
      {
        path: 'settings',
        name: 'Administration',
        component: MockupComponent,
        meta: {
          title: 'Administration',
          iconName: 'settings',
          requireAuth: true,
        },
      },
      {
        path: 'form-overview',
        name: 'Form Overview',
        component: FormOverviewView,
        meta: {
          title: 'Schemaoversigt',
          iconName: 'schema',
          // requireAuth: true,
        },
      },
      {
        path: 'form-library',
        name: 'Form Library',
        component: FormLibraryComp,
        meta: {
          title: 'Skemabibliotek',
          iconName: 'library',
          // requireAuth: true,
        },
      },
      {
        path: 'checkpoints',
        name: 'Checkpoints',
        component: CheckpointsComp,
        meta: {
          title: 'Tjekpunkter',
          iconName: 'checkpoints',
          // requireAuth: true,
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

  // Check if any matched route requires authentication
  const requiresAuth = to.matched.some(record => record.meta.requireAuth);

  if (requiresAuth && !localStorage.getItem('token')) {
    console.log('Redirecting to login...');
    // Redirect to login if the user is not authenticated
    next({ path: '/login', query: { redirect: to.fullPath } });
  } else {
    console.log('Proceeding to route...');
    next();
  }
});

export default router;
