import type {EnkoreJSRuntimeContext} from "@anio-software/enkore.js-runtime"
import type {PathType} from "@anio-software/pkg.node-fs-path-type"
import type {PathInformation} from "@anio-software/pkg.node-fs-stat-path"

import type {CopyOptions as Options} from "#~export/CopyOptions.ts"
//>import type {CopySyncOptions as Options} from "#~export/CopySyncOptions.ts"
import {copyFile} from "./copyFile.ts"
//>import {copyFileSync as copyFile} from "./copyFileSync.ts"
import {copySymbolicLink} from "./copySymbolicLink.ts"
//>import {copySymbolicLinkSync as copySymbolicLink} from "./copySymbolicLinkSync.ts"
import {copyDirectory} from "./copyDirectory.ts"
//>import {copyDirectorySync as copyDirectory} from "./copyDirectorySync.ts"
import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/Dependencies.ts"
//>import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/DependenciesSync.ts"

import {isFunction} from "@anio-software/pkg.is"

export async function copyAnything(
//>export function copyAnythingSync(
	context: EnkoreJSRuntimeContext,
	dependencies: Dependencies,
	options: Options,
	pathType: PathType,
	pathInfo: PathInformation,
	source: string,
	destination: string
): Promise<boolean> {
//>): boolean {
	if (isFunction(options.shouldCopyEntry)) {
		const shouldBeCopied = await options.shouldCopyEntry(
//>		const shouldBeCopied = options.shouldCopyEntry(
			source, pathType, pathInfo
		)

		if (shouldBeCopied !== true) {
			context.log.debug(`skipping '${source}'`)

			return true
		}
	}

	if (
	    pathType === "link:file"   ||
	    pathType === "link:dir"    ||
	    pathType === "link:broken" ||
	    pathType === "link:error") {
		return await copySymbolicLink(
//>		return copySymbolicLink(
			context,
			dependencies,
			options,
			pathInfo,
			source,
			destination
		)
	} else if (pathType === "dir:regular") {
		return await copyDirectory(
//>		return copyDirectory(
			context,
			dependencies,
			options,
			pathInfo,
			source,
			destination
		)
	} else if (pathType === "file:regular") {
		return await copyFile(
//>		return copyFile(
			context,
			dependencies,
			options,
			pathInfo,
			source,
			destination
		)
	}

	context.log.warn(`unable to copy path '${options.source}' due to an invalid path type.`)

	return false
}
