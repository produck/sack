import { toListString } from './Utils.mjs';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch#redirect
 */
export const DEFAULT = 'follow';
const VALUES = Object.freeze([DEFAULT, 'error', 'manual']);
export const isRedirect = any => VALUES.includes(any);
export const EXPECTED = toListString(VALUES);
export const ABSTRACT = ['redirect', isRedirect, DEFAULT, EXPECTED];
