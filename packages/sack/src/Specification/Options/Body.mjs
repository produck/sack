import { Is, InstanceOf, B, I } from '@produck/idiom-common';
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

const TYPE_NAMES = I.Array.map(BODY_OBJECT_TYPES, Constructor => {
	return I.Function.name(Constructor);
});

export const isBodyObject = any => {
	return I.Array.some(BODY_OBJECT_TYPES, Constructor => {
		return InstanceOf(any, Constructor);
	});
};

export const isBody = any => {
	return Is.Null(any) || Is.StringType(any) || isBodyObject(any);
};

export const EXPECTED = `${toListString(TYPE_NAMES)}, string or null`;
export const ABSTRACT = ['body', isBody, DEFAULT, EXPECTED];
