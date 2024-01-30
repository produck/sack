import * as http from 'node:http';
import * as Utils from '@produck/sack-utils';

export const DEFAULT = 'GET';

/**
 * https://www.rfc-editor.org/rfc/rfc9110#name-overview
 */
const RFC9110 = [
	DEFAULT, 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE',
];

const NODE = [...http.METHODS];
export const isRFC9110Method = name => RFC9110.includes(name.toUpperCase());
export const isNodeHttpMethods = name => NODE.includes(name.toUpperCase());

export const isMethod = name => {
	if (!Utils.Type.isString(name)) {
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
	return name.toUpperCase() === name;
};

export const normalize = name => name.toUpperCase();

export const ABSTRACT = [
	'method', isMethod, DEFAULT,
	'http method names',
];
