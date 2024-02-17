import { Is, InstanceOf, B } from '@produck/idiom-common';
import { toListString } from './Utils.mjs';

export const DEFAULT = null;

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch#body
 */
const BODY_OBJECT_TYPES = [
	Blob,
	B.ArrayBuffer,
	B.TypedArray,
	B.DataView,
	FormData,
	URLSearchParams,
	ReadableStream,
	B.String,
];

function THIS_INSTANCE_OF(Constructor) {
	return InstanceOf(this, Constructor);
}

const TYPE_NAMES = BODY_OBJECT_TYPES.map(Constructor => Constructor.name);
export const isBodyObject = any => BODY_OBJECT_TYPES.some(THIS_INSTANCE_OF, any);
export const isBody = any => Is.Null(any) || Is.StringType(any) || isBodyObject(any);
export const EXPECTED = `${toListString(TYPE_NAMES)}, string or null`;
export const ABSTRACT = ['body', isBody, DEFAULT, EXPECTED];
