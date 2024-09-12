import { toListString } from './Utils.mjs';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch#referrer
 */
export const DEFAULT = 'about:client';
const VALUES = ['', DEFAULT];

// TODO This can be a same-origin URL.
export const isReferrer = any => VALUES.includes(any) || typeof any === 'string';
export const EXPECTED = toListString(VALUES);
export const ABSTRACT = ['referrer', isReferrer, DEFAULT, EXPECTED];
