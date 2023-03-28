import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL;
console.log('API_URL', process.env.REACT_APP_API_URL)
const $api = axios.create({
    validateStatus: function (status) {
        return status == 200 || status == 201;
    },
    withCredentials: true,
    baseURL: `${API_URL}/api/v1`,
});

$api.interceptors.request.use(async config => {
    config.headers.user_id = localStorage.getItem('user_id');
    return config;
});

$api.interceptors.response.use(
    config => {
        return config;
    },
    async error => {
        if (error.response.status == 401) {
            localStorage.removeItem('user_id');
            window.location = '/login'
        }
        throw error;
    },
);

export default $api;
