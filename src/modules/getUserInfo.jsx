import axios from 'axios';

axios.defaults.withCredentials = true;

/**
 * @returns {Promise<object|null>} Resolves with user data on success, or null on failure.
 */

export async function getUserInfo(identifier = null) {
    if (identifier == null) {
        try {
            const response = await axios.get('http://192.168.1.142:8000/api/user');
            return response.data;
        }

        catch (error) {
            const status = error.response?.status || 'N/A';
            console.log(`Utilisateur non connecté (statut ${status}).`);
            return null;
        }
    }
}