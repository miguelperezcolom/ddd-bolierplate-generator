import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  server: {
    port: 5197,
  },
  build:
    command === 'build'
      ? {
          lib: {
            // Two hosts, one bundle: the modux canvas (index.ts) and the draw.io host (host.ts),
            // which share the store/model code as split chunks. The plugin serves both from the
            // same `/modux-editor` classpath.
            entry: {
              'modux-editor': 'src/index.ts',
              'drawio-host': 'src/drawio/host.ts',
            },
            formats: ['es'],
            fileName: (_format, entryName) => `${entryName}.js`,
          },
          outDir: 'dist',
        }
      : undefined,
}));
