import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import { VitePWA } from 'vite-plugin-pwa';
import environment from 'vite-plugin-environment';
import path from 'path';
import stylelint from 'vite-plugin-stylelint';
import { name, version } from './package.json';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    base: './',
    server: {
      port: 5173,
      open: true,
    },
    plugins: [
      vue(),
      eslint(),
      stylelint({
        fix: true,
        quiet: true,
      }),
      environment(
        {
          APP_NAME: name,
          APP_VERSION: version,
        },
        {
          defineOn: 'import.meta.env',
        },
      ),
      VitePWA({
        strategies: 'injectManifest',
        srcDir: 'src',
        filename: 'sw.ts',
        includeAssets: ['favicon.png', './src/*'],
        manifest: {
          name: 'App Tracker For Icon Pack',
          short_name: 'App Trakcer',
          description: '为解决图标包/主题作者寻找包名困难的问题而生。',
          theme_color: '#504ebc',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
          start_url: '/',
          background_color: '#504ebc',
          display: 'standalone',
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import '@/assets/scss/global.scss';`,
        },
      },
    },
  };
});
