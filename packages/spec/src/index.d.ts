export namespace Options {
	type Abstract<T> = Readonly<
		[
			key: string,
			validator: (any: any) => boolean,
			defaultValue: T,
			expected: string
		]
	>;

	export namespace Body {
		type DefaultValue = null;

		export const DEFAULT: DefaultValue;
		export const ABSTRACT: Abstract<DefaultValue>;
		export const EXPECTED: string;
		export function isBodyObject(any: any): boolean;
		export function isBody(any: any): boolean;
	}

	export namespace Cache {
		type DefaultValue = "same-origin";

		export const DEFAULT: DefaultValue;
		export const ABSTRACT: Abstract<DefaultValue>;
		export const EXPECTED: string;
		export function isCache(any: any): boolean;
	}

	export namespace Credentials {
		type DefaultValue = "same-origin";

		export const DEFAULT: DefaultValue;
		export const ABSTRACT: Abstract<DefaultValue>;
		export const EXPECTED: string;
		export function isCredential(any: any): boolean;
	}

	export namespace Integrity {
		type DefaultValue = "";

		export const DEFAULT: DefaultValue;
		export const ABSTRACT: Abstract<DefaultValue>;
		export const EXPECTED: string;
		export function isIntegrity(any: any): boolean;
	}

	export namespace Keepalive {
		type DefaultValue = false;

		export const DEFAULT: DefaultValue;
		export const ABSTRACT: Abstract<DefaultValue>;
		export const EXPECTED: string;
		export function isKeepalive(any: any): boolean;
	}

	export namespace Method {
		type DefaultValue = "GET";

		export const DEFAULT: DefaultValue;
		export const ABSTRACT: Abstract<DefaultValue>;
		export const EXPECTED: string;
		export function isRFC9110Method(any: any): boolean;
		export function isNodeHttpMethods(any: any): boolean;
		export function isMethod(any: any): boolean;
		export function normalize(any: string): string;
	}

	export namespace Mode {
		type DefaultValue = "cors";

		export const DEFAULT: DefaultValue;
		export const ABSTRACT: Abstract<DefaultValue>;
		export const EXPECTED: string;
		export function isMode(any: any): boolean;
	}

	export namespace Priority {
		type DefaultValue = "auto";

		export const DEFAULT: DefaultValue;
		export const ABSTRACT: Abstract<DefaultValue>;
		export const EXPECTED: string;
		export function isPriority(any: any): boolean;
	}

	export namespace Redirect {
		type DefaultValue = "auto";

		export const DEFAULT: DefaultValue;
		export const ABSTRACT: Abstract<DefaultValue>;
		export const EXPECTED: string;
		export function isRedirect(any: any): boolean;
	}

	export namespace Referrer {
		type DefaultValue = "about:client";

		export const DEFAULT: DefaultValue;
		export const ABSTRACT: Abstract<DefaultValue>;
		export const EXPECTED: string;
		export function isReferrer(any: any): boolean;
	}

	export namespace ReferrerPolicy {
		type DefaultValue = "";

		export const DEFAULT: DefaultValue;
		export const ABSTRACT: Abstract<DefaultValue>;
		export const EXPECTED: string;
		export function isReferrer(any: any): boolean;
	}

	export namespace Signal {
		type DefaultValue = null;

		export const DEFAULT: DefaultValue;
		export const ABSTRACT: Abstract<DefaultValue>;
		export const EXPECTED: string;
		export function isSignal(any: any): boolean;
	}
}
