import {readlink, symlink, copyFile, mkdir} from "@anio-fs/api/async"
import {getTypeOfPath} from "@anio-fs/path-type"
import {scandir} from "@anio-fs/scandir"
import path from "node:path"

async function copySymbolicLink(src, dest) {
	const link = await readlink(src)

	await symlink(link, dest)
}

async function copyDirectory(src, dest) {
	await mkdir(dest, {
		recursive: true
	})

	await scandir(src, {
		async callback({type, relative_path, absolute_path}) {
			const entry_src = absolute_path
			const entry_dest = path.join(dest, relative_path)

			const args = [entry_src, entry_dest]

			if (type === "link") {
				await copySymbolicLink(...args)
			} else if (type === "dir") {
				await copyDirectory(...args)
			} else {
				await copyFile(...args)
			}
		}
	})
}

const copy_map = {
	"link->dir": copySymbolicLink,
	"link->file": copySymbolicLink,
	"link->broken": copySymbolicLink,
	"file": copyFile,
	"dir": copyDirectory
}

export default async function(src, dest) {
	const path_type = await getTypeOfPath(src)

	if (path_type === false) {
		throw new Error(`source path '${src}' does not exist.`)
	}

	if (!(path_type in copy_map)) {
		throw new Error(`Don't know how to copy path of type '${path_type}'.`)
	}

	const copy_fn = copy_map[path_type]

	return await copy_fn(src, dest)
}
