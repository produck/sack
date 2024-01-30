import * as Utils from '@produck/sack-utils';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch#cache
 */
export const DEFAULT = 'same-origin';

const VALUES = [
	DEFAULT, 'no-store', 'reload', 'no-cache', 'force-cache', 'only-if-cached',
];

export const isCache = any => VALUES.includes(any);
export const ABSTRACT = ['cache', isCache, DEFAULT, Utils.toListString(VALUES)];
