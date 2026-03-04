// @ts-check
import sitemap from '@astrojs/sitemap';
import playformInline from '@playform/inline';
import compressor from 'astro-compressor';
import purgecss from 'astro-purgecss';
import { defineConfig } from 'astro/config';
import { FontaineTransform } from 'fontaine';

const fontaineOptions = {
  fallbacks: {},
  categoryFallbacks: {
    serif: ['Georgia', 'Times New Roman'],
    'sans-serif': ['Arial', 'Helvetica Neue'],
    monospace: ['Courier New', 'Roboto Mono'],
  },
};

export default defineConfig({
  site: 'https://narvik.example.com',
  trailingSlash: 'never',
  output: 'static',
  prefetch: {
    defaultStrategy: 'hover',
  },
  integrations: [
    sitemap(),
    playformInline({
      Logger: 0,
    }),
    purgecss(),
    compressor({
      gzip: true,
      brotli: true,
      zstd: true,
    }),
  ],
  vite: {
    plugins: [FontaineTransform.vite(fontaineOptions)],
  },
});
