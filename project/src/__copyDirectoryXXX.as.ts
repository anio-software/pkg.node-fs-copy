import type {EnkoreJSRuntimeContext} from "@anio-software/enkore.js-runtime"

import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/Dependencies.ts"
//>import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/DependenciesSync.ts"
import {mkdir, chown} from "@anio-software/pkg-private.node-consistent-fs/async"
//>import {mkdir, chown} from "@anio-software/pkg-private.node-consistent-fs/sync"
import {copyAnything} from "#~src/copyAnything.ts"
//>import {copyAnythingSync as copyAnything} from "#~src/copyAnythingSync.ts"

import type {CopyOptions} from "#~export/CopyOptions.ts"
import type {PathInformation} from "@anio-software/pkg.node-fs-stat-path"
import {getOrCreateError} from "@anio-software/pkg.js-utils"
import path from "node:path"

export async function copyDirectory(
//>export function copyDirectorySync(
	context: EnkoreJSRuntimeContext,
	dependencies: Dependencies,
	options: CopyOptions,
	pathInformation: PathInformation,
	source: string,
	destination: string
): Promise<boolean> {
//>): boolean {
	context.log.trace(`copy directory '${source}'`)

	try {
		await mkdir(destination, {
//>		mkdir(destination, {
			mode: pathInformation.permissions.mode,
			recursive: false
		})

		if (options.copyOwner === true) {
			await chown(
//>			chown(
				destination,
				pathInformation.permissions.owner.user,
				pathInformation.permissions.owner.group
			)
		}

		return await dependencies.scandirCallback(source, {
//>		return dependencies.scandirCallback(source, {
			includePathInformation: true,
			maxDepth: 0,
			async callback(entry, {stopLoop}) {
//>			callback(entry, {stopLoop}) {
				const res = await copyAnything(
//>				const res = copyAnything(
					context,
					dependencies,
					options,
					entry.pathType,
					entry.information!,
					entry.absolutePath,
					path.join(destination, entry.relativePath)
				)

				if (!res) {
					return stopLoop(false)
				}

				return undefined
			}
		})
	} catch (e) {
		const error = getOrCreateError(e)

		context.log.warn(`caught exception '${error.message}' while copying directory '${source}'`)

		return false
	}
}
