import axios from 'axios';
import { getUserInfo } from "./getUserInfo";

axios.defaults.withCredentials = true;

async function addFriend(identifier) {
    await axios.get('http://192.168.1.142:8000/sanctum/csrf-cookie', {
        withCredentials: true
    });

    const userInfo = await getUserInfo();

    return axios.post(
        'http://192.168.1.142:8000/api/relations/create',
        {
            user_id: userInfo.identifier.toString(),
            friend_id: identifier.toString()
        },
        { withCredentials: true }
    );
}

export { addFriend };