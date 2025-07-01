import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

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
  build: {
    // Increase chunk size warning limit if you're okay with larger chunks
    chunkSizeWarningLimit: 1000,
    
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor libraries
          'react-vendor': ['react', 'react-dom'],
          
          // UI component libraries
          'radix-ui': [
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-collapsible',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-label',
            '@radix-ui/react-popover',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-select',
            '@radix-ui/react-separator',
            '@radix-ui/react-slot',
            '@radix-ui/react-switch',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-visually-hidden'
          ],
          
          // Icon libraries
          'icons': ['@tabler/icons-react', 'lucide-react'],
          
          // TanStack libraries
          'tanstack': [
            '@tanstack/react-query',
            '@tanstack/react-router',
            '@tanstack/react-table'
          ],
          
          // Utility libraries
          'utils': [
            'axios',
            'date-fns',
            'js-cookie',
            'jwt-decode',
            'zod',
            'zustand',
            'clsx',
            'tailwind-merge',
            'class-variance-authority'
          ],
          
          // Animation libraries
          'animation': ['framer-motion', 'motion']
        }
      }
    }
  },
  
  // Optimize dev server
  server: {
    port: 3000,
    open: false, // Set to true if you want browser to open automatically
  },
  
  // Optimize dependencies pre-bundling
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@tanstack/react-query',
      '@tanstack/react-router',
      'axios',
      'date-fns',
      'zod'
    ]
  }
});