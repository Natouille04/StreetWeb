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

        return response.data;
    } 
    
    catch (error) {
        console.log(`Utilisateur non connecté (statut ${error.response?.status ?? 'N/A'}).`);
        return null;
    }
}