import { Workbox } from 'workbox-window';

if ('serviceWorker' in navigator) {
  const wb = new Workbox('sw.js');
  wb.addEventListener('installed', (event) => {
    if (event.isUpdate) {
      if (confirm('检查有新版，是否更新最新?')) {
        window.location.reload();
      }
    }
  });
  wb.register();
}
