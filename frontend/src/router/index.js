import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import MissionListView from "@/views/MissionListView.vue";
import LoginView from '@/views/LoginView.vue';

const routes = [
    { path: "/login", name: "login", component: LoginView, meta: { requiresGuest: true } },
    { path: "/", name: "missions", component: MissionListView, meta: { requiresAuth: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

/**
 * Guard de navigation global
 *
 * Exécuté avant chaque changement de route
 * Vérifie les permissions selon les meta de la route
 */
let isInit = false;

router.beforeEach( async(to, from, next) => {
  const { isAuthenticated, refresh } = useAuth();

  if (!isInit) {
    await refresh();
    isInit = true;
  }

  // Route protégée nécessitant une authentification
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    // Rediriger vers login en conservant la destination souhaitée
    next({
      name: 'login',
      query: { redirect: to.fullPath },
    });
    return;
  }

  // Route réservée aux invités (ex: login)
  if (to.meta.requiresGuest && isAuthenticated.value) {
    // Rediriger vers l'accueil si déjà connecté
    next({ name: 'missions' });
    return;
  }

  // Autoriser la navigation
  next();
});

export default router;