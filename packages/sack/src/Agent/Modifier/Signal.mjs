import { Lang, Type } from '@produck/sack-utils';
import * as Specification from '../Specification/index.mjs';

export const Set = signal => {
	if (!Specification.Options.Signal.isSignal(signal)) {
		Lang.ThrowTemplatedTypeError('signal', 'null or AbortSignal');
	}

	return ctx => ctx.signal = signal;
};

export const Generator = Signal => {
	if (!Type.isFunction(Signal)) {
		Lang.ThrowTemplatedTypeError('Signal', 'function');
	}

	return ctx => {
		const signal = Signal();

		if (!Specification.Options.Signal.isSignal(signal)) {
			Lang.ThrowTemplatedTypeError('=>Signal()', 'null or AbortSignal');
		}

		ctx.signal = signal;
	};
};

export const cancel = Set(null);
export const Timeout = ms => Generator(() => AbortSignal.timeout(ms));
