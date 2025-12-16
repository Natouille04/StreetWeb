import axios from 'axios';

axios.defaults.withCredentials = true;

export async function isUserConnected() {
    try {
        await axios.get('https://backend.streetweb.fr/sanctum/csrf-cookie', {
            withCredentials: true
        });

        const response = await axios.get('https://backend.streetweb.fr/api/user', {
            withCredentials: true
        });
        return true;
    }

    catch (error) {
        const status = error.response ? error.response.status : 'N/A';
        console.log(`Utilisateur non connecté (statut ${status}).`);
        return false;
    }
}