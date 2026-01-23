import axios from 'axios';

axios.defaults.withCredentials = true;

const apiUrl = import.meta.env.VITE_API_URL;

export async function isUserConnected() {
    try {
        const csrf = await axios.get(apiUrl + '/sanctum/csrf-cookie');
        const response = await axios.get(apiUrl + '/api/user');
        
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