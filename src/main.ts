import { createApp } from 'vue';
import App from './app.vue';
import router from './router';
import { ElMessage } from 'element-plus';

import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-message-box.css';
import '@styles/all.scss';

import './register-sw';

const app = createApp(App);
app.use(router).mount('#app');

window.addEventListener('unhandledrejection', (ev) => {
  if (typeof ev.reason === 'string') {
    ElMessage.error(ev.reason);
  } else if (ev.reason instanceof Error) {
    ElMessage.error(ev.reason.message);
  }
});
