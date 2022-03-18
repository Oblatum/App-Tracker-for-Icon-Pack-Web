import { VitePWA } from "vite-plugin-pwa";
import { build, defineConfig } from "vite";
// import icon from "./src/favicon.png";

export default defineConfig({
  plugins: [
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      includeAssets: ["favicon.png", "./src/*"],
      manifest: {
        name: "App Tracker For Icon Pack Web",
        short_name: "App Trakcer",
        description: "为解决图标包/主题作者寻找包名困难的问题而生。",
        theme_color: "#504ebc",
        icons: [
          {
            src: "favicon.png",
            type: "image/png",
            sizes: "192x192",
          },
        ],
        start_url: "/",
        background_color: "#504ebc",
        display: "standalone",
      },
    }),
  ],
});
