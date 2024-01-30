import * as Utils from '@produck/sack-utils';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch#integrity
 */
export const DEFAULT = '';
export const isIntegrity = Utils.Type.isString;
export const ABSTRACT = ['integrity', isIntegrity, DEFAULT, 'string'];
