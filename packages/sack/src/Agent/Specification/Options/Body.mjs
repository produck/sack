import { toListString, Lang, Type } from '@produck/sack-utils';

export const DEFAULT = null;

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch#body
 */
const TypedArray = Object.getPrototypeOf(Int8Array);

const BODY_OBJECT_TYPES = [
	Blob,
	ArrayBuffer,
	TypedArray,
	DataView,
	FormData,
	URLSearchParams,
	ReadableStream,
	String,
];

function THIS_INSTANCE_OF(Constructor) {
	return Lang.InstanceOf(this, Constructor);
}

const TYPE_NAMES = BODY_OBJECT_TYPES.map(Constructor => Constructor.name);
const { isNull, isString } = Type;
export const isBodyObject = any => BODY_OBJECT_TYPES.some(THIS_INSTANCE_OF, any);
export const isBody = any => isNull(any) || isString(any) || isBodyObject(any);
export const EXPECTED = `${toListString(TYPE_NAMES)}, string or null`;
export const ABSTRACT = ['body', isBody, DEFAULT, EXPECTED];
