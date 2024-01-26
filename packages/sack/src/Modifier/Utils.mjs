export const throwError = (message, ErrorConstructor = Error) => {
	throw new ErrorConstructor(message);
};

export { throwError as throw };
