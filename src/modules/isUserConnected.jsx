import axios from 'axios';

axios.defaults.withCredentials = true;

export async function isUserConnected() {
    try {
        await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', { 
            withCredentials: true 
        });

        const response = await axios.get('http://127.0.0.1:8000/api/user', { 
            withCredentials: true 
        });
        
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