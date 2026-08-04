/**
 * A `FileSystem` backed by node's fs, for tests, the CLI and migrations.
 *
 * Deliberately NOT re-exported from the package entry point: the editor bundle
 * must stay free of node builtins. IDE plugins bring their own adapter over the
 * host's virtual file system so edits go through the IDE's undo and refresh.
 */

import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import type { FileSystem } from './tree.js';

export function nodeFs(base = ''): FileSystem {
  const resolve = (path: string) => (base ? join(base, path) : path);
  return {
    async list(dir) {
      const full = resolve(dir);
      if (!existsSync(full)) return [];
      const entries = await readdir(full, { withFileTypes: true });
      return entries.filter((e) => e.isFile()).map((e) => e.name);
    },
    read: (path) => readFile(resolve(path), 'utf8'),
    async write(path, content) {
      const full = resolve(path);
      await mkdir(dirname(full), { recursive: true });
      await writeFile(full, content, 'utf8');
    },
    delete: (path) => rm(resolve(path), { force: true }),
    async exists(path) {
      return existsSync(resolve(path));
    },
  };
}
