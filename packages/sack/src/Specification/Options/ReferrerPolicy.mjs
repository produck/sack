import { toListString } from './Utils.mjs';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch#referrerpolicy
 */
export const DEFAULT = '';

const VALUES = [
	DEFAULT,
	'no-referrer',
	'no-referrer-when-downgrade',
	'same-origin',
	'origin',
	'strict-origin',
	'origin-when-cross-origin',
	'strict-origin-when-cross-origin',
	'unsafe-url',
];

export const isReferrerPolicy = any => VALUES.includes(any);
export const EXPECTED = toListString(VALUES);
export const ABSTRACT = ['referrerPolicy', isReferrerPolicy, DEFAULT, EXPECTED];
