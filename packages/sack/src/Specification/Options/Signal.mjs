/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch#signal
 */
export const DEFAULT = null;
export const isSignal = any => any === null || any instanceof AbortSignal;
export const EXPECTED = 'null or AbortSignal';
export const ABSTRACT = ['signal', isSignal, DEFAULT, EXPECTED];
