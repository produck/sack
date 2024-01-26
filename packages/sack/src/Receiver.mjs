import * as Parser from './Parser/index.mjs';
import * as Error from './Error.mjs';

function CALL_HANDLER(handler) {
	handler(this);
}

export class Receiver extends EventTarget {
	/**
	 * @param {Request} request
	 * @param {Response} response
	 * @param {import('./Agent.mjs').AgentState} state
	 */
	constructor(request, response, state) {
		super();
		this.request = request;
		this.response = response;
		this.state = state;
		Object.freeze(this);
	}

	#handlers = [];

	use(...handlers) {
		this.#handlers.push(...handlers);

		return this;
	}

	#finished = false;

	get finished() {
		return this.#finished;
	}

	async end(parser = Parser.ToResponse) {
		this.#finished = true;

		let returnValue = this;

		await Promise.all([
			...this.#handlers.map(CALL_HANDLER, this),
			async () => returnValue = await parser(this),
		]);

		return returnValue;
	}
}

for (const name of ['use', 'end']) {
	const method = Receiver.prototype[name];

	Receiver.prototype[name] = { [name]: function (...args) {
		if (this.finished) {
			Error.throw('Receiver has been finished.');
		}

		return method.call(this, ...args);
	} }[name];
}
