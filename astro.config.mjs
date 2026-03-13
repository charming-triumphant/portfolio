import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://bensalcie.dev',
  outDir: 'C:/MAMP/htdocs/host2',
  integrations: [
    react(),
    tailwind(),
    mdx(),
    sitemap(),
  ],
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            three: ['three', '@react-three/fiber', '@react-three/drei'],
          },
        },
      },
    },
  },
});
