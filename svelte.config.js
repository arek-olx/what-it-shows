import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const runbook = join(root, 'src/lib/layouts/runbook.svelte');

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.svx'],
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.svx'],
      layout: {
        _: runbook,
        runbook,
      },
    }),
  ],
  kit: {
    adapter: adapter({ strict: false }),
    alias: {
      '#lib': './src/lib',
    },
    prerender: {
      handleUnseenRoutes: 'ignore',
    },
  },
};

export default config;
