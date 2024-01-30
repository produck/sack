import * as Utils from '@produck/sack-utils';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch#mode
 */
export const DEFAULT = 'cors';
const VALUES = ['same-origin', 'no-cors', DEFAULT];
export const isMode = any => VALUES.includes(any);
export const ABSTRACT = ['mode', isMode, DEFAULT, Utils.toListString(VALUES)];
