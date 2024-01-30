import { Lang, Type } from '@produck/sack-utils';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch#signal
 */
export const DEFAULT = null;

export const isSignal = any => {
	return Type.isNull(any) || Lang.InstanceOf(any, AbortSignal);
};

export const ABSTRACT = ['signal', isSignal, DEFAULT, 'null or AbortSignal'];
