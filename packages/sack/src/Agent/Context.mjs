import { Lang } from '@produck/sack-utils';

import * as Assert from './Assert.mjs';
import { Options } from './Specification/index.mjs';

const RETURN_ANY = any => any;

const OPTIONS_TABLES = [
	[...Options.Body.ABSTRACT, RETURN_ANY],
	[...Options.Cache.ABSTRACT, RETURN_ANY],
	[...Options.Credentials.ABSTRACT, RETURN_ANY],
	[...Options.Integrity.ABSTRACT, RETURN_ANY],
	[...Options.Keepalive.ABSTRACT, RETURN_ANY],
	[...Options.Method.ABSTRACT, Options.Method.normalize],
	[...Options.Mode.ABSTRACT, RETURN_ANY],
	[...Options.Priority.ABSTRACT, RETURN_ANY],
	[...Options.Redirect.ABSTRACT, RETURN_ANY],
	[...Options.Referrer.ABSTRACT, RETURN_ANY],
	[...Options.ReferrerPolicy.ABSTRACT, RETURN_ANY],
	[...Options.Signal.ABSTRACT, RETURN_ANY],
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

	get requestInit() {
		return { headers: this.headers, ...this[VALUES] };
	}

	finalize(key) {
		if (!Object.hasOwn(this[FINALS], key)) {
			Lang.ThrowTemplatedTypeError('key', 'request init key');
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
			if (isValid(value)) {
				Lang.ThrowTemplatedTypeError(`RequestContext.${name}`, expected);
			}

			if (!this[FINALS][name]) {
				this[VALUES][name] = normalize(value);
			}
		},
	});
}
