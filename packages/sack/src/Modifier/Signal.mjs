import * as Ow from '@produck/ow';
import { Options } from '@produck/spec-whatwg-fetch';

export const Set = signal => {
	if (!Options.Signal.isSignal(signal)) {
		Ow.Invalid('signal', Options.Signal.EXPECTED);
	}

	return ctx => ctx.signal = signal;
};

export const Generator = Signal => {
	if (typeof Signal !== 'function') {
		Ow.Invalid('Signal', 'function');
	}

	return ctx => {
		const signal = Signal();

		if (!Options.Signal.isSignal(signal)) {
			Ow.Invalid('=>Signal()', Options.Signal.EXPECTED);
		}

		ctx.signal = signal;
	};
};

export const cancel = Set(null);
export const Timeout = ms => Generator(() => AbortSignal.timeout(ms));
