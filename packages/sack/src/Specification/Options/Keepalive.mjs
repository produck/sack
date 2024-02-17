import { Is } from '@produck/idiom-common';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch#keepalive
 */
export const DEFAULT = false;
export const isKeepalive = Is.BooleanType;
export const EXPECTED = 'boolean';
export const ABSTRACT = ['keepalive', isKeepalive, DEFAULT, EXPECTED];
