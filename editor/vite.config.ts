import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  server: {
    port: 5197,
  },
  build:
    command === 'build'
      ? {
          lib: {
            entry: 'src/index.ts',
            formats: ['es'],
            fileName: 'modux-editor',
          },
          outDir: 'dist',
        }
      : undefined,
}));
