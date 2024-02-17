import { I } from '@produck/idiom-common';
import { toListString } from './Utils.mjs';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch#cache
 */
export const DEFAULT = 'default';

const VALUES = [
	DEFAULT, 'no-store', 'reload', 'no-cache', 'force-cache', 'only-if-cached',
];

export const isCache = any => I.Array.includes(VALUES, any);
export const EXPECTED = toListString(VALUES);
export const ABSTRACT = ['cache', isCache, DEFAULT, EXPECTED];
