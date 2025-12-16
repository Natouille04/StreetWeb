import axios from 'axios';

axios.defaults.withCredentials = true;

/**
 * @returns {Promise<object|null>} Resolves with user data on success, or null on failure.
 */

export async function getUserInfo(identifier = null) {
    if (identifier == null) {
        try {
            await axios.get('https://backend.streetweb.fr/sanctum/csrf-cookie', {
                withCredentials: true
            });

            const response = await axios.get('https://backend.streetweb.fr/api/user', {
                withCredentials: true
            });
            return response.data;
        }

        catch (error) {
            const status = error.response?.status || 'N/A';
            console.log(`Utilisateur non connecté (statut ${status}).`);
            return null;
        }
    }
}