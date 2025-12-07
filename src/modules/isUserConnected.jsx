import axios from 'axios';

axios.defaults.withCredentials = true; 

export async function isUserConnected() {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/user');
        console.log('Utilisateur connecté');

        return true;
    } 
    
    catch (error) {
        const status = error.response ? error.response.status : 'N/A';
        console.log(`Utilisateur non connecté (statut ${status}).`);

        return false;
    }
}