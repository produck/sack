import { Error, FALSE, I, Is, S, TRUE } from '@produck/idiom-common';

import * as Assert from './Assert.mjs';
import * as Parser from './Parser/index.mjs';

function CALL_HANDLER(handler) {
	handler(this);
}

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

	/** @type {Response[]} */
	#stash = [];

	/**
	 * https://developer.mozilla.org/en-US/docs/Web/API/Response/clone
	 */
	get response() {
		if(this.finished) {
			return this.#response;
		} else {
			const clone = this.#response.clone();

			I.Array.push(this.#stash, clone);

			return clone;
		}
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

	async end(parser = Parser.Simple.ToReceiver) {
		this.#finished = TRUE;

		let returnValue;

		await Promise.all([
			...I.Array.map(this.#handlers, CALL_HANDLER, this),
			(async () => returnValue = await parser(this))(),
		]);

		/**
		 * If only one cloned branch is consumed, then the entire body will be
		 * buffered in memory.
		 */
		for (const clone of this.#stash) {
			if (!Is.Null(clone.body) && !clone.bodyUsed) {
				clone.arrayBuffer();
			}
		}

		return returnValue;
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
