// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://stammbrueder.de',
  trailingSlash: 'never',
  redirects: {
    '/camper/blue/': '/referenzen/campingbus-blue',
    '/das-sind-wir/': '/ueber-uns',
    '/tische/': '/massivholztische',
  },
  integrations: [
    sitemap({
      filter: (page) => {
        // Filtere alte/ungültige Pfade aus
        const excludePatterns = [
          '/projects/',
          '/projekte/',
        ];
        // Nur Seiten mit gültigen Pfaden inkludieren
        return !excludePatterns.some(pattern => page.includes(pattern));
      }
    })
  ],
  server: {
    port: 4321,
    host: true
  },
  build: {
    assets: 'assets',
    // Inline-Kritische Assets für bessere Performance
    inlineStylesheets: 'auto',
  },
  image: {
    // Optimiere Bildverarbeitung
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: true,
      }
    },
    // Unterstützte Formate
    domains: [],
    remotePatterns: []
  },
  vite: {
    build: {
      // Optimiere Build-Performance
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          // Optimiere Chunk-Größen
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      }
    }
  }
});
