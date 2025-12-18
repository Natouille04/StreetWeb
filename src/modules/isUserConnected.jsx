import axios from 'axios';

axios.defaults.withCredentials = true;


export async function isUserConnected() {
    try {
        const csrf = await axios.get('https://backend.streetweb.fr/sanctum/csrf-cookie');
        const response = await axios.get('https://backend.streetweb.fr/api/user');
        
        if (response.data) {
            return true; 
        }

        return false;
    } 
    
    catch (error) {
        console.log(`Utilisateur non connecté (statut ${error.response?.status ?? 'N/A'}).`);
        return false;
    }
}