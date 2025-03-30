import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      // Options d'adaptation nodejs
      out: 'build',
      precompress: false,
      envPrefix: ''
    }),

    // Autoriser CORS pour les overlays
    csrf: {
      checkOrigin: false
    }
  }
};

export default config;