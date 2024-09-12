import * as Ow from '@produck/ow';
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
		Object.freeze(this);
	}

	/**
	 * https://developer.mozilla.org/en-US/docs/Web/API/Response/clone
	 */
	get response() {
		return this.#finished ? this.#response : this.#response.clone();
	}

	#handlers = [];

	use(...handlers) {
		handlers.forEach(Assert.HandlerInArray);
		this.#handlers.push(...handlers);

		return this;
	}

	#finished = false;

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
		this.#finished = true;

		await compose(...this.#handlers)(this);

		return this.#returnValue;
	}
}

for (const name of ['use', 'end']) {
	const method = Receiver.prototype[name];

	Receiver.prototype[name] = { [name]: function (...args) {
		if (this.finished) {
			Ow.Error.Common('Receiver has been finished.');
		}

		return method.apply(this, args);
	} }[name];
}
