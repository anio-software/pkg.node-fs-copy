import {
	type EnkoreJSRuntimeContextOptions,
	createContext
} from "@anio-software/enkore.js-runtime"

export type __EnkoreFunctionDependencies = {}

export async function __implementation(
//>export function __implementationSync(
	contextOptions: EnkoreJSRuntimeContextOptions,
	dependencies: __EnkoreFunctionDependencies,
	src: string,
	dest: string
): Promise<undefined> {
//>): undefined {
	const context = createContext(contextOptions, 0)
}
