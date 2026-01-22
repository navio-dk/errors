import { HttpResponse, type HttpCode } from './http-responses';
import { formatErrorMessage } from './utils';
import type { Jsonifiable } from '@navio-dk/ts-utils';

export abstract class JSONLoggableError extends Error {
	// details are not readonly, if we for some reason want to catch and add details, the re-throw etc.
	details?: Jsonifiable;

	constructor(message?: string, ctx?: {
		cause?: unknown;
		details?: Jsonifiable
	}) {
		super(message, { cause: ctx?.cause });

		this.details = ctx?.details;
	}

	// By default, JSON.stringify will escape newlines in strings and create a string with no newlines, which makes it work with log scrapers such as Loki
	get formattedDetails() {
		return JSON.stringify(this.details);
	}
}

export abstract class HttpError extends JSONLoggableError {
	abstract readonly statusCode: HttpCode
	abstract readonly httpName: HttpResponse['name']
	abstract readonly httpDescription: HttpResponse['description']
	
	get httpMessage() {
		return formatErrorMessage(this.httpName, this.httpDescription);
	}
}

export class NotFoundError extends HttpError {
	name = 'NotFoundError' as const;
	statusCode = HttpResponse.NotFound.code;
	httpName = HttpResponse.NotFound.name;
	httpDescription = HttpResponse.NotFound.description;
}

export class ConflictError extends HttpError {
	name = 'ConflictError' as const;
	statusCode = HttpResponse.Conflict.code;
	httpName = HttpResponse.Conflict.name;
	httpDescription = HttpResponse.Conflict.description;
}

export class BadRequestError extends HttpError {
	name = 'BadRequestError' as const;
	statusCode = HttpResponse.BadRequest.code;
	httpName = HttpResponse.BadRequest.name;
	httpDescription = HttpResponse.BadRequest.description;
}

export class AuthorizationError extends HttpError {
	name = 'AuthorizationError' as const;
	statusCode = HttpResponse.Forbidden.code;
	httpName = HttpResponse.Forbidden.name;
	httpDescription = HttpResponse.Forbidden.description;
}

export class AuthenticationError extends HttpError {
	name = 'AuthenticationError' as const;
	statusCode = HttpResponse.Unauthorized.code;
	httpName = HttpResponse.Unauthorized.name;
	httpDescription = HttpResponse.Unauthorized.description;
}

export class InternalServerError extends HttpError {
	name = 'InternalServerError' as const;
	statusCode = HttpResponse.InternalServerError.code;
	httpName = HttpResponse.InternalServerError.name;
	httpDescription = HttpResponse.InternalServerError.description;
}

export class PaymentRequiredError extends HttpError {
	name = 'PaymentRequiredError' as const;
	statusCode = HttpResponse.PaymentRequired.code;
	httpName = HttpResponse.PaymentRequired.name;
	httpDescription = HttpResponse.PaymentRequired.description;
}

export class MethodNotAllowedError extends HttpError {
	name = 'MethodNotAllowedError' as const;
	statusCode = HttpResponse.MethodNotAllowed.code;
	httpName = HttpResponse.MethodNotAllowed.name;
	httpDescription = HttpResponse.MethodNotAllowed.description;
}

export class NotAcceptableError extends HttpError {
	name = 'NotAcceptableError' as const;
	statusCode = HttpResponse.NotAcceptable.code;
	httpName = HttpResponse.NotAcceptable.name;
	httpDescription = HttpResponse.NotAcceptable.description;
}

export class ProxyAuthenticationRequiredError extends HttpError {
	name = 'ProxyAuthenticationRequiredError' as const;
	statusCode = HttpResponse.ProxyAuthenticationRequired.code;
	httpName = HttpResponse.ProxyAuthenticationRequired.name;
	httpDescription = HttpResponse.ProxyAuthenticationRequired.description;
}

export class RequestTimeoutError extends HttpError {
	name = 'RequestTimeoutError' as const;
	statusCode = HttpResponse.RequestTimeout.code;
	httpName = HttpResponse.RequestTimeout.name;
	httpDescription = HttpResponse.RequestTimeout.description;
}

export class GoneError extends HttpError {
	name = 'GoneError' as const;
	statusCode = HttpResponse.Gone.code;
	httpName = HttpResponse.Gone.name;
	httpDescription = HttpResponse.Gone.description;
}

