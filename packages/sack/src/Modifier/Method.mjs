import * as Ow from '@produck/ow';
import { Options } from '../Specification/index.mjs';

export const Set = (name) => {
	if (!Options.Method.isMethod(name)) {
		Ow.Invalid('name', Options.Method.EXPECTED);
	}

	return ctx => ctx.method = name;
};

export const GET = Set('GET');
export const HEAD = Set('HEAD');
export const POST = Set('POST');
export const PUT = Set('PUT');
export const DELETE = Set('DELETE');
