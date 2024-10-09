/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch#integrity
 */
export const DEFAULT = '';
export const isIntegrity = any => typeof any === 'string';
export const EXPECTED = 'string';
export const ABSTRACT = ['integrity', isIntegrity, DEFAULT, EXPECTED];
