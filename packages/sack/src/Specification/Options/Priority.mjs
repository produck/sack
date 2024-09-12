import { toListString } from './Utils.mjs';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch#priority
 */
export const DEFAULT = 'auto';
const VALUES = ['high', 'low', DEFAULT];
export const isPriority = any => VALUES.includes(any);
export const EXPECTED = toListString(VALUES);
export const ABSTRACT = ['priority', isPriority, DEFAULT, EXPECTED];
