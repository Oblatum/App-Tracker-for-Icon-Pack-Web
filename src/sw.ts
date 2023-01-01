import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';

declare const self: ServiceWorkerGlobalScope;

self.__WB_DISABLE_DEV_LOGS = true;

clientsClaim();

self.skipWaiting();

precacheAndRoute(self.__WB_MANIFEST);
