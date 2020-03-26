import axios from 'axios';
import { AsyncStorage } from 'react-native';

const axiosInstance = axios.create({
    baseURL: ""
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default axiosInstance;
