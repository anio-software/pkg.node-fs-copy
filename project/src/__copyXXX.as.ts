import {
	type EnkoreJSRuntimeContextOptions,
	createContext
} from "@anio-software/enkore.js-runtime"

import type {CopyOptions as Options} from "#~export/CopyOptions.ts"
//>import type {CopySyncOptions as Options} from "#~export/CopySyncOptions.ts"
import type {__EnkoreFunctionDependencies} from "#~src/Dependencies.ts"
//>import type {__EnkoreFunctionDependencies} from "#~src/DependenciesSync.ts"
import {copyAnything} from "#~src/copyAnything.ts"
//>import {copyAnythingSync as copyAnything} from "#~src/copyAnythingSync.ts"

export type {__EnkoreFunctionDependencies}

export async function __implementation(
//>export function __implementationSync(
	contextOptions: EnkoreJSRuntimeContextOptions,
	dependencies: __EnkoreFunctionDependencies,
	options: Options
): Promise<boolean> {
//>): boolean {
	const context = createContext(contextOptions, 0)

	if (options.overwriteDestination === true) {
		context.log.debug(`overwriteDestination is set, trying to remove destination '${options.destination}'`)

		const removedSuccessfully = await dependencies.remove(
//>		const removedSuccessfully = dependencies.remove(
			options.destination, {
				force: true
			}
		)

		if (!removedSuccessfully) {
			context.log.error(`unable to remove destination '${options.destination}'.`)

			return false
		}
	}

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
