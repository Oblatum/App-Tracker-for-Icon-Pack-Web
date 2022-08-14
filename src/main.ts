import { createApp } from 'vue';
import { createPinia } from 'pinia';
import vhCheck from 'vh-check';

import '@/assets/scss/index.scss';
import App from './App.vue';

const pinia = createPinia();
vhCheck('browser-address-bar');

createApp(App).use(pinia).mount('#app');
