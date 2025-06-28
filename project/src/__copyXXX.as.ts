import {
	type EnkoreJSRuntimeContextOptions,
	createContext
} from "@anio-software/enkore.js-runtime"

export type __EnkoreFunctionDependencies = {}

import type {CopyOptions} from "#~export/CopyOptions.ts"

export async function __implementation(
//>export function __implementationSync(
	contextOptions: EnkoreJSRuntimeContextOptions,
	dependencies: __EnkoreFunctionDependencies,
	options: CopyOptions
): Promise<undefined> {
//>): undefined {
	const context = createContext(contextOptions, 0)
}
