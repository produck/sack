import { toListString, Type } from '@produck/sack-utils';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch#referrer
 */
export const DEFAULT = 'about:client';
export const VALUES = Object.freeze(['', DEFAULT]);

// TODO This can be a same-origin URL.
export const isReferrer = any => VALUES.includes(any) || Type.isString(any);
export const EXPECTED = toListString(VALUES);
export const ABSTRACT = ['referrer', isReferrer, DEFAULT, EXPECTED];