import { S, I } from '@produck/idiom-common'
import { toListString } from './Utils.mjs';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch#referrerpolicy
 */
export const DEFAULT = '';

const VALUES = S.Object.freeze([
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

export const isReferrerPolicy = any => I.Array.includes(VALUES, any);
export const EXPECTED = toListString(VALUES);
export const ABSTRACT = ['referrerPolicy', isReferrerPolicy, DEFAULT, EXPECTED];
