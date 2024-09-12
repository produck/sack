import * as Ow from '@produck/ow';

const assertFunctionType = (any, role) => {
	if (typeof any !== 'function') {
		Ow.Invalid(role, 'function');
	}
};

const assertModifierInArray = (modifier, index) => {
	return assertFunctionType(modifier, `modifiers[${index}]`);
};

const assertHandlerInArray = (handler, index) => {
	return assertFunctionType(handler, `handlers[${index}]`);
};

export {
	assertModifierInArray as ModifierInArray,
	assertHandlerInArray as HandlerInArray,
};
