import { createApp } from 'vue';
import { createPinia } from 'pinia';
import vhCheck from 'vh-check';

import '@/assets/scss/index.scss';
import App from './App.vue';
import loadingDirective from './directives/loading/directive';
import contextMenuDirective from './directives/context-menu/directive';

const pinia = createPinia();
vhCheck('browser-address-bar');

const app = createApp(App);
app.use(pinia);
app.directive('loading', loadingDirective);
app.directive('context-menu', contextMenuDirective);
app.mount('#app');
