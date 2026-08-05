/**
 * Reading what someone typed to point at another modux project.
 *
 * One box, two possible answers: a repository URL — the identity that means the same to everyone
 * who clones this model — or a path to a checkout on this machine. Storing whichever was meant is
 * what lets the reference travel; see `docs/design/ide-plugin.md` §4.7.
 */

import type { ReferencedProject } from './model.js';

/** Whether what was typed is a filesystem path rather than a repository URL. */
export function looksLikePath(coordinate: string): boolean {
  const value = coordinate.trim();
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(value)) return false; // https://, ssh://, file://…
  if (/^[^/]+@[^/]+:/.test(value)) return false; // git@github.com:acme/repo.git
  return value.startsWith('.') || value.startsWith('/') || value.startsWith('~')
    || !value.includes(':');
}

/** The coordinate behind what was typed. */
export function coordinateFrom(input: string): ReferencedProject {
  const value = input.trim();
  return looksLikePath(value) ? { path: value } : { gitUrl: value };
}

/**
 * The name of the project a coordinate points at, for the element's id.
 *
 * `git@github.com:acme/checkin.git` and `../../checkin/modux` both read as `checkin`: the
 * conventional `<repo>/modux` tail is skipped so the id names the project rather than the
 * directory the model happens to sit in (§4.6).
 */
export function repoNameOf(coordinate: string): string {
  const parts = coordinate.trim().replace(/\.git\/*$/, '').split(/[/:]/).filter(Boolean);
  while (parts.length > 1 && ['modux', '.', '..', '~'].includes(parts.at(-1)!)) parts.pop();
  const name = (parts.at(-1) ?? '').replace(/[^A-Za-z0-9._-]/g, '-');
  return name && name !== 'modux' ? name : 'referencia';
}
