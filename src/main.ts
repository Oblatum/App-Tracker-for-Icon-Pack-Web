import { createApp } from 'vue';
import App from './app.vue';
import router from './router';
import '@styles/element/index.scss';
import '@styles/all.scss';
import { ElMessage } from 'element-plus';

const app = createApp(App);
app.use(router).mount('#app');

window.addEventListener('unhandledrejection', (ev) => {
  if (typeof ev.reason === 'string') {
    ElMessage.error(ev.reason);
  } else if (ev.reason instanceof Error) {
    ElMessage.error(ev.reason.message);
  }
});

if (process.env.NODE_ENV === 'production') {
  import('./register-sw');
}
