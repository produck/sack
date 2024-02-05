import * as Utils from '@produck/sack-utils';

const assertModifierInArray = (modifier, index) => {
	if (!Utils.Type.isFunction(modifier)) {
		Utils.Lang.ThrowTemplatedTypeError(`modifiers[${index}]`, 'function');
	}
};

const assertHandlerInArray = (handler, index) => {
	if (!Utils.Type.isFunction(handler)) {
		Utils.Lang.ThrowTemplatedTypeError(`handlers[${index}]`, 'function');
	}
};

export {
	assertModifierInArray as ModifierInArray,
	assertHandlerInArray as HandlerInArray,
};
