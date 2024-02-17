import { S, I } from '@produck/idiom-common'
import { toListString } from './Utils.mjs';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch#redirect
 */
export const DEFAULT = 'follow';
const VALUES = S.Object.freeze([DEFAULT, 'error', 'manual']);
export const isRedirect = any => I.Array.includes(VALUES, any);
export const EXPECTED = toListString(VALUES);
export const ABSTRACT = ['redirect', isRedirect, DEFAULT, EXPECTED];
