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
