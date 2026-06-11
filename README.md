# Navio Errors
An opinionated collection of error types and utilities for error handling in typescript with Elysia.

## Mantra
Using this package means following 4 simple rules:

1. You should never throw an error that you are planning on catching again - errors are supposed to bubble up to Elysia's `onError` handler, that will log and send a fitting message to the client.
2. Use the `catchError` function when you want to handle errors from IO or third-party libraries, i.e., when you don't want them to bubble up to Elysia's error handler.
3. When you need to handle errors, you should pass them around as values (use `catchError` as needed). `undefined` or `null` will also be useful in many cases. This ensures better type safety.
4. When creating a new error, always wrap any original error.

## Install
This package is published to **GitHub Packages**. The registry install (below) is recommended — `github:` refs are incompatible with `bun install --frozen-lockfile`. The `github:` method still works and is kept for repos still mid-migration.

### Registry (recommended)
First, add a scoped registry + auth to your project's `.npmrc` (next to `package.json`):

```ini
# .npmrc
@navio-dk:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

- **Local:** create a GitHub [personal access token **(classic)**](https://github.com/settings/tokens/new) with the `read:packages` scope (GitHub Packages does **not** support fine-grained tokens; if `navio-dk` enforces SAML SSO, click **Configure SSO** on the token and authorize it for the org), then export it in your shell — keep it in the env, never paste it into the committed `.npmrc`:

  ```bash
  export NODE_AUTH_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx   # add to ~/.zshrc (or ~/.bashrc) to persist across sessions
  ```

- **CI (GitHub Actions):** set `NODE_AUTH_TOKEN` to `${{ secrets.GITHUB_TOKEN }}` and grant this package "Actions access" to the consuming repo (Package → Settings → Manage Actions access).

Then add the dependency in your `package.json`:

```json5
// package.json
{
	"dependencies": {
		"@navio-dk/errors": "^{version}"
	}
}
```

### GitHub ref (legacy — being phased out)
<!-- eslint-disable-next-line markdown/no-missing-label-refs -- not a ref -->
> [!NOTE]
> `github:` refs break `bun install --frozen-lockfile`. Prefer the registry install above; these remain for repos still on the old approach.

```json5
// package.json
{
	"dependencies": {
		"@navio-dk/errors": "github:navio-dk/errors#v{version}", // specific tag
		"@navio-dk/errors": "github:navio-dk/errors" // latest commit
	}
}
```

## Usage

### Elysia setup
In Elysia, you will need to set up the following snippets somewhere in your Elysia app before your routes handlers are defined:

```typescript
import { createErrorHandler } from '@navio-dk/errors';
import * as errors from '@navio-dk/errors/errors';

const enableJsonLogging = process.env.JSON_LOGGING === 'true;

const app = new Elysia()
	// ...
	.error(errors)
	.onError(createErrorHandler({ enableJsonLogging }))
	// ... route handlers
	.listen(3000);
```

`.onError(createErrorHandler())` will catch any thrown errors and log them using `logTraceableError`. This will make errors prettier, easier to grok and also log all wrapped errors. The handler also makes sure to send a fitting message and status code to the client.

Setting `enableJsonLogging` to `true` will format errors in one line of stringified JSON, perfect for console scrapers such as Loki.

## Utilities
You can use the `isHttpError` and `isError` among other type guards to manage error types.

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
