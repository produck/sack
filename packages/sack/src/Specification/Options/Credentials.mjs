import { toListString } from './Utils.mjs';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch#credentials
 */
export const DEFAULT = 'same-origin';
const VALUES = ['omit', DEFAULT, 'include'];
export const isCredential = any => VALUES.includes(any);
export const EXPECTED = toListString(VALUES);
export const ABSTRACT = ['credentials', isCredential, DEFAULT, EXPECTED];
