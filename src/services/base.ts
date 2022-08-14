import { API_URL } from '@/constants/meta';
import axios from 'axios';

axios.defaults.baseURL = API_URL;

export const { get, post } = axios;
