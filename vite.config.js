import { defineConfig } from 'vite';
import { resolve } from 'path';
import bundleScripts from './bundle-scripts.js';
import purgeCSS from 'vite-plugin-purgecss';

export default defineConfig({
  plugins: [
    bundleScripts(),
    purgeCSS({
      content: [
        './index.html',
        './src/**/*.js',
        './assets/js/**/*.js'
      ],
      safelist: {
        // Keep dynamic classes that might be added by JS
        standard: [
          'active',
          'bg-dark',
          'in-progress',
          'completed',
          'pending',
          /^radio-/,
          /^cursor-/,
          /^dixor-/,
          /^item-move-/,
          /^split-/,
          /^swiper-/,
          /^fa-/
        ],
        deep: [
          /^smooth-/,
          /^gsap/,
          /^scroll/i
        ]
      }
    })
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        entryFileNames: 'js/app.[hash].js',
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'css/[name].[hash][extname]';
          }
          if (assetInfo.name.endsWith('.js')) {
            return 'js/[name][extname]';
          }
          return '[name][extname]';
        }
      }
    },
    cssCodeSplit: false,
    target: 'es2015',
    outDir: 'dist',
    emptyOutDir: true,
    copyPublicDir: true
  },
  publicDir: 'assets',
  base: './',
  server: {
    // Serve the bundled scripts during development
    middlewareMode: false
  }
});
