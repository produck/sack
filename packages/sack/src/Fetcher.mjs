import { compose } from '@produck/compose';

import * as Assert from './Assert.mjs';
import { Method } from './Modifier/index.mjs';
import { SackAgentRequestContext as Context, HANDLERS } from './Context.mjs';
import { Receiver } from './Receiver.mjs';

export class SackAgentFetcher extends EventTarget {
	#workflow = null;

	constructor(...modifiers) {
		super();
		modifiers.forEach(Assert.ModifierInArray);
		this.#workflow = compose(...modifiers);
		Object.freeze(this);
	}

	state = {};

	async request(...modifiers) {
		modifiers.forEach(Assert.ModifierInArray);

		const workflow = compose(this.#workflow, ...modifiers);
		const context = new Context(this.state);

		await workflow(context);

		const { url, options } = context;
		const request = new Request(url, options);
		const response = await fetch(request);

		return new Receiver(this, request, response).use(...context[HANDLERS]);
	}
}

for (const [methodName, MethodSetter] of [
	['get', Method.GET],
	['head', Method.HEAD],
	['post', Method.POST],
	['put', Method.PUT],
	['delete', Method.DELETE],
]) {
	SackAgentFetcher.prototype[methodName] = {
		[methodName]: function (...args) {
			return this.request(MethodSetter, Method.finalize, ...args);
		},
	}[methodName];
}
