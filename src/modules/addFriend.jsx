import axios from 'axios';
import { getUserInfo } from "./getUserInfo";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

async function addFriend(identifier) {
    await axios.get('https://backend.streetweb.fr/sanctum/csrf-cookie', {
        withCredentials: true
    });

    const userInfo = await getUserInfo();

    return axios.post(
        'https://backend.streetweb.fr/api/relations/create',
        {
            user_id: userInfo.identifier.toString(),
            friend_id: identifier.toString()
        },
        { withCredentials: true }
    );
}

export { addFriend };