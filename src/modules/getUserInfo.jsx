import axios from 'axios';

axios.defaults.withCredentials = true;

/**
 * @returns {Promise<object|null>} Resolves with user data on success, or null on failure.
 */

export async function getUserInfo(identifier = null) {
    if (identifier != null) {
        return null; 
    }

    try {
        await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', { 
            withCredentials: true 
        });

        const response = await axios.get('http://127.0.0.1:8000/api/user', { 
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
