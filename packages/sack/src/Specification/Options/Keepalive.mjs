/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch#keepalive
 */
export const DEFAULT = false;
export const isKeepalive = any => typeof any === 'boolean';
export const EXPECTED = 'boolean';
export const ABSTRACT = ['keepalive', isKeepalive, DEFAULT, EXPECTED];
