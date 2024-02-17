import { I, S } from '@produck/idiom-common';

import * as Assert from './Assert.mjs';
import { Method } from './Modifier/index.mjs';
import { SackAgentRequestContext as Context, HANDLERS } from './Context.mjs';
import { Receiver } from './Receiver.mjs';

function InvokeModifier(modifier) {
	modifier(this);
}

export class SackAgentFetcher extends EventTarget {
	#modifiers = [];

	constructor(...modifiers) {
		super();
		I.Array.forEach(modifiers, Assert.ModifierInArray);
		I.Array.push(this.#modifiers, ...modifiers);
		S.Object.freeze(this);
	}

	state = {};

	async request(...modifiers) {
		I.Array.forEach(modifiers, Assert.ModifierInArray);

		const context = new Context(this.state);

		I.Array.forEach([
			...this.#modifiers,
			...modifiers,
		], InvokeModifier, context);

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
	I.Function.prototype(SackAgentFetcher)[methodName] = {
		[methodName]: function (...args) {
			return this.request(MethodSetter, Method.finalize, ...args);
		},
	}[methodName];
}
