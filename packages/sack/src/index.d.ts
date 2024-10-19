declare class SackAgentReceiver extends EventTarget {
	constructor(request: Request, response: Response);
	fetcher: SackAgentFetcher;
	readonly response: Response;
	readonly finished: boolean;
	use(...handlers: Handler[]): this;

	end<T extends Parser>(
		parser?: T
	): T extends undefined ? this : ReturnType<Parser>;
}

type Parser = (receiver: SackAgentReceiver) => any;
type Handler = (receiver: SackAgentReceiver) => any;

export class SackAgentRequestContext implements RequestInit {
	url: URL;
	headers: Headers;
	readonly options: RequestInit;
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
