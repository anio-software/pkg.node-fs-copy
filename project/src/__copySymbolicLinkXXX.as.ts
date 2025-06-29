import type {EnkoreJSRuntimeContext} from "@anio-software/enkore.js-runtime"

import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/Dependencies.ts"
//>import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/DependenciesSync.ts"
import {readlink, symlink} from "@anio-software/pkg-private.node-consistent-fs/async"
//>import {readlink, symlink} from "@anio-software/pkg-private.node-consistent-fs/sync"

import type {CopyOptions} from "#~export/CopyOptions.ts"
import type {PathInformation} from "@anio-software/pkg.node-fs-stat-path"
import {getOrCreateError} from "@anio-software/pkg.js-utils"

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

	try {
		const link = await readlink(source)
//>		const link = readlink(source)

		await symlink(link, destination)
//>		symlink(link, destination)

		return true
	} catch (e) {
		const error = getOrCreateError(e)

		context.log.warn(`caught exception '${error.message}' while copying symbolic link '${source}'`)

		return false
	}
}
