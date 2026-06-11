import type { StatusMap } from 'elysia';

export const HttpResponse = {
	// 1xx Informational
	Continue: {
		code: 100,
		name: 'Continue',
		description: 'The server has received the request headers, and the client should proceed to send the request body.',
	},
	SwitchingProtocols: {
		code: 101,
		name: 'Switching Protocols',
		description: 'The requester has asked the server to switch protocols.',
	},
	Processing: {
		code: 102,
		name: 'Processing',
		description: 'The server has received and is processing the request, but no response is available yet.',
	},
	EarlyHints: {
		code: 103,
		name: 'Early Hints',
		description: 'The server is preloading resources while preparing a response.',
	},

	// 2xx Success
	Ok: {
		code: 200,
		name: 'OK',
		description: 'The request is OK.',
	},
	Created: {
		code: 201,
		name: 'Created',
		description: 'The request has been fulfilled and a new resource has been created.',
	},
	Accepted: {
		code: 202,
		name: 'Accepted',
		description: 'The request has been accepted for processing, but the processing has not been completed.',
	},
	NonAuthoritativeInformation: {
		code: 203,
		name: 'Non-Authoritative Information',
		description:
			'The request has been successfully processed, but the returned information may be from another source.',
	},
	NoContent: {
		code: 204,
		name: 'No Content',
		description: 'The request has been successfully processed, but there is no content to return.',
	},
	ResetContent: {
		code: 205,
		name: 'Reset Content',
		description: 'The request has been successfully processed and the user agent should reset the document view.',
	},
	PartialContent: {
		code: 206,
		name: 'Partial Content',
		description: 'The server is delivering only part of the resource due to a range header sent by the client.',
	},
	MultiStatus: {
		code: 207,
		name: 'Multi-Status',
		description: 'The message body contains multiple status codes for multiple independent operations.',
	},
	AlreadyReported: {
		code: 208,
		name: 'Already Reported',
		description: 'The members of a DAV binding have already been enumerated and are not being included again.',
	},

	// 3xx Redirection
	MultipleChoices: {
		code: 300,
		name: 'Multiple Choices',
		description: 'The request has more than one possible response.',
	},
	MovedPermanently: {
		code: 301,
		name: 'Moved Permanently',
		description: 'The URL of the requested resource has been changed permanently.',
	},
	Found: {
		code: 302,
		name: 'Found',
		description: 'The URI of requested resource has been changed temporarily.',
	},
	SeeOther: {
		code: 303,
		name: 'See Other',
		description: 'The response to the request can be found under another URI using a GET method.',
	},
	NotModified: {
		code: 304,
		name: 'Not Modified',
		description: 'The resource has not been modified since the version specified by the request headers.',
	},
	TemporaryRedirect: {
		code: 307,
		name: 'Temporary Redirect',
		description:
			'The request should be repeated with another URI, but future requests should still use the original URI.',
	},
	PermanentRedirect: {
		code: 308,
		name: 'Permanent Redirect',
		description: 'The request and all future requests should be repeated using another URI.',
	},

	// 4xx Client Errors
	BadRequest: {
		code: 400,
		name: 'Bad Request',
		description: 'The server cannot process the request due to a client error.',
	},
	Unauthorized: {
		code: 401,
		name: 'Unauthorized',
		description: 'The client must authenticate itself to get the requested response.',
	},
	PaymentRequired: {
		code: 402,
		name: 'Payment Required',
		description: 'Reserved for future use in digital payment systems.',
	},
	Forbidden: {
		code: 403,
		name: 'Forbidden',
		description: 'The client does not have access rights to the content.',
	},
	NotFound: {
		code: 404,
		name: 'Not Found',
		description: 'The server cannot find the requested resource.',
	},
	MethodNotAllowed: {
		code: 405,
		name: 'Method Not Allowed',
		description: 'The request method is known by the server but is not supported by the target resource.',
	},
	NotAcceptable: {
		code: 406,
		name: 'Not Acceptable',
		description:
			'The server cannot produce a response matching the list of acceptable values defined in the request headers.',
	},
	ProxyAuthenticationRequired: {
		code: 407,
		name: 'Proxy Authentication Required',
		description: 'The client must first authenticate itself with the proxy.',
	},
	RequestTimeout: {
		code: 408,
		name: 'Request Timeout',
		description: 'The server timed out waiting for the request.',
	},
	Conflict: {
		code: 409,
		name: 'Conflict',
		description: 'The request conflicts with the current state of the server.',
	},
	Gone: {
		code: 410,
		name: 'Gone',
		description: 'The requested content has been permanently deleted from the server.',
	},
	LengthRequired: {
		code: 411,
		name: 'Length Required',
		description: 'The server rejected the request because the Content-Length header field is not defined.',
	},
	PreconditionFailed: {
		code: 412,
		name: 'Precondition Failed',
		description: 'The precondition given in the request headers evaluated to false by the server.',
	},
	PayloadTooLarge: {
		code: 413,
		name: 'Payload Too Large',
		description: 'The request body is larger than limits defined by server.',
	},
	URITooLong: {
		code: 414,
		name: 'URI Too Long',
		description: 'The URI requested by the client is longer than the server is willing to interpret.',
	},
	UnsupportedMediaType: {
		code: 415,
		name: 'Unsupported Media Type',
		description: 'The media format of the requested data is not supported by the server.',
	},
	RangeNotSatisfiable: {
		code: 416,
		name: 'Range Not Satisfiable',
		description: 'The range specified by the Range header field in the request cannot be fulfilled.',
	},
	ExpectationFailed: {
		code: 417,
		name: 'Expectation Failed',
		description: 'The expectation indicated by the Expect request header field cannot be met by the server.',
	},
	ImATeapot: {
		code: 418,
		name: "I'm a teapot",
		description: 'The server refuses to brew coffee because it is, permanently, a teapot.',
	},
	MisdirectedRequest: {
		code: 421,
		name: 'Misdirected Request',
		description: 'The request was directed at a server that is not able to produce a response.',
	},
	UnprocessableContent: {
		code: 422,
		name: 'Unprocessable Content',
		description: 'The request was well-formed but was unable to be followed due to semantic errors.',
	},
	Locked: {
		code: 423,
		name: 'Locked',
		description: 'The resource that is being accessed is locked.',
	},
	FailedDependency: {
		code: 424,
		name: 'Failed Dependency',
		description: 'The request failed due to failure of a previous request.',
	},
	TooEarly: {
		code: 425,
		name: 'Too Early',
		description: 'The server is unwilling to risk processing a request that might be replayed.',
	},
	UpgradeRequired: {
		code: 426,
		name: 'Upgrade Required',
		description: 'The server refuses to perform the request using the current protocol.',
	},
	PreconditionRequired: {
		code: 428,
		name: 'Precondition Required',
		description: 'The origin server requires the request to be conditional.',
	},
	TooManyRequests: {
		code: 429,
		name: 'Too Many Requests',
		description: 'The user has sent too many requests in a given amount of time.',
	},
	RequestHeaderFieldsTooLarge: {
		code: 431,
		name: 'Request Header Fields Too Large',
		description: 'The server is unwilling to process the request because its header fields are too large.',
	},
	UnavailableForLegalReasons: {
		code: 451,
		name: 'Unavailable For Legal Reasons',
		description: 'The server is denying access to the resource as a consequence of a legal demand.',
	},

	// 5xx Server Errors
	InternalServerError: {
		code: 500,
		name: 'Internal Server Error',
		description: 'The server has encountered a situation it does not know how to handle.',
	},
	NotImplemented: {
		code: 501,
		name: 'Not Implemented',
		description: 'The request method is not supported by the server and cannot be handled.',
	},
	BadGateway: {
		code: 502,
		name: 'Bad Gateway',
		description:
			'The server, while acting as a gateway or proxy, received an invalid response from the upstream server.',
	},
	ServiceUnavailable: {
		code: 503,
		name: 'Service Unavailable',
		description: 'The server is not ready to handle the request.',
	},
	GatewayTimeout: {
		code: 504,
		name: 'Gateway Timeout',
		description: 'The server is acting as a gateway and cannot get a response in time.',
	},
	HTTPVersionNotSupported: {
		code: 505,
		name: 'HTTP Version Not Supported',
		description: 'The HTTP version used in the request is not supported by the server.',
	},
	VariantAlsoNegotiates: {
		code: 506,
		name: 'Variant Also Negotiates',
		description: 'The server has an internal configuration error.',
	},
	InsufficientStorage: {
		code: 507,
		name: 'Insufficient Storage',
		description: 'The server is unable to store the representation needed to complete the request.',
	},
	LoopDetected: {
		code: 508,
		name: 'Loop Detected',
		description: 'The server detected an infinite loop while processing the request.',
	},
	NotExtended: {
		code: 510,
		name: 'Not Extended',
		description: 'Further extensions to the request are required for the server to fulfill it.',
	},
	NetworkAuthenticationRequired: {
		code: 511,
		name: 'Network Authentication Required',
		description: 'The client needs to authenticate to gain network access.',
	},
} as const;

export type HttpResponse = (typeof HttpResponse)[keyof typeof HttpResponse];

export type HttpCode = (typeof HttpResponse)[keyof typeof HttpResponse]['code'];

type MappedElysiaStatusMap = Record<
	string,
	{
		code: StatusMap[keyof StatusMap];
		name: keyof StatusMap;
		description: string;
	}
>;

HttpResponse satisfies MappedElysiaStatusMap;
//*							/\
//* this will light up if HttpResponse has a code / name that is not also in Elysia's StatusMap, which is used for setting status codes in Elysia
