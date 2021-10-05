
declare module '@compassdigital/id/interface' {
	export type EncodedID = string;
	export interface DecodedID {
		service: string;
		provider: string;
		type: string;
		id: string;
	}
}

declare module '@compassdigital/id' {

	import { DecodedID } from '@compassdigital/id/interface';

	/**
	 * ID is a utility function which both encodes and decodes CDL ids using a
	 * bespoke encoding scheme.
	 *
	 * - If a string is provided, it will be decoded to an id object.
	 * - If an id object is provided, it will be encoded to a string.
	 * - If a falsy value is provided, undefined will be returned.
	 * - If 4 string parameters are provided, they will be used to construct an
	 *   id object which will then be encoded to a string.
	 */
	function ID(
		service: string,
		provider: string,
		type: string,
		id: string | number
	): string;
	function ID(decoded: DecodedID): string;
	function ID(encoded: string): DecodedID | undefined;
	function ID(encoded: string | undefined): DecodedID | undefined;
	function ID(decoded: DecodedID | undefined): string | undefined;
	export = ID;
}
