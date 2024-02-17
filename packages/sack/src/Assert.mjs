import { Assert } from '@produck/idiom-common';

const assertModifierInArray = (modifier, index) => {
	return Assert.FunctionType(modifier, `modifiers[${index}]`);
};

const assertHandlerInArray = (handler, index) => {
	return Assert.FunctionType(handler, `handlers[${index}]`);
};

export {
	assertModifierInArray as ModifierInArray,
	assertHandlerInArray as HandlerInArray,
};
