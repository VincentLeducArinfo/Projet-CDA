import { ref, computed } from 'vue';
import { login as loginService, refreshToken as refreshService, logout as logoutService } from '@/services/authService';

/**
 * État global d'authentification
 *
 * Ces variables sont définies HORS de la fonction useAuth(),
 * ce qui en fait un singleton partagé entre tous les composants.
 * Même si plusieurs composants appellent useAuth(), ils accèdent
 * au même état.
 */
const accessToken = ref(null);
const user = ref(null);

/**
 * Composable pour gérer l'authentification
 *
 * Fournit des méthodes pour login, logout, refresh
 * et expose l'état d'authentification de manière réactive
 */
export function useAuth() {
  /**
   * Computed indiquant si l'utilisateur est authentifié
   * Réactif : se met à jour automatiquement quand accessToken change
   */
  const isAuthenticated = computed(() => !!accessToken.value);

  /**
   * Connecte un utilisateur
   *
   * @param {string} email
   * @param {string} password
   * @returns {Promise<boolean>} true si succès
   *
   * En cas de succès :
   * - accessToken est stocké en mémoire (variable réactive)
   * - user est stocké en mémoire (variable réactive)
   * - refresh_token est automatiquement stocké en cookie par le navigateur
   */
  const login = async (email, password) => {
    try {
      const data = await loginService(email, password);

      // Stocker l'access token en mémoire
      // Ce token disparaîtra au rechargement de la page
      accessToken.value = data.token;
      user.value = data.user;

      console.log(accessToken.value);

      return true;
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error;
    }
  };

  /**
   * Rafraîchit l'access token
   *
   * @returns {Promise<boolean>} true si succès, false si échec
   *
   * Utilise le refresh_token stocké en cookie (envoyé automatiquement)
   * pour obtenir un nouvel access_token.
   *
   * Si le refresh échoue (refresh_token invalide ou expiré),
   * l'utilisateur est considéré comme déconnecté.
   */
  const refresh = async () => {
    try {
      const newAccessToken = await refreshService();
      accessToken.value = newAccessToken;
      return true;
    } catch (error) {
      // Le refresh a échoué : déconnexion
      console.error('Erreur de refresh:', error);
      accessToken.value = null;
      user.value = null;
      return false;
    }
  };

  /**
   * Déconnecte l'utilisateur
   *
   * Nettoie l'état local et appelle le service de logout
   * qui devrait révoquer le refresh_token côté serveur
   */
  const logout = async () => {
    try {
      await logoutService();
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    } finally {
      // Nettoyer l'état même en cas d'erreur
      accessToken.value = null;
      user.value = null;
    }
  };

  /**
   * Récupère le token actuel
   *
   * @returns {string|null} L'access token ou null
   *
   * Utilisé par l'intercepteur Axios pour ajouter le token aux requêtes
   */
  const getAccessToken = () => accessToken.value;

  /**
   * Définit manuellement l'access token
   *
   * @param {string} token
   *
   * Utile après un refresh réussi ou lors de la restauration de session
   */
  const setAccessToken = (token) => {
    accessToken.value = token;
  };

  // Exposer les propriétés et méthodes
  return {
    // État réactif (computed pour éviter les modifications directes)
    isAuthenticated,
    user: computed(() => user.value),

    // Méthodes
    login,
    logout,
    refresh,
    getAccessToken,
    setAccessToken,
  };
}