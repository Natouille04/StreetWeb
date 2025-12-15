import { getUserInfo } from '../modules/getUserInfo.jsx';
import axios from 'axios';

export async function getUserFriends() {
    const userInfo = await getUserInfo();
    const userId = userInfo.id;

    try {
        const response = await axios.get('http://192.168.1.142:8000/api/relations/' + userId);
        return response;
    }
    
    catch (error) {
        const status = error.response ? error.response.status : 'N/A';
        console.log(`Utilisateur non connecté (statut ${status}).`);
        return false; 
    }
}