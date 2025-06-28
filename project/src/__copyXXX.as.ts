import {
	type EnkoreJSRuntimeContextOptions,
	createContext
} from "@anio-software/enkore.js-runtime"

import {readlink, symlink, copyFile, mkdir} from "@anio-software/pkg-private.node-consistent-fs/async"
//>import {readlink, symlink, copyFile, mkdir} from "@anio-software/pkg-private.node-consistent-fs/sync"
import type {getTypeOfPath} from "@anio-software/pkg.node-fs-path-type"
//>import type {getTypeOfPathSync as getTypeOfPath} from "@anio-software/pkg.node-fs-path-type"
import {scandirCallback} from "@aniojs/node-fs-scandir"
//>import {scandirSyncCallback as scandirCallback} from "@aniojs/node-fs-scandir"

import type {ValidPathType} from "@anio-software/pkg.node-fs-path-type"
import path from "node:path"

export type __EnkoreFunctionDependencies = {
	getTypeOfPath: typeof getTypeOfPath,
	scandirCallback: typeof scandirCallback
}

async function copySymbolicLink(
//>function copySymbolicLink(
	src: string,
	dest: string
) {
	const link = await readlink(src)
//>	const link = readlink(src)

	await symlink(link, dest)
//>	symlink(link, dest)

	return undefined
}

async function copyDirectory(
//>function copyDirectory(
	src: string,
	dest: string
) {
	await mkdir(dest, {
//>	mkdir(dest, {
		recursive: true
	})

	await scandirCallback(src, {
//>	scandirCallback(src, {
		async callback(entry) {
//>		callback(entry) {
			const {type, relative_path, absolute_path} = entry
			const entry_src = absolute_path
			const entry_dest = path.join(dest, relative_path)

			const args : [string, string] = [entry_src, entry_dest]

			if (
				type === "linkToFile" ||
				type === "linkToDir"  ||
				type === "brokenLink"
				) {
				await copySymbolicLink(...args)
//>				copySymbolicLink(...args)
			} else if (type === "regularDir") {
				await copyDirectory(...args)
//>				copyDirectory(...args)
			} else {
				await copyFile(...args)
//>				copyFile(...args)
			}
		}
	})

	return undefined
}

const copyMap : {
	[T in ValidPathType]: (src: string, dst: string) => Promise<undefined>
//>	[T in ValidPathType]: (src: string, dst: string) => undefined
} = {
	"link:dir"    : copySymbolicLink,
	"link:file"   : copySymbolicLink,
	"link:broken" : copySymbolicLink,
	"file:regular": copyFile,
	"dir:regular" : copyDirectory
}

/**
 * @brief Asynchronously copy a path.
//> * @brief Synchronously copy a path.
 * @description
 * Asynchronously copies path `src` to `dest`.
//> * Synchronously copies path `src` to `dest`.
 * @param src Existing path.
 * @param dest Target path.
 */
export async function __implementation(
//>export function __implementationSync(
	contextOptions: EnkoreJSRuntimeContextOptions,
	dependencies: __EnkoreFunctionDependencies,
	src: string,
	dest: string
) : Promise<undefined> {
//>) : undefined {
	const context = createContext(contextOptions, 0)

	context.log.debug(`attempting to copy '${src}' to '${dest}'.`)

	const path_type = await dependencies.getTypeOfPath(src)
//>	const path_type = dependencies.getTypeOfPath(src)

	if (path_type === "nonExisting") {
		throw new Error(`source path '${src}' does not exist.`)
	}

	if (
		(!(path_type in copyMap)) ||
		path_type === "unknown"
	) {
		throw new Error(`Don't know how to copy path of type '${path_type}'.`)
	}

	const copy_fn = copyMap[path_type]

	await copy_fn(src, dest)
//>	copy_fn(src, dest)
}
