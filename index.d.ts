declare module '@compassdigital/id' {
	export type CdlEncodedID = string;

	export interface CdlDecodedID {
		service: string;
		provider: string;
		type: string;
		id: string;
	}

	function ID(
		service: string,
		provider: string,
		type: string,
		id: string
	): CdlEncodedID | undefined;
	function ID(decoded: CdlDecodedID): CdlEncodedID | undefined;
	function ID(encoded: CdlEncodedID): CdlDecodedID | undefined;

	export default ID;
}
