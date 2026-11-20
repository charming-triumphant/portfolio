import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://salmonsoftware.nz',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});
