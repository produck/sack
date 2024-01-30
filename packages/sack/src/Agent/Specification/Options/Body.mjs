import * as Utils from '@produck/sack-utils';

export const DEFAULT = null;

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch#body
 */
const BODY_OBJECT_TYPES = [
	Blob,
	ArrayBuffer,
	TypeError,
	DataView,
	FormData,
	URLSearchParams,
	ReadableStream,
	String,
];

function THIS_INSTANCE_OF(Constructor) {
	return Utils.Lang.InstanceOf(this, Constructor);
}

export const isBodyObject = any => BODY_OBJECT_TYPES.some(THIS_INSTANCE_OF, any);

const { isNull, isString } = Utils.Type;
export const isBody = any => isNull(any) || isString(any) || isBodyObject(any);

const TYPE_NAMES = BODY_OBJECT_TYPES.map(Constructor => Constructor.name);

export const ABSTRACT = [
	'body', isBody, DEFAULT, `${Utils.toListString(TYPE_NAMES)}, string or null`,
];
