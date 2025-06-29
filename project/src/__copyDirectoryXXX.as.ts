import type {EnkoreJSRuntimeContext} from "@anio-software/enkore.js-runtime"
import type {CopyOptions} from "#~export/CopyOptions.ts"
import type {PathInformation} from "@anio-software/pkg.node-fs-stat-path"

import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/Dependencies.ts"
//>import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/DependenciesSync.ts"

import {mkdir} from "@anio-software/pkg-private.node-consistent-fs/async"
//>import {mkdir} from "@anio-software/pkg-private.node-consistent-fs/sync"
import {copyAnything} from "#~src/copyAnything.ts"
//>import {copyAnythingSync as copyAnything} from "#~src/copyAnythingSync.ts"

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
					entry.pathType as any,
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
