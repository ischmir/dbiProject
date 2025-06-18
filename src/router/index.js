// Importerer Vue Router funktioner til at oprette router og historik
import { createRouter, createWebHistory } from "vue-router";
// Importerer bruger store til at håndtere authentication state
import { useUserStore } from "@/stores/userStore.js";
// Importerer view komponenter for forskellige sider
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import FormOverviewView from "@/views/FormOverviewView.vue";
import FormLibraryView from "@/views/FormLibraryView.vue";
import CheckpointsView from "@/views/CheckpointsView.vue";

// simpel placeholder-komponent til ruter, der endnu ikke har en rigtig side
const MockupComponent = { template: "<div>Mockup Page</div>" };

// Definerer alle ruter i applikationen
const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: {
      title: "Login",
      requireAuth: false, // Kræver IKKE admin
    },
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
    meta: {
      title: "Register",
      requireAuth: false, // Kræver IKKE admin
    },
  },
  {
    path: "/",
    name: "Default",
    component: () => import("@/layouts/DefaultLayout.vue"), // Lazy loading af layout
    redirect: "/dashboard", // Automatisk redirect til dashboard
    meta: {
      requireAuth: true, // Kræver admin
    },
    children: [
      // Nested ruter - alle disse vises inden i DefaultLayout
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/DashboardView.vue"), // Lazy loading
        meta: {
          title: "Dashboard",
          iconName: "dashboard",
          requireAuth: true,
        },
      },
      {
        path: "/reports",
        name: "Reports",
        component: MockupComponent, // Mockup komponent
        meta: {
          title: "Rapporter",
          iconName: "report",
          requireAuth: true, // Kræver admin rolle
        },
      },
      {
        path: "/deadlines",
        name: "Deadlines",
        component: MockupComponent,
        meta: {
          title: "Overskredet Deadline",
          iconName: "warning",
          requireAuth: true, // Kræver admin rolle
        },
      },
      {
        path: "/fill-in-form",
        name: "Fill in form",
        component: MockupComponent,
        meta: {
          title: "Udfyld skema",
          iconName: "edit-schedule",
          requireAuth: true, // Kræver admin rolle
        },
      },
      {
        path: "/form-overview",
        name: "Form Overview",
        component: FormOverviewView,
        meta: {
          title: "Skemaoversigt",
          iconName: "schema",
        },
      },
      {
        path: "/users",
        name: "Users",
        component: MockupComponent,
        meta: {
          title: "Brugere",
          iconName: "users",
          requireAuth: true, // Kræver admin rolle
        },
      },
      {
        path: "/groups",
        name: "Groups",
        component: MockupComponent,
        meta: {
          title: "Grupper",
          iconName: "groups",
          requireAuth: true, // Kræver admin rolle
        },
      },
      {
        path: "/documents",
        name: "Documents",
        component: MockupComponent,
        meta: {
          title: "Dokumenter",
          iconName: "folder",
          requireAuth: true, // Kræver admin rolle
        },
      },
      {
        path: "/plans",
        name: "Plans",
        component: MockupComponent,
        meta: {
          title: "Planlægning",
          iconName: "edit-calendar",
          requireAuth: true, // Kræver admin rolle
        },
      },
      {
        path: "/calendar",
        name: "Calendar",
        component: MockupComponent,
        meta: {
          title: "Kalender",
          iconName: "calendar",
          requireAuth: true, // Kræver admin rolle
        },
      },
      {
        path: "/settings",
        name: "Administration",
        component: MockupComponent,
        meta: {
          title: "Administration",
          iconName: "settings",
          requireAuth: true,
          requiresAdmin: true, // Kræver admin rolle
        },
      },
      {
        path: "/form-library",
        name: "Form Library",
        component: FormLibraryView,
        meta: {
          title: "Skemabibliotek",
          iconName: "library",
          hide: true, // Skjules fra navigation menu
        },
      },
      {
        path: "/checkpoints",
        name: "Checkpoints",
        component: CheckpointsView,
        meta: {
          title: "Tjekpunkter",
          iconName: "checkpoints",
          hide: true, // Skjules fra navigation menu
        },
      },
      {
        path: "/form-editor/:id", // Dynamisk parameter - id af skemaet
        name: "Create Form",
        component: () => import("@/views/FormEditorView.vue"), // Lazy loading
        meta: {
          title: "Skema",
          hide: true, // Skjules fra navigation menu
          requireAuth: true,
          requiresAdmin: true, // Kun admins kan redigere skemaer
        },
      },
    ],
  },
];

// Opretter router instans med web history mode (URLs uden #)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation Guard - køres før hver navigation
router.beforeEach(async (to, from, next) => {
  // from; bruges ikke
  const user = useUserStore();

  // Venter på at user store er initialiseret hvis den ikke er klar
  if (!user.ready) {
    console.log("Waiting for user store to initialize...");
    await user.init();
  }

  // Tjekker route meta felter for at bestemme adgangskrav
  const requiresAuth = to.matched.some(r => r.meta.requireAuth); // Kræver authentication?
  const requiresAdmin = to.matched.some(r => r.meta.requiresAdmin); // Kræver admin rolle?

  // Hvis siden kræver authentication og bruger ikke er logget ind
  if (requiresAuth && !user.loggedIn) {
    console.log("Redirecting to login...");
    if (to.path !== "/login") {
      // Redirect til login med original destination gemt i query parameter
      return next({ path: "/login", query: { redirect: to.fullPath } });
    }
    return next();
  }

  // Hvis siden kræver admin rolle og bruger ikke er admin
  if (requiresAdmin && user.role !== "admin") {
    console.log("Redirecting to not authorized...");
    return next("/not-authorized");
  }

  // Alt er OK - fortsæt til destination
  next();
});

export { routes }; // Eksporterer routes array
export default router; // Eksporterer router instans
