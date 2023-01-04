import { createApp } from 'vue';
import App from './app.vue';
import router from './router';

import '@styles/all.scss';
import 'tdesign-vue-next/dist/reset.css';
import { APP_META } from './constants/app-meta';

createApp(App).use(router).mount('#app');

if (APP_META.ENV === 'production') {
  import('./register-sw');
}
