import { TypeOfEquel } from './Lang.mjs';

export const isString = operand => TypeOfEquel(operand, 'string');
export const isFunction = operand => TypeOfEquel(operand, 'function');
export const isBoolean = operand => TypeOfEquel(operand, 'boolean');

export const isNull = operand => operand === null;
