import type {EnkoreJSRuntimeContext} from "@anio-software/enkore.js-runtime"
import type {CopyOptions} from "#~export/CopyOptions.ts"
import type {PathInformation} from "@anio-software/pkg.node-fs-stat-path"

import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/Dependencies.ts"
//>import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/DependenciesSync.ts"

export async function copySymbolicLink(
//>export function copySymbolicLinkSync(
	context: EnkoreJSRuntimeContext,
	dependencies: Dependencies,
	options: CopyOptions,
	pathInformation: PathInformation,
	source: string,
	destination: string
): Promise<boolean> {
//>): boolean {
	context.log.trace(`copy symbolic link '${source}'`)

	return false
}
