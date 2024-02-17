import * as http from 'node:http';
import { FALSE, I, Is, TRUE } from '@produck/idiom-common';

export const DEFAULT = 'GET';

/**
 * https://www.rfc-editor.org/rfc/rfc9110#name-overview
 */
const RFC9110 = [
	DEFAULT, 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE',
];

const NODE = [...http.METHODS];

const inMethodSet = list => {
	return name => I.Array.includes(list, I.String.toUpperCase(name));
};

export const isRFC9110Method = inMethodSet(RFC9110);
export const isNodeHttpMethod = inMethodSet(NODE);
export const normalize = name => I.String.toUpperCase(name);

export const isMethod = name => {
	if (!Is.StringType(name)) {
		return FALSE;
	}

	if (isRFC9110Method(name)) {
		return TRUE;
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
