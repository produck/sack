import { Error, FALSE, I, Is, S, TRUE } from '@produck/idiom-common';
import { compose } from '@produck/compose';

import * as Assert from './Assert.mjs';

export class Receiver extends EventTarget {
	/** @type {import('./Fetcher.mjs').SackAgentFetcher} */
	fetcher;
	#response;

	constructor(fetcher, request, response) {
		super();
		this.fetcher = fetcher;
		this.request = request;
		this.#response = response;
		S.Object.freeze(this);
	}

	/**
	 * https://developer.mozilla.org/en-US/docs/Web/API/Response/clone
	 */
	get response() {
		return this.#finished ? this.#response : this.#response.clone();
	}

	#handlers = [];

	use(...handlers) {
		I.Array.forEach(handlers, Assert.HandlerInArray);
		I.Array.push(this.#handlers, ...handlers);

		return this;
	}

	#finished = FALSE;

	get finished() {
		return this.#finished;
	}

	#returnValue;

	get returnValue() {
		return this.#returnValue;
	}

	set returnValue(value) {
		this.#returnValue = value;
	}

	async end() {
		this.#finished = TRUE;

		await compose(...this.#handlers)(this);

		return this.#returnValue;
	}
}

for (const name of ['use', 'end']) {
	const method = I.Function.prototype(Receiver)[name];

	I.Function.prototype(Receiver)[name] = { [name]: function (...args) {
		if (this.finished) {
			Error.Throw('Receiver has been finished.');
		}

		return I.Function.apply(method, this, args);
	} }[name];
}
