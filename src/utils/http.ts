import { APP_META } from '@/constants/app-meta';
import axios from 'axios';

axios.defaults.baseURL = APP_META.API_URL;

export { axios as http };
