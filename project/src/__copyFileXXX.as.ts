import type {EnkoreJSRuntimeContext} from "@anio-software/enkore.js-runtime"
import type {CopyOptions} from "#~export/CopyOptions.ts"
import type {PathInformation} from "@anio-software/pkg.node-fs-stat-path"

import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/Dependencies.ts"
//>import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/DependenciesSync.ts"

import {copyFile as _copyFile, chmod} from "@anio-software/pkg-private.node-consistent-fs/async"
//>import {copyFile as _copyFile, chmod} from "@anio-software/pkg-private.node-consistent-fs/sync"

import {getOrCreateError} from "@anio-software/pkg.js-utils"

export async function copyFile(
//>export function copyFileSync(
	context: EnkoreJSRuntimeContext,
	dependencies: Dependencies,
	options: CopyOptions,
	pathInformation: PathInformation,
	source: string,
	destination: string
): Promise<boolean> {
//>): boolean {
	context.log.trace(`copy file '${source}'`)

	try {
		await _copyFile(source, destination)
//>		_copyFile(source, destination)

		await chmod(destination, pathInformation.permissions.mode)
//>		chmod(destination, pathInformation.permissions.mode)

		return true
	} catch (e) {
		const error = getOrCreateError(e)

		context.log.warn(`caught exception '${error.message}' while copying file '${source}'`)

		return false
	}
}
