# Navio Errors
An opinionated collection of error types and utilities for error handling in typescript with Elysia.

## Mantra
Using this package means following 4 simple rules:

1. You should never throw an error that you are planning on catching again - errors are supposed to bubble up to Elysia's `onError` handler, that will log and send a fitting message to the client.
2. Use the `catchError` function when you want to handle errors from IO or third-party libraries, i.e., when you don't want them to bubble up to Elysia's error handler.
3. When you need to handle errors, you should pass them around as values (use `catchError` as needed). `undefined` or `null` will also be useful in many cases. This ensures better type safety.
4. When creating a new error, always wrap any original error.

## Install
Add this repository as a dependency in your `package.json`:

```json
// package.json
{
	"dependencies": {
		"@navio-dk/errors": "github:navio-dk/errors#v1.0.0", // specific tag (recommended)
		"@navio-dk/errors": "github:navio-dk/errors" // latest commit
	}
}
```

## Usage

### Elysia setup
In Elysia, you will need to set up the following snippets somewhere in your Elysia app before your routes handlers are defined:

```typescript
import { onError } from '@navio-dk/errors';
import * as errors from '@navio-dk/errors/errors';

const app = new Elysia()
	// ...
	.error(errors)
	.onError(onError)
	// ... route handlers
	.listen(3000);
```

The `.error(errors)` snippet is technically not necessary if you also use `.onError(onError)`. `.error(errors)` will register the custom errors from this library, which will give you type safety inside the `.onError` hook. This is obviously only necessary if you want to customize how `onError` works instead of using this library's complete solution.

`.onError(onError)` will catch any thrown errors and log them using `logTraceableError`. This will make errors prettier, easier to grok and also log all wrapped errors. The handler also makes sure to send a fitting message and status code to the client.

## Utilities
You can use the `isHttpError` and `isError` type guards to manage error types.

## Logging Errors
You can use `logTraceableError` in Elysia's error handler to log any error in a pretty way (including the whole stack trace).

## Development

### Developing with other application
When developing on this package, it might be beneficial to see how changes interact with your source code in your application. To do this, you can use [bun link](https://bun.sh/docs/cli/link).

**TLDR**:
1. Execute `bun link` from the root of this repository.
2. Execute `bun link @navio-dk/errors` in the root of your application.

This package should now be usable in your application (see [Usage section](#usage)), and updates to this package will be reflected instantly in your application (by the magic of symlinks).

<!-- eslint-disable-next-line markdown/no-missing-label-refs -- not a ref -->
> [!IMPORTANT]  
> This will not add the dependency to your `package.json`, so you will need to [install](#install) this package manually if you wish to do use it.
