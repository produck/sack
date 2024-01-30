import * as Assert from './Assert.mjs';
import * as Modifier from './Modifier/index.mjs';
import { SackAgentRequestContext as Context, HANDLERS } from './Context.mjs';
import { Receiver } from './Receiver.mjs';

function InvokeModifier(modifier) {
	modifier(this);
}

export class SackAgentFetcher extends EventTarget {
	#modifiers = [];

	constructor(...modifiers) {
		super();
		modifiers.forEach(Assert.ModifierInArray);
		this.#modifiers.push(...modifiers);
		Object.freeze(this);
	}

	state = {};

	async request(...modifiers) {
		modifiers.forEach(Assert.ModifierInArray);

		const context = new Context(this.state);

		this.#modifiers.concat(modifiers).forEach(InvokeModifier, context);

		const request = new Request(context.url, context.requestInit);
		const response = await fetch(request);

		return new Receiver(request, response).use(...context[HANDLERS]);
	}
}

for (const [name, modifier] of [
	['get', Modifier.Method.GET],
	['head', Modifier.Method.HEAD],
	['post', Modifier.Method.POST],
	['put', Modifier.Method.PUT],
	['delete', Modifier.Method.DELETE],
]) {
	SackAgentFetcher.prototype[name] = { [name]: function (...args) {
		return this.request(modifier, Modifier.Method.finalize, ...args);
	} }[name];
}
