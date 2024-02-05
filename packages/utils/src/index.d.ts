export module Lang {
	type TypeName =
		| "bigint"
		| "boolean"
		| "function"
		| "number"
		| "object"
		| "string"
		| "symbol"
		| "undefined";

	type Newable = abstract new (...args: any) => any;

	export function TypeOf(operand: any): TypeName;
	export function TypeOfEquel(operand: any, type: TypeName): boolean;
	export function InstanceOf(operand: any, Constructor: Newable): boolean;

	export function ThrowError(
		message: string,
		ErrorConstructor: typeof Error
	): undefined;

	export function ThrowTypeError(message: string): undefined;

	export function ThrowTemplatedTypeError(
		role: string,
		expected: string
	): undefined;
}

export module Type {
	function isString(operand: any): boolean;
	function isBoolean(operand: any): boolean;
	function isFunction(operand: any): boolean;
	function isNull(operand: any): boolean;
}

export module Error {
	export class SackError extends Error {}
	export function throwError(message: string): never;
	export { throwError as throw };
}

export function toListString(array: string[]): string;
