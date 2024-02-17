import { Error, Assert } from '@produck/idiom-common';
import { Options } from '../Specification/index.mjs';

export const Set = signal => {
	if (!Options.Signal.isSignal(signal)) {
		Error.ThrowTemplatedTypeError('signal', Options.Signal.EXPECTED);
	}

	return ctx => ctx.signal = signal;
};

export const Generator = Signal => {
	Assert.FunctionType(Signal, 'Signal');

	return ctx => {
		const signal = Signal();

		if (!Options.Signal.isSignal(signal)) {
			Error.ThrowTemplatedTypeError('=>Signal()', Options.Signal.EXPECTED);
		}

		ctx.signal = signal;
	};
};

export const cancel = Set(null);
export const Timeout = ms => Generator(() => AbortSignal.timeout(ms));
