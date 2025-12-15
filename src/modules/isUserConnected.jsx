import axios from 'axios';

axios.defaults.withCredentials = true; 

export async function isUserConnected() {
    try {
        const response = await axios.get('http://192.168.1.142:8000/api/user');
        return true;
    } 
    
    catch (error) {
        const status = error.response ? error.response.status : 'N/A';
        console.log(`Utilisateur non connecté (statut ${status}).`);
        return false;
    }
}