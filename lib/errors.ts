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
	statusCode = HttpResponse.Precondition.code;
	httpName = HttpResponse.Precondition.name;
	httpDescription = HttpResponse.Precondition.description;
}

export class PayloadTooLargeError extends HttpError {
	name = 'PayloadTooLargeError' as const;
	statusCode = HttpResponse.RequestEntityTooLarge.code;
	httpName = HttpResponse.RequestEntityTooLarge.name;
	httpDescription = HttpResponse.RequestEntityTooLarge.description;
}

export class UriTooLongError extends HttpError {
	name = 'UriTooLongError' as const;
	statusCode = HttpResponse.RequestUriTooLong.code;
	httpName = HttpResponse.RequestUriTooLong.name;
	httpDescription = HttpResponse.RequestUriTooLong.description;
}

export class UnsupportedMediaTypeError extends HttpError {
	name = 'UnsupportedMediaTypeError' as const;
	statusCode = HttpResponse.UnsupportedMediaType.code;
	httpName = HttpResponse.UnsupportedMediaType.name;
	httpDescription = HttpResponse.UnsupportedMediaType.description;
}

export class RangeNotSatisfiableError extends HttpError {
	name = 'RangeNotSatisfiableError' as const;
	statusCode = HttpResponse.RequestedRangeNotSatisfiable.code;
	httpName = HttpResponse.RequestedRangeNotSatisfiable.name;
	httpDescription = HttpResponse.RequestedRangeNotSatisfiable.description;
}

export class ExpectationFailedError extends HttpError {
	name = 'ExpectationFailedError' as const;
	statusCode = HttpResponse.ExpectationFailed.code;
	httpName = HttpResponse.ExpectationFailed.name;
	httpDescription = HttpResponse.ExpectationFailed.description;
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
	statusCode = HttpResponse.HttpVersionNotSupported.code;
	httpName = HttpResponse.HttpVersionNotSupported.name;
	httpDescription = HttpResponse.HttpVersionNotSupported.description;
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