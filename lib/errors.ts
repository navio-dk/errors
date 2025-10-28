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

export abstract class InitializationError extends Error {}

export class MissingEnvironmentVariableError extends InitializationError {
	name = 'MissingEnvironmentVariableError' as const;

	constructor(public readonly envVar: Uppercase<string>, public readonly effect?: string) {
		super(`Missing environment variable: ${envVar} - ${effect}`);
	}
}