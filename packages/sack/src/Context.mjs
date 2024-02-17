import { S, Error, I, TRUE, FALSE, G } from '@produck/idiom-common';

import * as Assert from './Assert.mjs';
import { Options } from './Specification/index.mjs';

const PASS = any => any;

const OPTIONS_TABLES = [
	[...Options.Body.ABSTRACT, PASS],
	[...Options.Cache.ABSTRACT, PASS],
	[...Options.Credentials.ABSTRACT, PASS],
	[...Options.Integrity.ABSTRACT, PASS],
	[...Options.Keepalive.ABSTRACT, PASS],
	[...Options.Method.ABSTRACT, Options.Method.normalize],
	[...Options.Mode.ABSTRACT, PASS],
	[...Options.Priority.ABSTRACT, PASS],
	[...Options.Redirect.ABSTRACT, PASS],
	[...Options.Referrer.ABSTRACT, PASS],
	[...Options.ReferrerPolicy.ABSTRACT, PASS],
	[...Options.Signal.ABSTRACT, PASS],
];

const VALUES = G.Symbol();
const FINALS = G.Symbol();
export const HANDLERS = G.Symbol();

export class SackAgentRequestContext {
	url = new URL('/', 'http://default.base.url');
	headers = new Headers();
	[VALUES] = {};
	[FINALS] = {};
	[HANDLERS] = [];

	use(...handlers) {
		I.Array.forEach(handlers, Assert.HandlerInArray);
		I.Array.push(this[HANDLERS], ...handlers);

		return this;
	}

	constructor() {
		for (const [name,, defaultValue] of OPTIONS_TABLES) {
			this[VALUES][name] = defaultValue;
			this[FINALS][name] = FALSE;
		}

		S.Object.freeze(this);
	}

	get options() {
		return { headers: this.headers, ...this[VALUES] };
	}

	finalize(key) {
		if (!S.Object.hasOwn(this[FINALS], key)) {
			Error.ThrowTemplatedTypeError('key', 'request init key');
		}

		this[FINALS][key] = TRUE;

		return this;
	}

	finalizeAll() {
		for (const [name] of OPTIONS_TABLES) {
			this[FINALS][name] = TRUE;
		}

		return this;
	}
}

for (const [name, isValid,, expected, normalize] of OPTIONS_TABLES) {
	S.Object.defineProperty(I.Function.prototype(SackAgentRequestContext), name, {
		get() {
			return this[VALUES][name];
		},
		set(value) {
			if (!isValid(value)) {
				Error.ThrowTemplatedTypeError(`RequestContext.${name}`, expected);
			}

			if (!this[FINALS][name]) {
				this[VALUES][name] = normalize(value);
			}
		},
	});
}
