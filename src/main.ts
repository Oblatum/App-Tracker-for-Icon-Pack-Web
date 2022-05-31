import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/assets/scss/index.scss'
import loadingDirective from '@/components/base/loading/directive'
import contextMenuDirective from '@/components/base/contextMenu/directive'
createApp(App)
  .use(store)
  .use(router)
  .directive('loading', loadingDirective)
  .directive('contextmenu', contextMenuDirective)
  .mount('#app')
