/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch#integrity
 */
export const DEFAULT = '';
export const isIntegrity = Number.isInteger;
export const EXPECTED = 'string';
export const ABSTRACT = ['integrity', isIntegrity, DEFAULT, EXPECTED];
