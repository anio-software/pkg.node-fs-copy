import type {EnkoreJSRuntimeContext} from "@anio-software/enkore.js-runtime"
import type {CopyOptions} from "#~export/CopyOptions.ts"
import type {ValidPathType} from "@anio-software/pkg.node-fs-path-type"
import type {PathInformation} from "@anio-software/pkg.node-fs-stat-path"

export type CopyablePathType = ValidPathType | "link:error"

import {copyFile} from "./copyFile.ts"
//>import {copyFileSync as copyFile} from "./copyFileSync.ts"
import {copySymbolicLink} from "./copySymbolicLink.ts"
//>import {copySymbolicLinkSync as copySymbolicLink} from "./copySymbolicLinkSync.ts"
import {copyDirectory} from "./copyDirectory.ts"
//>import {copyDirectorySync as copyDirectory} from "./copyDirectorySync.ts"

import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/Dependencies.ts"
//>import type {__EnkoreFunctionDependencies as Dependencies} from "#~src/DependenciesSync.ts"

export async function copyAnything(
//>export function copyAnythingSync(
	context: EnkoreJSRuntimeContext,
	dependencies: Dependencies,
	options: CopyOptions,
	pathType: CopyablePathType,
	pathInfo: PathInformation,
	source: string,
	destination: string
): Promise<boolean> {
//>): boolean {
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

	return false
}
