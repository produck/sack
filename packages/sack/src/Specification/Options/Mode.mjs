import { I, Is } from '@produck/idiom-common';
import { toListString } from './Utils.mjs';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch#mode
 */
export const DEFAULT = 'cors';
const VALUES = ['same-origin', 'no-cors', DEFAULT];
export const isMode = any => I.Array.includes(VALUES, any);
export const EXPECTED = toListString(VALUES);
export const ABSTRACT = ['mode', isMode, DEFAULT, EXPECTED];
