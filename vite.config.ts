import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/test-starter/',
  build: {
    sourcemap: true,
    assetsDir: "code",
  },
  plugins: [
    VitePWA({
      // you can remove base and scope pwa plugin will use the base on vite: defaults to /
      registerType: "autoUpdate",
      injectRegister: false,
      manifest: false,
      workbox: {
        globDirectory: 'dist', // caching our PWA Starter assets
        globPatterns: [
          '**/*.{html,js,css,png,webp,jpg}'
        ],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/unpkg\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unpkg-libs-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    })
  ]
})
