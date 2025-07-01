import {
	type EnkoreJSRuntimeContextOptions,
	createContext
} from "@anio-software/enkore.js-runtime"

import type {CopyOptions} from "#~export/CopyOptions.ts"
//>import type {CopySyncOptions as CopyOptions} from "#~export/CopySyncOptions.ts"
import type {__EnkoreFunctionDependencies} from "#~src/Dependencies.ts"
//>import type {__EnkoreFunctionDependencies} from "#~src/DependenciesSync.ts"
import {copyAnything} from "#~src/copyAnything.ts"
//>import {copyAnythingSync as copyAnything} from "#~src/copyAnythingSync.ts"

export type {__EnkoreFunctionDependencies}

export async function __implementation(
//>export function __implementationSync(
	contextOptions: EnkoreJSRuntimeContextOptions,
	dependencies: __EnkoreFunctionDependencies,
	options: CopyOptions
): Promise<boolean> {
//>): boolean {
	const context = createContext(contextOptions, 0)

	const pathType = await dependencies.getTypeOfPath(options.source)
//>	const pathType = dependencies.getTypeOfPath(options.source)

	const pathInfo = await dependencies.getPathInformation(options.source)
//>	const pathInfo = dependencies.getPathInformation(options.source)

	return await copyAnything(
//>	return copyAnything(
		context,
		dependencies,
		options,
		pathType,
		pathInfo,
		options.source,
		options.destination
	)
}
