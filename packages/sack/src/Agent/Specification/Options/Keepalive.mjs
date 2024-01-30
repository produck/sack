import * as Utils from '@produck/sack-utils';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch#keepalive
 */
export const DEFAULT = false;
export const isKeepalive = Utils.Type.isBoolean;
export const EXPECTED = 'boolean';
export const ABSTRACT = ['keepalive', isKeepalive, DEFAULT, EXPECTED];
