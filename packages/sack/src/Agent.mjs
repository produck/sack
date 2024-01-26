import { Method } from './Modifier/index.mjs';
import { FetchContext } from './Context.mjs';
import { Receiver } from './Receiver.mjs';

function InvokeModifier(modifier) {
	modifier(this);
}

export class AgentState {

}

export class Agent extends EventTarget {
	#modifiers = [];
	#handlers = [];
	#state = new AgentState();

	constructor() {
		super();
		Object.freeze(this);
	}

	async request(...modifiers) {
		const context = new FetchContext(this.#state);

		this.#modifiers.concat(modifiers).forEach(InvokeModifier, context);

		const request = new Request(context.url, context.options);
		const response = await fetch(request);

		return new Receiver(request, response, this.#state)
			.use(...this.#handlers)
			.use(...context.handlers);
	}
}

const METHODS_MODIFIERS = {
	get: Method.GET,
	post: Method.POST,
	put: Method.PUT,
	delete: Method.DELETE,
};

for (const name in METHODS_MODIFIERS) {
	const modifier = METHODS_MODIFIERS[name];

	Agent.prototype[name] = { [name]: function (...args) {
		return this.request(modifier, ...args);
	} }[name];
}