export class LengthRequiredError extends HttpError {
	name = 'LengthRequiredError' as const;
	statusCode = HttpResponse.LengthRequired.code;
	httpName = HttpResponse.LengthRequired.name;
	httpDescription = HttpResponse.LengthRequired.description;
}

export class PreconditionFailedError extends HttpError {
	name = 'PreconditionFailedError' as const;
	statusCode = HttpResponse.PreconditionFailed.code;
	httpName = HttpResponse.PreconditionFailed.name;
	httpDescription = HttpResponse.PreconditionFailed.description;
}

export class PayloadTooLargeError extends HttpError {
	name = 'PayloadTooLargeError' as const;
	statusCode = HttpResponse.PayloadTooLarge.code;
	httpName = HttpResponse.PayloadTooLarge.name;
	httpDescription = HttpResponse.PayloadTooLarge.description;
}

export class UriTooLongError extends HttpError {
	name = 'UriTooLongError' as const;
	statusCode = HttpResponse.URITooLong.code;
	httpName = HttpResponse.URITooLong.name;
	httpDescription = HttpResponse.URITooLong.description;
}

export class UnsupportedMediaTypeError extends HttpError {
	name = 'UnsupportedMediaTypeError' as const;
	statusCode = HttpResponse.UnsupportedMediaType.code;
	httpName = HttpResponse.UnsupportedMediaType.name;
	httpDescription = HttpResponse.UnsupportedMediaType.description;
}

export class RangeNotSatisfiableError extends HttpError {
	name = 'RangeNotSatisfiableError' as const;
	statusCode = HttpResponse.RangeNotSatisfiable.code;
	httpName = HttpResponse.RangeNotSatisfiable.name;
	httpDescription = HttpResponse.RangeNotSatisfiable.description;
}

export class ExpectationFailedError extends HttpError {
	name = 'ExpectationFailedError' as const;
	statusCode = HttpResponse.ExpectationFailed.code;
	httpName = HttpResponse.ExpectationFailed.name;
	httpDescription = HttpResponse.ExpectationFailed.description;
}

export class ImATeapotError extends HttpError {
	name = 'ImATeapotError' as const;
	statusCode = HttpResponse.ImATeapot.code;
	httpName = HttpResponse.ImATeapot.name;
	httpDescription = HttpResponse.ImATeapot.description;
}

export class MisdirectedRequestError extends HttpError {
	name = 'MisdirectedRequestError' as const;
	statusCode = HttpResponse.MisdirectedRequest.code;
	httpName = HttpResponse.MisdirectedRequest.name;
	httpDescription = HttpResponse.MisdirectedRequest.description;
}

export class UnprocessableContentError extends HttpError {
	name = 'UnprocessableContentError' as const;
	statusCode = HttpResponse.UnprocessableContent.code;
	httpName = HttpResponse.UnprocessableContent.name;
	httpDescription = HttpResponse.UnprocessableContent.description;
}

export class LockedError extends HttpError {
	name = 'LockedError' as const;
	statusCode = HttpResponse.Locked.code;
	httpName = HttpResponse.Locked.name;
	httpDescription = HttpResponse.Locked.description;
}

export class FailedDependencyError extends HttpError {
	name = 'FailedDependencyError' as const;
	statusCode = HttpResponse.FailedDependency.code;
	httpName = HttpResponse.FailedDependency.name;
	httpDescription = HttpResponse.FailedDependency.description;
}

export class TooEarlyError extends HttpError {
	name = 'TooEarlyError' as const;
	statusCode = HttpResponse.TooEarly.code;
	httpName = HttpResponse.TooEarly.name;
	httpDescription = HttpResponse.TooEarly.description;
}

export class UpgradeRequiredError extends HttpError {
	name = 'UpgradeRequiredError' as const;
	statusCode = HttpResponse.UpgradeRequired.code;
	httpName = HttpResponse.UpgradeRequired.name;
	httpDescription = HttpResponse.UpgradeRequired.description;
}

export class PreconditionRequiredError extends HttpError {
	name = 'PreconditionRequiredError' as const;
	statusCode = HttpResponse.PreconditionRequired.code;
	httpName = HttpResponse.PreconditionRequired.name;
	httpDescription = HttpResponse.PreconditionRequired.description;
}

