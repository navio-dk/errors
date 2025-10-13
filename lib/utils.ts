import { consola, createConsola } from 'consola';
import { colorize } from 'consola/utils';
import type { HttpError } from './errors';
import {
	isElysiaValidationError,
	isError,
	isErrorOfType,
	isHttpError,
} from './assertions';
import type { NonEmptyArray, ArrayElement } from '@navio-dk/ts-utils';
import type { ValidationError } from 'elysia';

const consolaNoDate = createConsola({
	level: 0,
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function catchError<T, E extends NonEmptyArray<new (...args: any[]) => Error> | undefined>(promise: Promise<T>, errorsToCatch?: E): Promise<[T, undefined] | [undefined, E extends undefined ? unknown : InstanceType<ArrayElement<E>>]> {
	return promise.then((data): [T, undefined] =>
		[ data, undefined ])
		// eslint-disable-next-line @typescript-eslint/use-unknown-in-catch-callback-variable -- returntype is hard to type with .some etc, but at least the inputs and outputs match
		.catch((error) => {
			if (!errorsToCatch) {
				return [ undefined, error ];
			}
		
			if (errorsToCatch.some(e => isErrorOfType(error, e))) {
				return [ undefined, error ];
			}

			throw error;
		});
}

export function formatErrorMessage(name: string, desc: string) {
	return `${name}: ${desc}`;
}

export function logTraceableError(error: unknown, withDate = true) {
	logError(error, withDate);

	if (isError(error) && error.cause) {
		// eslint-disable-next-line no-console
		console.debug(colorize('black', colorize('bgCyan', ' CAUSED BY ')));

		logError(error.cause, false);
	} else {
		// eslint-disable-next-line no-console
		console.log('\n'); // newline to separate errors more clearly
	}
}

function logError(error: unknown, withDate = true) {
	if (isHttpError(error)) {
		logHttpError(error, withDate);
	} else if (isElysiaValidationError(error)) {
		logElysiaValidationError(error, withDate);
	} else if (isError(error)) {
		logBuiltinError(error, withDate);
	} else {
		if (withDate) {
			consola.error(error);

			return;
		}
	}
}

function logHttpError(error: HttpError, withDate = true) {
	if (withDate) {
		consola.error(error.name, colorize('bold', error.statusCode) + ':', error);

		return;
	}

	consolaNoDate.error(error.name, colorize('bold', error.statusCode) + ':', error);
}

function logElysiaValidationError(error: ValidationError, withDate = true) {
	if (withDate) {
		consola.error('Elysia ValidationError', colorize('bold', error.status) + ':', error);

		return;
	}

	consolaNoDate.error('Elysia ValidationError', colorize('bold', error.status) + ':', error);
}

function logBuiltinError(error: Error, withDate = true) {
	if (withDate) {
		consola.error(error.name + ':', error);

		return;
	}
	
	consolaNoDate.error(error.name + ':', error);
}