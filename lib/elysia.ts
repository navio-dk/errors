import type { Context } from 'elysia';

import { isElysiaValidationError, isHttpError } from './assertions.ts';
import { formatErrorMessage } from './formatErrorMessage.ts';
import { HttpResponse } from './httpResponses.ts';
import { logTraceableError } from './utils.ts';

// The result of calling this should be passed to Elysia.onError
export function createErrorHandler(opts: { enableJsonLogging?: boolean } = {}) {
	return function onError({ error, set }: { error: unknown; set: Context['set'] }) {
		logTraceableError(error, { jsonLoggable: opts.enableJsonLogging ?? false });

		if (isElysiaValidationError(error)) {
			set.status = error.status;

			return error.message;
		}

		if (isHttpError(error)) {
			set.status = error.statusCode;

			return {
				name: error.name,
				message: error.message || error.httpDescription,
				...(error.code && { code: error.code }),
			};
		}

		// All non-custom errors are treated as 500 Internal Server Error and message is obscured
		set.status = HttpResponse.InternalServerError.code;

		return formatErrorMessage(HttpResponse.InternalServerError.name, HttpResponse.InternalServerError.description);
	};
}
