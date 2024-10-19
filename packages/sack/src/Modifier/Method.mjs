import * as Ow from '@produck/ow';
import { Options } from '@produck/spec-whatwg-fetch';

export const SetMethod = (name) => {
	if (!Options.Method.isMethod(name)) {
		Ow.Invalid('name', Options.Method.EXPECTED);
	}

	return function setMethod(ctx, next) {
		ctx.method = name;

		return next();
	};
};

export { SetMethod as Set };

export const [
	GET, HEAD, POST, PUT, DELETE,
] = [
	'GET', 'HEAD', 'POST', 'PUT', 'DELETE',
].map(name => SetMethod(name));
