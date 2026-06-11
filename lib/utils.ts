import type { ArrayElement, NonEmptyArray } from '@navio-dk/ts-utils';
import type { ValidationError } from 'elysia';
import type { HttpError } from './errors.ts';

import { consola, createConsola } from 'consola';
import { colorize } from 'consola/utils';
import { hasDetails, isElysiaValidationError, isError, isErrorOfType, isHttpError } from './assertions.ts';

const consolaNoDate = createConsola({
	formatOptions: {
		date: false,
	},
});

// TODO: see if catchError can be typed better with function overloading, since return type is dependent in whether errorsToCatch is passed or not

/* 
In any case, calling this will return tuple with data as first element (if no error is thrown).
Calling this with only first argument will return [data, undefined] if no error is thrown or [undefined, unknown error] if error is thrown.
Calling this with two args will return [data, undefined] if no error is thrown or [undefined, errortype] if error is thrown and it is of a type included in the second argument.
Calling this with two args will throw error if error is thrown and it is not of a type included in the second argument.
*/
// biome-ignore lint/suspicious/noExplicitAny: this is how Error constructors are actually typed
export function catchError<T, E extends NonEmptyArray<new (...args: any[]) => Error> | undefined>(
	promise: Promise<T>,
	errorsToCatch?: E
): Promise<[T, undefined] | [undefined, E extends undefined ? unknown : InstanceType<ArrayElement<E>>]> {
	return (
		promise
			.then((data): [T, undefined] => [data, undefined])
			// returntype is hard to type with .some etc, but at least the inputs and outputs match
			.catch(error => {
				if (!errorsToCatch) {
					return [undefined, error];
				}

				if (errorsToCatch.some(e => isErrorOfType(error, e))) {
					return [undefined, error];
				}

				throw error;
			})
	);
}

function buildErrorObject(error: unknown): Record<string, unknown> {
	// Handle non-Error objects
	if (!isError(error)) {
		return {
			timestamp: new Date().toISOString(),
			type: 'unknown',
			value: String(error),
		};
	}

	const errorObj: Record<string, unknown> = {
		timestamp: new Date().toISOString(),
		name: error.name,
		message: error.message,
	};

	// Add stack trace if available
	if (error.stack) {
		errorObj.stack = error.stack;
	}

	// Add HttpError specific properties
	if (isHttpError(error)) {
		errorObj.statusCode = error.statusCode;
		errorObj.httpName = error.httpName;
		errorObj.httpDescription = error.httpDescription;
	}

	// Add JSONLoggableError details (renamed from loggerDetails)
	if ('details' in error && error.details !== undefined) {
		errorObj.details = error.details;
	}

	// Add ValidationError specific properties
	if (isElysiaValidationError(error)) {
		errorObj.validationStatus = error.status;
		errorObj.validationType = error.type;
		errorObj.validationValue = error.value;
		errorObj.validationCode = error.code;
	}

	// Recursively process error.cause
	if (error.cause !== undefined) {
		errorObj.causedBy = buildErrorObject(error.cause);
	}

	return errorObj;
}

function logErrorAsJson(error: unknown): void {
	const errorObj = buildErrorObject(error);

	// Use console.log to bypass consola (no colors, no timestamp)
	// JSON.stringify produces single-line output by default
	// biome-ignore lint/suspicious/noConsole: deliberate consola bypass for single-line JSON logs
	console.log(JSON.stringify(errorObj));
}

export function logTraceableError(error: unknown, opts?: { jsonLoggable: boolean }) {
	if (opts?.jsonLoggable) {
		logErrorAsJson(error);

		return;
	}

	logError(error);

	if (isError(error) && error.cause) {
		// biome-ignore lint/suspicious/noConsole: deliberate consola bypass — single newline before CAUSED BY
		console.log();
		// biome-ignore lint/suspicious/noConsole: deliberate consola bypass
		console.debug(colorize('black', colorize('bgCyan', ' CAUSED BY ')));

		logTraceableError(error.cause);
	} else {
		// biome-ignore lint/suspicious/noConsole: deliberate consola bypass — single newline to separate errors more clearly
		console.log();
	}
}

function logError(error: unknown) {
	if (isHttpError(error)) {
		logHttpError(error);
	} else if (isElysiaValidationError(error)) {
		logElysiaValidationError(error);
	} else if (isError(error)) {
		logBuiltinError(error);
	} else {
		consola.error(error);
	}
}

function logHttpError(error: HttpError) {
	consola.error(error.name, `${colorize('bold', error.statusCode)}:`, error);

	// Log details if present (without extra newlines)
	if (hasDetails(error)) {
		consolaNoDate.info(colorize('cyan', 'Details:'), error.details);
	}
}

function logElysiaValidationError(error: ValidationError) {
	consola.error('Elysia ValidationError', `${colorize('bold', error.status)}:`, error);
}

function logBuiltinError(error: Error) {
	consola.error(`${error.name}:`, error);

	// Log details if present (without extra newlines)
	if (hasDetails(error)) {
		consolaNoDate.info(colorize('cyan', 'Details:'), error.details);
	}
}
