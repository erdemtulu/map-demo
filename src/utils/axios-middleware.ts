import axios from 'axios';
//IMPORTANT
//Local Storage is used to store tokens since HttpOnly Cookies are not supported on the backend project
const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: false
});
api.interceptors.request.use(
    (config) => {
        config.headers["Content-Type"] = "application/json";
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
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                if (error.config && error.config.url !== 'login') {
                    localStorage.removeItem('accessToken')
                    window.location.href = '/login';
                }
            }
        }

        return Promise.reject(error);
    }
);


export { api };