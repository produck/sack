import * as Lang from './Lang.mjs';

export class SackError extends Error {
	get name() {
		return 'SackError';
	}
}

export const throwError = (message) => Lang.ThrowError(message, SackError);
export { throwError as throw };
