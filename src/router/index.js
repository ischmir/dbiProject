import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/userStore.js';
import RegisterView from '@/views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';
import FormOverviewView from '@/views/FormOverviewView.vue';
import FormLibraryView from '@/views/FormLibraryView.vue';
import CheckpointsView from '@/views/CheckpointsView.vue';

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
    component: () => import('@/layouts/DefaultLayout.vue'),
    redirect: '/dashboard',
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/DashboardView.vue'),
        meta: {
          title: 'Dashboard',
          iconName: 'dashboard',
          requireAuth: true,
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
          requiresAdmin: true,
        },
      },
      {
        path: 'form-overview',
        name: 'Form Overview',
        component: FormOverviewView,
        meta: {
          title: 'Skemaoversigt',
          iconName: 'schema',
        },
      },
      {
        path: 'form-library',
        name: 'Form Library',
        component: FormLibraryView,
        meta: {
          title: 'Skemabibliotek',
          iconName: 'library',
          hide: true,
        },
      },
      {
        path: 'checkpoints',
        name: 'Checkpoints',
        component: CheckpointsView,
        meta: {
          title: 'Tjekpunkter',
          iconName: 'checkpoints',
          hide: true,
        },
      },
      {
        path: 'create-form',
        name: 'Create Form',
        component: () => import('@/views/DragAndDropView.vue'),
        meta: {
          title: 'Skema',
          hide: true,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const user = useUserStore();

  // Wait for the user store to initialize if not ready
  if (!user.ready) {
    console.log('Waiting for user store to initialize...');
    await user.init();
  }

  // Guard the route based on meta fields
  const requiresAuth = to.matched.some((r) => r.meta.requireAuth);
  const requiresAdmin = to.matched.some((r) => r.meta.requiresAdmin);

  if (requiresAuth && !user.loggedIn) {
    console.log('Redirecting to login...');
    if (to.path !== '/login') {
      return next({ path: '/login', query: { redirect: to.fullPath } });
    }
    return next();
  }

  if (requiresAdmin && user.role !== 'admin') {
    console.log('Redirecting to not authorized...');
    return next('/not-authorized');
  }

  next();
});

export { routes }; // Export the routes array
export default router; // Export the router instance
