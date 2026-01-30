import api from '@/api/axios';
import { useAuth } from '@/composables/useAuth';
import router from '@/router';

/**
 * Flag pour éviter les appels multiples simultanés au refresh
 *
 * Problème : si 3 requêtes échouent simultanément avec 401,
 * on ne veut pas appeler /token/refresh 3 fois.
 * Solution : un seul appel, les autres attendent le résultat.
 */
let isRefreshing = false;

/**
 * File d'attente des requêtes en attente du refresh
 *
 * Chaque élément est un objet { resolve, reject } représentant
 * une Promise en attente. Une fois le refresh terminé, on résout
 * ou rejette toutes ces Promises.
 */
let failedQueue = [];

/**
 * Traite la file d'attente après le refresh
 *
 * @param {Error|null} error Erreur si le refresh a échoué
 * @param {string|null} token Nouveau token si le refresh a réussi
 */
const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

/**
 * INTERCEPTEUR DE REQUÊTE
 *
 * Exécuté AVANT chaque requête HTTP
 * Ajoute automatiquement l'access token dans le header Authorization
 */
api.interceptors.request.use(
  (config) => {
    const { getAccessToken } = useAuth();
    const token = getAccessToken();

    // Si un token existe, l'ajouter au header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * INTERCEPTEUR DE RÉPONSE
 *
 * Exécuté APRÈS chaque réponse HTTP
 * Gère automatiquement le refresh du token en cas de 401
 */
api.interceptors.response.use(
  // Cas de succès : retourner la réponse telle quelle
  (response) => response,

  // Cas d'erreur : gérer le refresh si 401
  async (error) => {
    const originalRequest = error.config;

    /**
     * Vérifications pour savoir si on doit tenter un refresh :
     * 1. Statut 401 (Unauthorized)
     * 2. Pas déjà en train de retry (évite la boucle infinie)
     * 3. Pas l'endpoint de refresh lui-même (sinon boucle infinie)
     * 4. Pas l'endpoint de login
     */
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== '/token/refresh' &&
      originalRequest.url !== '/login'
    ) {
      /**
       * CAS 1 : Un refresh est déjà en cours
       *
       * Mettre cette requête en file d'attente.
       * Elle sera relancée automatiquement quand le refresh terminera.
       */
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          // Ajouter à la file d'attente
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            // Le refresh a réussi : relancer la requête avec le nouveau token
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            // Le refresh a échoué : propager l'erreur
            return Promise.reject(err);
          });
      }

      /**
       * CAS 2 : Aucun refresh en cours, on lance le refresh
       */

      // Marquer cette requête comme "déjà retryée" pour éviter la boucle
      originalRequest._retry = true;

      // Indiquer qu'un refresh est en cours
      isRefreshing = true;

      const { refresh, getAccessToken } = useAuth();

      try {
        // Tenter le refresh
        const success = await refresh();

        if (success) {
          // Refresh réussi : récupérer le nouveau token
          const newToken = getAccessToken();

          // Traiter la file d'attente : résoudre toutes les Promises en attente
          processQueue(null, newToken);

          // Relancer la requête originale avec le nouveau token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } else {
          // Refresh échoué : traiter la file d'attente avec une erreur
          const refreshError = new Error('Refresh token invalide');
          processQueue(refreshError, null);

          // Rediriger vers la page de login
          router.push('/login');

          return Promise.reject(refreshError);
        }
      } catch (refreshError) {
        // Exception lors du refresh : traiter la file d'attente
        processQueue(refreshError, null);

        // Rediriger vers la page de login
        router.push('/login');

        return Promise.reject(refreshError);
      } finally {
        // Réinitialiser le flag
        isRefreshing = false;
      }
    }

    // Pour toute autre erreur, la propager
    return Promise.reject(error);
  }
);

export default api;