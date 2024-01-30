import * as Utils from '@produck/sack-utils';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch#referrerpolicy
 */
export const DEFAULT = '';

const VALUES = Object.freeze([
	DEFAULT,
	'no-referrer',
	'no-referrer-when-downgrade',
	'same-origin',
	'origin',
	'strict-origin',
	'origin-when-cross-origin',
	'strict-origin-when-cross-origin',
	'unsafe-url',
]);

export const isReferrerPolicy = any => VALUES.includes(any);
export const EXPECTED = Utils.toListString(VALUES);
export const ABSTRACT = ['referrerPolicy', isReferrerPolicy, DEFAULT, EXPECTED];