export class TooManyRequestsError extends HttpError {
	name = 'TooManyRequestsError' as const;
	statusCode = HttpResponse.TooManyRequests.code;
	httpName = HttpResponse.TooManyRequests.name;
	httpDescription = HttpResponse.TooManyRequests.description;
}

export class RequestHeaderFieldsTooLargeError extends HttpError {
	name = 'RequestHeaderFieldsTooLargeError' as const;
	statusCode = HttpResponse.RequestHeaderFieldsTooLarge.code;
	httpName = HttpResponse.RequestHeaderFieldsTooLarge.name;
	httpDescription = HttpResponse.RequestHeaderFieldsTooLarge.description;
}

export class UnavailableForLegalReasonsError extends HttpError {
	name = 'UnavailableForLegalReasonsError' as const;
	statusCode = HttpResponse.UnavailableForLegalReasons.code;
	httpName = HttpResponse.UnavailableForLegalReasons.name;
	httpDescription = HttpResponse.UnavailableForLegalReasons.description;
}

export class NotImplementedError extends HttpError {
	name = 'NotImplementedError' as const;
	statusCode = HttpResponse.NotImplemented.code;
	httpName = HttpResponse.NotImplemented.name;
	httpDescription = HttpResponse.NotImplemented.description;
}

export class BadGatewayError extends HttpError {
	name = 'BadGatewayError' as const;
	statusCode = HttpResponse.BadGateway.code;
	httpName = HttpResponse.BadGateway.name;
	httpDescription = HttpResponse.BadGateway.description;
}

export class ServiceUnavailableError extends HttpError {
	name = 'ServiceUnavailableError' as const;
	statusCode = HttpResponse.ServiceUnavailable.code;
	httpName = HttpResponse.ServiceUnavailable.name;
	httpDescription = HttpResponse.ServiceUnavailable.description;
}

export class GatewayTimeoutError extends HttpError {
	name = 'GatewayTimeoutError' as const;
	statusCode = HttpResponse.GatewayTimeout.code;
	httpName = HttpResponse.GatewayTimeout.name;
	httpDescription = HttpResponse.GatewayTimeout.description;
}

export class HttpVersionNotSupportedError extends HttpError {
	name = 'HttpVersionNotSupportedError' as const;
	statusCode = HttpResponse.HTTPVersionNotSupported.code;
	httpName = HttpResponse.HTTPVersionNotSupported.name;
	httpDescription = HttpResponse.HTTPVersionNotSupported.description;
}

export class VariantAlsoNegotiatesError extends HttpError {
	name = 'VariantAlsoNegotiatesError' as const;
	statusCode = HttpResponse.VariantAlsoNegotiates.code;
	httpName = HttpResponse.VariantAlsoNegotiates.name;
	httpDescription = HttpResponse.VariantAlsoNegotiates.description;
}

export class InsufficientStorageError extends HttpError {
	name = 'InsufficientStorageError' as const;
	statusCode = HttpResponse.InsufficientStorage.code;
	httpName = HttpResponse.InsufficientStorage.name;
	httpDescription = HttpResponse.InsufficientStorage.description;
}

export class LoopDetectedError extends HttpError {
	name = 'LoopDetectedError' as const;
	statusCode = HttpResponse.LoopDetected.code;
	httpName = HttpResponse.LoopDetected.name;
	httpDescription = HttpResponse.LoopDetected.description;
}

export class NotExtendedError extends HttpError {
	name = 'NotExtendedError' as const;
	statusCode = HttpResponse.NotExtended.code;
	httpName = HttpResponse.NotExtended.name;
	httpDescription = HttpResponse.NotExtended.description;
}

export class NetworkAuthenticationRequiredError extends HttpError {
	name = 'NetworkAuthenticationRequiredError' as const;
	statusCode = HttpResponse.NetworkAuthenticationRequired.code;
	httpName = HttpResponse.NetworkAuthenticationRequired.name;
	httpDescription = HttpResponse.NetworkAuthenticationRequired.description;
}

export abstract class InitializationError extends Error {}

export class MissingEnvironmentVariableError extends InitializationError {
	name = 'MissingEnvironmentVariableError' as const;

	constructor(public readonly envVar: Uppercase<string>, public readonly effect?: string) {
		super(`Missing environment variable: ${envVar} - ${effect}`);
	}
}