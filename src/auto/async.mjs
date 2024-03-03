import nodeFsGetPathType from "@anio-node-foundation/fs-get-path-type"
import nodeFsScandir from "@anio-node-foundation/fs-scandir"
import path from "node:path"

async function copySymbolicLink(fs_object, src, dest) {
	const link = await fs_object.readlink(src)

	await fs_object.symlink(link, dest)
}

async function copyFile(fs_object, src, dest) {
	await fs_object.copyFile(src, dest)
}

async function copyDirectory(fs_object, src, dest) {
	await fs_object.mkdir(dest, {
		recursive: true
	})

	await nodeFsScandir(src, {
		async callback({type, relative_path, absolute_path}) {
			const entry_src = absolute_path
			const entry_dest = path.join(dest, relative_path)

			const args = [fs_object, entry_src, entry_dest]

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

export default async function(fs_object, src, dest) {
	const path_type = await nodeFsGetPathType(src)

	if (path_type === false) {
		throw new Error(`source path '${src}' does not exist.`)
	}

	if (!(path_type in copy_map)) {
		throw new Error(`Don't know how to copy path of type '${path_type}'.`)
	}

	const copy_fn = copy_map[path_type]

	return await copy_fn(fs_object, src, dest)
}
