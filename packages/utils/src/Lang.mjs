export const TypeOf = operand => typeof operand;
export const TypeOfEquel = (operand, type) => TypeOf(operand) === type;
export const InstanceOf = (object, Constructor) => object instanceof Constructor;

export const ThrowError = (message, ErrorConstructor = Error) => {
	throw new ErrorConstructor(message);
};

export const ThrowTypeError = message => ThrowError(message, TypeError);

export const ThrowTemplatedTypeError = (role, expected) => {
	return ThrowTypeError(`Invalid "${role}", one "${expected}" expected.`);
};
