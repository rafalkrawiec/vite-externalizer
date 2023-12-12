import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: {
        externalize: 'src/externalizer.ts',
      },
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [/^node:.*$/],
    },
    minify: 'terser',
  },
});
