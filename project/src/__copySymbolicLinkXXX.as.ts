import type {EnkoreJSRuntimeContext} from "@anio-software/enkore.js-runtime"

import type {CopyOptions as Options} from "#~export/CopyOptions.ts"
//>import type {CopySyncOptions as Options} from "#~export/CopySyncOptions.ts"
import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/Dependencies.ts"
//>import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/DependenciesSync.ts"
import {readlink, symlink, lchown} from "@anio-software/pkg-private.node-consistent-fs/async"
//>import {readlink, symlink, lchown} from "@anio-software/pkg-private.node-consistent-fs/sync"

import type {PathInformation} from "@anio-software/pkg.node-fs-stat-path"
import {getOrCreateError} from "@anio-software/pkg.js-utils"

export async function copySymbolicLink(
//>export function copySymbolicLinkSync(
	context: EnkoreJSRuntimeContext,
	dependencies: Dependencies,
	options: Options,
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

		if (options.copyOwner === true) {
			await lchown(
//>			lchown(
				destination,
				pathInformation.permissions.owner.user,
				pathInformation.permissions.owner.group
			)
		}

		return true
	} catch (e) {
		const error = getOrCreateError(e)

		context.log.warn(`caught exception '${error.message}' while copying symbolic link '${source}'`)

		return false
	}
}
