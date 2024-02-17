import { Is, S, I } from '@produck/idiom-common';
import { toListString } from './Utils.mjs';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch#referrer
 */
export const DEFAULT = 'about:client';
export const VALUES = S.Object.freeze(['', DEFAULT]);

// TODO This can be a same-origin URL.
export const isReferrer = any => I.Array.includes(VALUES, any) || Is.StringType(any);
export const EXPECTED = toListString(VALUES);
export const ABSTRACT = ['referrer', isReferrer, DEFAULT, EXPECTED];
