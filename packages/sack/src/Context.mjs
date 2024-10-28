import * as Ow from '@produck/ow';

import * as Assert from './Assert.mjs';
import { Options } from '@specs-js/whatwg-fetch';

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

const VALUES = Symbol('SACK.CONTEXT.VALUES');
export const HANDLERS = Symbol('SACK.CONTEXT.HANDLERS');

const DEFAULT_BASE_URL = Object.hasOwn(globalThis, 'window')
	? globalThis.window.document.baseURI
	: 'http://default.base.url';

export class SackAgentRequestContext {
	url = new URL('/', DEFAULT_BASE_URL);
	headers = new Headers();
	[VALUES] = {};
	[HANDLERS] = [];

	use(...handlers) {
		handlers.forEach(Assert.HandlerInArray);
		this[HANDLERS].push(...handlers);

		return this;
	}

	constructor() {
		for (const [name,, defaultValue] of OPTIONS_TABLES) {
			this[VALUES][name] = defaultValue;
		}

		Object.freeze(this);
	}

	get options() {
		return { headers: this.headers, ...this[VALUES] };
	}
}

for (const [name, isValid,, expected, normalize] of OPTIONS_TABLES) {
	Object.defineProperty(SackAgentRequestContext.prototype, name, {
		get() {
			return this[VALUES][name];
		},
		set(value) {
			if (!isValid(value)) {
				Ow.Invalid(`RequestContext.${name}`, expected);
			}

			this[VALUES][name] = normalize(value);
		},
	});
}
