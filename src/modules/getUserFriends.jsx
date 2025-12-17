import { getUserInfo } from '../modules/getUserInfo.jsx';
import axios from 'axios';

export async function getUserFriends() {
    const userInfo = await getUserInfo();
    const userId = userInfo.id;

    try {
        await axios.get('https://backend.streetweb.fr/anctum/csrf-cookie', {
            withCredentials: true
        });

        const response = await axios.get('https://backend.streetweb.fr/api/relations/' + userId);
        return response;
    }

    catch (error) {
        const status = error.response ? error.response.status : 'N/A';
        console.log(`Utilisateur non connecté (statut ${status}).`);
        return false;
    }
}