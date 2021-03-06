import axios from 'axios';
const baseUrl = 'http://127.0.0.1:3001/api/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request
        .then(response => response.data);
}

const create = (newPerson) => {
    const request = axios
        .post(baseUrl, newPerson);
    return request
        .then(response => response.data);
}

const update = (id, newPerson) => {
    const request = axios
        .put(`${baseUrl}/${id}`, newPerson);
    return request
        .then(response => response.data);
}

const remove = (id, object) => {
    const request = axios
        .delete(`${baseUrl}/${id}`, object);
    return request
        .then(response => response.data);
}

export default { getAll, create, update, remove };