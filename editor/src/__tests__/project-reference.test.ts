/**
 * Reading a coordinate out of one input box.
 *
 * There is one box because there is one question — «where is that project?» — and the two answers
 * that make sense are a repository URL or a checkout on disk. Getting the split wrong is quiet:
 * a URL stored as a path resolves against the model root and finds nothing.
 */

import { describe, expect, it } from 'vitest';
import { coordinateFrom, looksLikePath, repoNameOf } from '../project-reference.js';

describe('telling a repository URL from a path', () => {
  it.each([
    'git@github.com:acme/checkin.git',
    'https://github.com/acme/checkin.git',
    'ssh://git@host:2222/acme/checkin.git',
    'file:///srv/git/checkin.git',
  ])('%s is a URL', (value) => {
    expect(looksLikePath(value)).toBe(false);
    expect(coordinateFrom(value)).toEqual({ gitUrl: value });
  });

  it.each([
    '../../checkin/modux',
    './checkin',
    '/srv/proyectos/checkin/modux',
    '~/IdeaProjects/checkin/modux',
    'checkin/modux',
  ])('%s is a path', (value) => {
    expect(looksLikePath(value)).toBe(true);
    expect(coordinateFrom(value)).toEqual({ path: value });
  });

  it('trims what was typed, so a stray space does not become part of the coordinate', () => {
    expect(coordinateFrom('  ../checkin/modux  ')).toEqual({ path: '../checkin/modux' });
  });
});

describe('naming the referenced project', () => {
  it.each([
    ['git@github.com:acme/checkin.git', 'checkin'],
    ['https://github.com/acme/checkin', 'checkin'],
    ['https://github.com/acme/checkin.git/', 'checkin'],
    ['ssh://git@host:2222/acme/checkin.git', 'checkin'],
  ])('%s → %s', (coordinate, expected) => {
    expect(repoNameOf(coordinate)).toBe(expected);
  });

  /** The model root is conventionally `<repo>/modux` (§4.6): the id should name the project. */
  it.each([
    ['../../checkin/modux', 'checkin'],
    ['/srv/proyectos/checkin/modux', 'checkin'],
    ['../checkin', 'checkin'],
  ])('%s → %s', (coordinate, expected) => {
    expect(repoNameOf(coordinate)).toBe(expected);
  });

  it('never produces something that cannot be a file name', () => {
    expect(repoNameOf('https://host/acme/mi proyecto')).toBe('mi-proyecto');
    expect(repoNameOf('modux')).toBe('referencia');
    expect(repoNameOf('')).toBe('referencia');
  });
});
