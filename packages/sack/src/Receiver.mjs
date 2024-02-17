import { Error, Is } from '@produck/idiom-common';

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
		Object.freeze(this);
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

			this.#stash.push(clone);

			return clone;
		}
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

	async end(parser = Parser.Simple.ToReceiver) {
		this.#finished = true;

		let returnValue;

		await Promise.all([
			...this.#handlers.map(CALL_HANDLER, this),
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
	const method = Receiver.prototype[name];

	Receiver.prototype[name] = { [name]: function (...args) {
		if (this.finished) {
			Error.Throw('Receiver has been finished.');
		}

		return method.call(this, ...args);
	} }[name];
}
