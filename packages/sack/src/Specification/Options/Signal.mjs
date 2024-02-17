import { InstanceOf, Is } from '@produck/idiom-common';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch#signal
 */
export const DEFAULT = null;
export const isSignal = any => Is.Null(any) || InstanceOf(any, AbortSignal);
export const EXPECTED = 'null or AbortSignal';
export const ABSTRACT = ['signal', isSignal, DEFAULT, EXPECTED];
