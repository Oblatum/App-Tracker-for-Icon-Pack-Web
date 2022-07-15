import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router'
import i18n from './locale';
import './assets/scss/index.scss';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(i18n);
app.use(router);
app.mount('#app');
