import { createApp } from 'vue';
import App from './app.vue';
import router from './router';
import '@styles/all.scss';

const app = createApp(App);
app.use(router).mount('#app');
