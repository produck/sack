declare class SackAgentReceiver extends EventTarget {
	constructor(request: Request, response: Response);
	readonly response: Response;
	readonly finished: boolean;
	use(...handlers: Handler[]): this;
	end(parser?: Parser): this | any;
}

type Parser = (receiver: SackAgentReceiver) => any;
type Handler = (receiver: SackAgentReceiver) => any;

declare class SackAgentRequestContext implements RequestInit {
	url: URL;
	headers: Headers;
	readonly options: RequestInit;
	finalize(key: keyof RequestInit): this;
	use(...handlers: Handler[]): this;
}

type Modifier = (context: SackAgentRequestContext) => any;

type RequestMethod = (
	...modifiers: Modifier[]
) => Promise<SackAgentRequestContext>;

interface SackAgentFetcherOptions {
	modifiers?: Modifier[];
}

declare class SackAgentFetcher extends EventTarget {
	constructor(options: SackAgentFetcherOptions);
	state: object;
	request: RequestMethod;
	get: RequestMethod;
	head: RequestMethod;
	post: RequestMethod;
	put: RequestMethod;
	delete: RequestMethod;
}

export { SackAgentFetcher as Fetcher };

export module Specification {
	export module Options {
		type Abstract<T> = Readonly<
			[
				key: string,
				validator: (any: any) => boolean,
				defaultValue: T,
				expected: string
			]
		>;

		export module Body {
			type DefaultValue = null;

			export const DEFAULT: DefaultValue;
			export const ABSTRACT: Abstract<DefaultValue>;
			export const EXPECTED: string;
			export function isBodyObject(any: any): boolean;
			export function isBody(any: any): boolean;
		}

		export module Cache {
			type DefaultValue = "same-origin";

			export const DEFAULT: DefaultValue;
			export const ABSTRACT: Abstract<DefaultValue>;
			export const EXPECTED: string;
			export function isCache(any: any): boolean;
		}

		export module Credential {
			type DefaultValue = "same-origin";

			export const DEFAULT: DefaultValue;
			export const ABSTRACT: Abstract<DefaultValue>;
			export const EXPECTED: string;
			export function isCredential(any: any): boolean;
		}

		export module Integrity {
			type DefaultValue = "";

			export const DEFAULT: DefaultValue;
			export const ABSTRACT: Abstract<DefaultValue>;
			export const EXPECTED: string;
			export function isIntegrity(any: any): boolean;
		}

		export module Keepalive {
			type DefaultValue = false;

			export const DEFAULT: DefaultValue;
			export const ABSTRACT: Abstract<DefaultValue>;
			export const EXPECTED: string;
			export function isKeepalive(any: any): boolean;
		}

		export module Method {
			type DefaultValue = "GET";

			export const DEFAULT: DefaultValue;
			export const ABSTRACT: Abstract<DefaultValue>;
			export const EXPECTED: string;
			export function isRFC9110Method(any: any): boolean;
			export function isNodeHttpMethods(any: any): boolean;
			export function isMethod(any: any): boolean;
			export function normalize(any: string): string;
		}

		export module Mode {
			type DefaultValue = "cors";

			export const DEFAULT: DefaultValue;
			export const ABSTRACT: Abstract<DefaultValue>;
			export const EXPECTED: string;
			export function isMode(any: any): boolean;
		}

		export module Priority {
			type DefaultValue = "auto";

			export const DEFAULT: DefaultValue;
			export const ABSTRACT: Abstract<DefaultValue>;
			export const EXPECTED: string;
			export function isPriority(any: any): boolean;
		}

		export module Redirect {
			type DefaultValue = "auto";

			export const DEFAULT: DefaultValue;
			export const ABSTRACT: Abstract<DefaultValue>;
			export const EXPECTED: string;
			export function isRedirect(any: any): boolean;
		}

		export module Referrer {
			type DefaultValue = "about:client";

			export const DEFAULT: DefaultValue;
			export const ABSTRACT: Abstract<DefaultValue>;
			export const EXPECTED: string;
			export function isReferrer(any: any): boolean;
		}

		export module ReferrerPolicy {
			type DefaultValue = "";

			export const DEFAULT: DefaultValue;
			export const ABSTRACT: Abstract<DefaultValue>;
			export const EXPECTED: string;
			export function isReferrer(any: any): boolean;
		}

		export module Signal {
			type DefaultValue = null;

			export const DEFAULT: DefaultValue;
			export const ABSTRACT: Abstract<DefaultValue>;
			export const EXPECTED: string;
			export function isSignal(any: any): boolean;
		}
	}
}
