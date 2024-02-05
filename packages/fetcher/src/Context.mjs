import { Lang } from '@produck/sack-utils';

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

const VALUES = Symbol('SackAgentRequestContext.Value');
const FINALS = Symbol('SackAgentRequestContext.Final');
export const HANDLERS = Symbol('SackAgentRequestContext.Handlers');

export class SackAgentRequestContext {
	url = new URL('/', 'http://default.base.url');
	headers = new Headers();
	[VALUES] = {};
	[FINALS] = {};
	[HANDLERS] = [];

	use(...handlers) {
		handlers.forEach(Assert.HandlerInArray);
		this[HANDLERS].push(...handlers);

		return this;
	}

	constructor() {
		for (const [name,, defaultValue] of OPTIONS_TABLES) {
			this[VALUES][name] = defaultValue;
			this[FINALS][name] = false;
		}

		Object.freeze(this);
	}

	get options() {
		return { headers: this.headers, ...this[VALUES] };
	}

	finalize(key) {
		if (!Object.hasOwn(this[FINALS], key)) {
			Lang.ThrowTemplatedTypeError('key', 'request init key');
		}

		this[FINALS][key] = true;

		return this;
	}

	finalizeAll() {
		for (const [name] of OPTIONS_TABLES) {
			this[FINALS][name] = true;
		}

		return this;
	}
}

for (const [name, isValid,, expected, normalize] of OPTIONS_TABLES) {
	Object.defineProperty(SackAgentRequestContext.prototype, name, {
		get() {
			return this[VALUES][name];
		},
		set(value) {
			if (!isValid(value)) {
				Lang.ThrowTemplatedTypeError(`RequestContext.${name}`, expected);
			}

			if (!this[FINALS][name]) {
				this[VALUES][name] = normalize(value);
			}
		},
	});
}
