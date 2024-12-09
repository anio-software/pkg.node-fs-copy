import {useContext, type RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"

import {readlink, symlink, copyFile, mkdir} from "@aniojs-private/node-async-sync-fs/sync"

import path from "node:path"

import type {PathType} from "@aniojs/node-fs-path-type"

import {getTypeOfPathSync as getTypeOfPath} from "@aniojs/node-fs-path-type"

import {scandirSyncCallback as scandirCallback} from "@aniojs/node-fs-scandir"

export type AnioJsDependencies = {
	getTypeOfPath: typeof getTypeOfPath,
	scandirCallback: typeof scandirCallback
}

function copySymbolicLink(
	src: string,
	dest: string
) {
	const link = readlink(src)

	symlink(link, dest)

	return undefined
}

function copyDirectory(
	src: string,
	dest: string
) {
	mkdir(dest, {
		recursive: true
	})

	scandirCallback(src, {
		callback(entry) {
			const {type, relative_path, absolute_path} = entry
			const entry_src = absolute_path
			const entry_dest = path.join(dest, relative_path)

			const args : [string, string] = [entry_src, entry_dest]

			if (
				type === "linkToFile" ||
				type === "linkToDir"  ||
				type === "brokenLink"
				) {
				copySymbolicLink(...args)
			} else if (type === "regularDir") {
				copyDirectory(...args)
			} else {
				copyFile(...args)
			}
		}
	})

	return undefined
}

type CopyablePathType = Exclude<PathType, "unknown" | "nonExisting">

const copy_map : {
	[T in CopyablePathType]: (src: string, dst: string) => undefined
} = {
	"linkToDir": copySymbolicLink,
	"linkToFile": copySymbolicLink,
	"brokenLink": copySymbolicLink,
	"regularFile": copyFile,
	"regularDir": copyDirectory
}

/**
 * @brief Synchronously copy a path.
 * @description
 * Synchronously copies path `src` to `dest`.
 * @param src Existing path.
 * @param dest Target path.
 */
export function implementation(
	wrapped_context: RuntimeWrappedContextInstance,
	dependencies: AnioJsDependencies,
	src: string,
	dest: string
) : undefined {
	const context = useContext(wrapped_context, 0)

	const path_type = dependencies.getTypeOfPath(src)

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

	copy_fn(src, dest)
}
