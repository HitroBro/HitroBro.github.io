import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://HitroBro.github.io',
  base: '/',
  trailingSlash: 'always',
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  prefetch: true,
});