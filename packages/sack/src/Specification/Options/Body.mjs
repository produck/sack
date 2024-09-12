import { toListString } from './Utils.mjs';

export const DEFAULT = null;

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch#body
 */
const BODY_OBJECT_TYPES = [
	Blob,
	ArrayBuffer,
	DataView,
	FormData,
	URLSearchParams,
	ReadableStream,
	String,
];

const TYPE_NAMES = BODY_OBJECT_TYPES.map(Constructor => Constructor.name);

export const isBodyObject = any => {
	return BODY_OBJECT_TYPES.some(Constructor => any instanceof Constructor);
};

export const isBody = any => {
	return any === null || typeof any === 'string' || isBodyObject(any);
};

export const EXPECTED = `${toListString(TYPE_NAMES)}, string or null`;
export const ABSTRACT = ['body', isBody, DEFAULT, EXPECTED];
