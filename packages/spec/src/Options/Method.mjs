import * as http from 'node:http';

export const DEFAULT = 'GET';

/**
 * https://www.rfc-editor.org/rfc/rfc9110#name-overview
 */
const RFC9110 = [
	DEFAULT, 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE',
];

const NODE = [...http.METHODS];
const inMethodSet = list => name => list.includes(name.toUpperCase());

export const isRFC9110Method = inMethodSet(RFC9110);
export const isNodeHttpMethod = inMethodSet(NODE);
export const normalize = name => name.toUpperCase();

export const isMethod = name => {
	if (typeof name !== 'string') {
		return false;
	}

	if (isRFC9110Method(name)) {
		return true;
	}

	/**
	 * If you want to use a custom method (like PATCH), you should uppercase it
	 * yourself.
	 * https://developer.mozilla.org/en-US/docs/Web/API/fetch#method
	 */
	return normalize(name) === name;
};

export const EXPECTED = 'http method names';
export const ABSTRACT = ['method', isMethod, DEFAULT, EXPECTED];
