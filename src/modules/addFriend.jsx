import axios from 'axios';
import { getUserInfo } from "./getUserInfo";

axios.defaults.withCredentials = true;

const apiUrl = import.meta.env.VITE_API_URL;

async function addFriend(identifier) {
    await axios.get(apiUrl + '/sanctum/csrf-cookie', {
        withCredentials: true
    });

    const userInfo = await getUserInfo();

    return axios.post(
        apiUrl + '/api/relations/create',
        {
            user_id: userInfo.identifier.toString(),
            friend_id: identifier.toString()
        },
        { withCredentials: true }
    );
}

export { addFriend };