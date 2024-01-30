import * as Utils from '@produck/sack-utils';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch#credentials
 */
export const DEFAULT = 'same-origin';
const VALUES = ['omit', DEFAULT, 'include'];
export const isCredential = any => VALUES.includes(any);

export const ABSTRACT = [
	'credentials', isCredential, DEFAULT, Utils.toListString(VALUES),
];
