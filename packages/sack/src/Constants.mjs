export const MODE_VALUES = [
	'same-origin',
	'no-cors',
	'cors',
];

export const CREDENTIALS_VALUES = [
	'omit',
	'same-origin',
	'include',
];

export const CACHE_VALUES = [
	'default',
	'no-store',
	'reload',
	'no-cache',
	'force-cache',
	'only-if-cached',
];

export const REDIRECT_VALUES = [
	'follow',
	'error',
	'manual',
];

export const REFERRER_POLICY_VALUES = [
	'',
	'no-referrer',
	'no-referrer-when-downgrade',
	'same-origin',
	'origin',
	'strict-origin',
	'origin-when-cross-origin',
	'strict-origin-when-cross-origin',
	'unsafe-url',
];

export const PRIORITY_VALUES = [
	'high',
	'low',
	'auto',
];

export {
	MODE_VALUES as MODE,
	CREDENTIALS_VALUES as CREDENTIALS,
	CACHE_VALUES as CACHE,
	REDIRECT_VALUES as REDIRECT,
	REFERRER_POLICY_VALUES as REFERRER_POLICY,
	PRIORITY_VALUES as PRIORITY,
};

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

function INSTANCE_OF(Constructor) {
	return this instanceof Constructor;
}

export const isBodyObject = any => BODY_OBJECT_TYPES.some(INSTANCE_OF, any);
export const isBody = any => typeof any === 'string' || isBodyObject(any);
