import { Is } from '@produck/idiom-common';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch#integrity
 */
export const DEFAULT = '';
export const isIntegrity = Is.StringType;
export const EXPECTED = 'string';
export const ABSTRACT = ['integrity', isIntegrity, DEFAULT, EXPECTED];
