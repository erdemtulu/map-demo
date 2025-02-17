import axios from 'axios';
//IMPORTANT
//Local Storage is used to store tokens since HttpOnly Cookies are not supported on the backend project
const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: false // change this to true to use HttpOnly cookies
});
api.interceptors.request.use(
    (config) => {
        config.headers["Content-Type"] = "application/json";
        config.headers["Access-Control-Request-Headers"] = "*";
        config.headers["Access-Control-Request-Method"] = "*";
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

export { api };