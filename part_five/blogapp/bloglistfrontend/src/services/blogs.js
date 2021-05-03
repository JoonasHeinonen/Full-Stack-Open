import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
    token = `bearer ${newToken}`;
};

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const create = async (newObject, auth) => {
    setToken(auth);
    
    const config = {
        headers: { Authorization: token },
    };

    const res = await axios.post(baseUrl, newObject, config);
    return res.data;
}

export default { setToken, getAll, create };