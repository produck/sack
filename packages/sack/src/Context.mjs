import * as http from 'node:http';
import * as Error from './Error.mjs';
import * as SPEC from './Constants.mjs';

const STRING_ACCESSOR_METHODS = [
	['mode', SPEC.MODE, SPEC.MODE[2]],
	['credentials', SPEC.CREDENTIALS, SPEC.CREDENTIALS[1]],
	['cache', SPEC.CACHE, SPEC.CACHE[0]],
	['redirect', SPEC.REDIRECT, SPEC.REDIRECT[0]],
	['referrerPolicy', SPEC.REFERRER_POLICY, SPEC.REFERRER_POLICY[0]],
	['priority', SPEC.PRIORITY, SPEC.PRIORITY[2]],
	['method', http.METHODS, 'GET'],
].map(tuple => [...tuple, Symbol(`FETCH_CONTEXT.${tuple[0].toUpperCase()}`)]);

export class FetchContext {
	url = new URL('/', 'http://default.base.url');
	headers = new Headers();

	constructor() {
		for (const [,, defaultValue, symbol] of STRING_ACCESSOR_METHODS) {
			this[symbol] = defaultValue;
		}

		Object.freeze(this);
	}

	#body = null;

	get body() {
		return this.#body;
	}

	set body(value) {
		if (value !== null || !SPEC.isBody(value)) {
			Error.throw('Invalid "body".');
		}

		this.value = value;
	}

	#keepalive = false;

	get keepalive() {
		return this.#keepalive;
	}

	set keepalive(value) {
		if (typeof value !== 'boolean') {
			Error.throw('Invalid "keepalive", "boolean" expected.');
		}

		this.#keepalive = value;
	}

	#signal = null;

	get signal() {
		return this.#signal;
	}

	set signal(value) {
		if (value === null || value instanceof AbortSignal) {
			this.#signal = value;
		} else {
			Error.throw('Invalid "signal", "null or AbortSignal" expected.');
		}
	}

	#integrity = '';

	get integrity() {
		return this.#integrity;
	}

	set integrity(value) {
		if (typeof value !== 'string') {
			Error.throw('Invalid "integrity", "string" expected.');
		}

		this.#integrity = value;
	}

	get options() {
		return {
			headers: this.headers,
			mode: this.mode,
			credentials: this.credentials,
			cache: this.cache,
			redirect: this.redirect,
			referrerPolicy: this.referrerPolicy,
			priorty: this.priorty,
			method: this.method,
			signal: this.signal,
			integrity: this.integrity,
			keepalive: this.keepalive,
			body: this.#body,
		};
	}
}

for (const [name, values, symbol] of STRING_ACCESSOR_METHODS) {
	Object.defineProperty(FetchContext.prototype, name, {
		get() {
			return this[symbol];
		},
		set(value) {
			if (values.includes(value)) {
				Error.throw(`Invalid "${name}", "${values.join(', ')}" expected.`);
			}

			this[symbol] = value;
		},
	});
}
