import type {EnkoreJSRuntimeContext} from "@anio-software/enkore.js-runtime"
import type {CopyOptions} from "#~export/CopyOptions.ts"
import type {PathInformation} from "@anio-software/pkg.node-fs-stat-path"

export async function copyDirectory(
//>export function copyDirectorySync(
	context: EnkoreJSRuntimeContext,
	options: CopyOptions,
	pathInformation: PathInformation,
	source: string,
	destination: string
): Promise<boolean> {
//>): boolean {
	context.log.trace(`copy directory '${source}'`)

	return false
}
