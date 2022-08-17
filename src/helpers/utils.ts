import mime from 'mime';
import { get } from '@/services/base';
import { bannerASCII } from '../constants/banner';
import { APP_ENV, APP_NAME, APP_VERSION } from '../constants/meta';

export function printFeatures() {
  log(`%c${bannerASCII}`, 'color: #504ebc;');
  info(`应用名： %c${APP_NAME}`, 'color: #1697c6;');
  info(`版本号： %c${APP_VERSION}`, 'color: #1697c6;');
  info(`运行环境：%c${APP_ENV}`, 'color: #1697c6;');
  info(
    '自行部署： https://github.com/Oblatum/App-Tracker-for-Icon-Pack-Server-Side',
  );
}

export const { log, info, warn, error } = console;

export async function downloadFile(url: string, name?: string) {
  try {
    const { data, headers } = await get(url, {
      responseType: 'blob',
    });
    const ext = mime.getExtension(headers['content-type']) || '';
    const objUrl = window.URL.createObjectURL(data);
    const a = document.createElement('a');
    a.download = `${name || Date.now()}.${ext}`;
    a.href = objUrl;
    document.body.append(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(objUrl);
  } catch (e) {
    error(e);
  }
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await window.navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    return false;
  }
}
