import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss  from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    react(), // Use only @vitejs/plugin-react-swc
    tailwindcss(), // Tailwind CSS v4 plugin
    TanStackRouterVite()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
      'lucide-react': 'lucide-react/dist/esm/lucide-react.js',
    },
  },
  css: {
    postcss: {
      // Remove the require call which is causing issues with ESM
    },
  },
});