import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
// Views
import DashboardView from '@/views/DashboardView.vue';
import RegisterView from '@/views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';
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
          requiresAdmin: true,
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
  const user = useUserStore();

  // If store hasn’t loaded auth state yet, wait for it
  if (!user.ready) {
    const unwatch = user.$subscribe(() => {
      if (user.ready) {
        unwatch();
        guardRoute();
      }
    });
  } else {
    guardRoute();
  }

  function guardRoute() {
    const requiresAuth  = to.matched.some(r => r.meta.requireAuth);
    const requiresAdmin = to.matched.some(r => r.meta.requiresAdmin);

    if (requiresAuth && !user.loggedIn) {
      return next({ path: '/login', query: { redirect: to.fullPath } });
    }
    if (requiresAdmin && user.role !== 'admin') {
      return next('/not-authorized');
    }
    next();
  }
});

export default router;
