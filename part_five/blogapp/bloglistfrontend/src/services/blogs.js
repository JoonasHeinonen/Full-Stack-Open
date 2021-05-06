import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
    token = `bearer ${newToken}`;
};

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const create = async (newObject, auth) => {
    setToken(auth);
    
    const config = {
        headers: { Authorization: token },
    };

    const res = await axios.post(baseUrl, newObject, config);
    return res.data;
};

const deleteBlog = async (auth) => {

};

const update = (blog, newBlog) => {
    const req = axios.put(`${baseUrl}/${blog.id}`, newBlog);

    return req.then(
        res => res.data
    );
};

export default { setToken, getAll, create, update };