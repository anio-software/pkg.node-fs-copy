import nodeFsGetPathTypeSync from "@anio-js-core-foundation/node-fs-get-path-type-sync"

import copySymbolicLink from "./copySymbolicLink.mjs"
import copyFile from "./copyFile.mjs"
import copyDirectory from "./copyDirectory.mjs"

const copy_fn = {
	"link->dir": copySymbolicLink,
	"link->file": copySymbolicLink,
	"link->broken": copySymbolicLink,
	"file": copyFile,
	"dir": copyDirectory
}

export default function(src, dest) {
	const src_type = nodeFsGetPathTypeSync(src)

	if (src_type === false) {
		throw new Error(`Source path '${src}' does not exist.`)
	} else if (!(src_type in copy_fn)) {
		throw new Error(`I don't know how to copy a path of type '${src_type}'.`)
	}

	const fn = copy_fn[src_type]

	return fn(src, dest)
}
