import {useContext, type RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"

import {readlink, symlink, copyFile, mkdir} from "@aniojs-private/node-async-sync-fs/async"

import path from "node:path"

import type {PathType} from "@aniojs/node-fs-path-type"

import {getTypeOfPath} from "@aniojs/node-fs-path-type"

import {scandirCallback} from "@aniojs/node-fs-scandir"

export type AnioJsDependencies = {
	getTypeOfPath: typeof getTypeOfPath,
	scandirCallback: typeof scandirCallback
}

async function copySymbolicLink(
	src: string,
	dest: string
) {
	const link = await readlink(src)

	await symlink(link, dest)

	return undefined
}

async function copyDirectory(
	src: string,
	dest: string
) {
	await mkdir(dest, {
		recursive: true
	})

	await scandirCallback(src, {
		async callback(entry) {
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
			} else if (type === "regularDir") {
				await copyDirectory(...args)
			} else {
				await copyFile(...args)
			}
		}
	})

	return undefined
}

type CopyablePathType = Exclude<PathType, "unknown" | "nonExisting">

const copy_map : {
	[T in CopyablePathType]: (src: string, dst: string) => Promise<undefined>
} = {
	"linkToDir": copySymbolicLink,
	"linkToFile": copySymbolicLink,
	"brokenLink": copySymbolicLink,
	"regularFile": copyFile,
	"regularDir": copyDirectory
}

/**
 * @brief Asynchronously copy a path.
 * @description
 * Asynchronously copies path `src` to `dest`.
 * @param src Existing path.
 * @param dest Target path.
 */
export async function implementation(
	wrapped_context: RuntimeWrappedContextInstance,
	dependencies: AnioJsDependencies,
	src: string,
	dest: string
) : Promise<undefined> {
	const context = useContext(wrapped_context, 0)

	context.log.debug(
		`attempting to copy '${src}' to '${dest}'.`
	)

	const path_type = await dependencies.getTypeOfPath(src)

	if (path_type === "nonExisting") {
		throw new Error(`source path '${src}' does not exist.`)
	}

	if (
		(!(path_type in copy_map)) ||
		path_type === "unknown"
	) {
		throw new Error(`Don't know how to copy path of type '${path_type}'.`)
	}

	const copy_fn = copy_map[path_type]

	await copy_fn(src, dest)
}
