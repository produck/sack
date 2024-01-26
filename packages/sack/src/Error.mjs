export class SackError extends Error {
	get name() {
		return 'SackError';
	}
}

export const throwError = (message) => {
	throw new SackError(message);
};

export { throwError as throw };
