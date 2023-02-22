import { API_URL } from '@/constants';
import axios from 'axios';

axios.defaults.baseURL = API_URL;

export default axios;
