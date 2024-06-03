import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from './Utils';

// Crée une instance Axios avec le token JWT dans l'en-tête Authorization
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
    },
    withCredentials: true,
});

export default api;