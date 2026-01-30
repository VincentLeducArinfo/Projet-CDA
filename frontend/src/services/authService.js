import api from '@/api/axios';
import { useAuth } from '@/composables/useAuth';

/**
 * Authentifie un utilisateur
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>} Données incluant l'access_token et les infos utilisateur
 *
 * Le refresh_token est automatiquement stocké en cookie par le navigateur
 * grâce à withCredentials: true et au Set-Cookie envoyé par le serveur
 */
export async function login(email, password) {
    const response = await api.post('../auth', {
        email,
        password,
    });

    // response.data contient : { token: "...", user: {...} }
    // ou selon votre configuration : { access_token: "...", user: {...} }
    return response.data;
}

/**
 * Rafraîchit l'access token à l'aide du refresh token
 *
 * @returns {Promise<string>} Le nouvel access token
 *
 * Le refresh_token est automatiquement envoyé dans le cookie grâce à withCredentials
 * Le serveur vérifie ce cookie, génère un nouvel access_token,
 * et renvoie un nouveau refresh_token en cookie (rotation)
 */
export async function refreshToken() {
    const response = await api.post('/token/refresh');
    // response.data contient : { token: "..." }
    return response.data.token;
}

/**
 * Déconnecte l'utilisateur
 *
 * @returns {Promise<void>}
 *
 * Note : Gesdinet ne fournit pas d'endpoint de logout par défaut
 * Si vous en créez un, il doit supprimer le refresh_token de la BDD
 * et renvoyer un cookie vide pour l'effacer côté navigateur
 */
export async function logout() {
    // Si vous avez un endpoint de logout
    console.log("invalidation du cookie...");

    const { getAccessToken } = useAuth();
    const accessToken = getAccessToken();

    const data = {
        token: accessToken
    }

    const response = await api.post('/token/invalidate', data);
    console.log(response.data);

    // Sinon, simplement effacer l'état local suffit
    // Le refresh_token expirera naturellement après 7 jours
}