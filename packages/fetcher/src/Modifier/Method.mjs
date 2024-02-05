import { Lang } from '@produck/sack-utils';
import { Options } from '../Specification/index.mjs';

export const Set = (name) => {
	if (!Options.Method.isMethod(name)) {
		Lang.ThrowTemplatedTypeError('name', Options.Method.EXPECTED);
	}

	return ctx => ctx.method = name;
};

export const GET = Set('GET');
export const HEAD = Set('HEAD');
export const POST = Set('POST');
export const PUT = Set('PUT');
export const DELETE = Set('DELETE');

export const finalize = ctx => ctx.finalize('method');
