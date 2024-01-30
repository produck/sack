export * as Lang from './Lang.mjs';
export * as Type from './Type.mjs';
export * as Error from './Error.mjs';

export const toListString = array => array.map(name => `'${name}'`).join(', ');
