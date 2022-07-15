import { createI18n } from 'vue-i18n';
import messages from './lang'

export default createI18n({
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'en',
  messages
})