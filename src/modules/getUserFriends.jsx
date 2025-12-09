import { getUserInfo } from '../modules/getUserInfo.jsx';
import axios from 'axios';

export async function getUserFriends() {
    const userInfo = await getUserInfo();
    const userId = userInfo.data.id;

    try {
        const response = await axios.get('http://127.0.0.1:8000/api/relations/' + userId);
        return response;
    }
    catch (error) {
        const status = error.response ? error.response.status : 'N/A';
        console.log(`Utilisateur non connecté (statut ${status}).`);
        return false; 
    }
}