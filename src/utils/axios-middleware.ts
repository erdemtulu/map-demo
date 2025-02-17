import axios from 'axios';
//IMPORTANT
//Local Storage is used to store tokens since HttpOnly Cookies are not supported on the backend project
const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: false
});
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken') || '';
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)