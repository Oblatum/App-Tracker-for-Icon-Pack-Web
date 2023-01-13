import { Workbox } from 'workbox-window';
import { ElMessageBox } from 'element-plus';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const wb = new Workbox('sw.js');
    wb.addEventListener('installed', async (event) => {
      if (event.isUpdate) {
        await ElMessageBox.confirm('检测到新版本，是否更新?');
        window.location.reload();
      }
    });
    wb.register();
  });
}
