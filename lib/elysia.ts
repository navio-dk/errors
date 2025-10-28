import { isHttpError, isElysiaValidationError } from './assertions';
import { HttpResponse } from './http-responses';
import { formatErrorMessage, logTraceableError } from './utils';
import type { Context } from 'elysia';

// The result of calling this should be passed to Elysia.onError
export function createErrorHandler(opts: {
	enableJsonLogging?: boolean
} = {}) {
	return function onError({ error, set }: {
		error: unknown,
		set: Context['set']
	}) {
		logTraceableError(error, { jsonLoggable: opts.enableJsonLogging ?? false });

		if (isElysiaValidationError(error)) {
			set.status = error.status;

			return error.message;
		}

		if (isHttpError(error)) {
			set.status = error.statusCode;

			return formatErrorMessage(error.name, error.message) || error.httpMessage;
		}

		// All non-custom errors are treated as 500 Internal Server Error and message is obscured
		set.status = HttpResponse.InternalServerError.code;

		return formatErrorMessage(HttpResponse.InternalServerError.name, HttpResponse.InternalServerError.description);
	};
}