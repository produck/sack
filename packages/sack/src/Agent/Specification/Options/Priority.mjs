import * as Utils from '@produck/sack-utils';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch#priority
 */
export const DEFAULT = 'auto';
export const VALUES = Object.freeze(['high', 'low', DEFAULT]);
export const isPriority = any => VALUES.includes(any);

export const ABSTRACT = [
	'priority', isPriority, DEFAULT, Utils.toListString(VALUES),
];
