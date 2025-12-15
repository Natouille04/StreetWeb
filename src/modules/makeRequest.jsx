import axios from 'axios';

async function makeRequest(method, url, body = {}) {
    body.withCredentials = true;

    try {
        await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
            withCredentials: true
        });

        if (method == "get") {
            await axios.get(url, body);
        }

        if (method == "post") {
            await axios.post(url, body);
        }
    }

    catch (err) {
        console.log("erreur : " + err)
    }
}

export { makeRequest };