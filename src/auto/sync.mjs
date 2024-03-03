import nodeFsGetPathType from "@anio-node-foundation/fs-get-path-type"
import nodeFsScandir from "@anio-node-foundation/fs-scandir"
import path from "node:path"

function copySymbolicLink(fs_object, src, dest) {
	const link = fs_object.readlink(src)

	fs_object.symlink(link, dest)
}

function copyFile(fs_object, src, dest) {
	fs_object.copyFile(src, dest)
}

function copyDirectory(fs_object, src, dest) {
	fs_object.mkdir(dest, {
		recursive: true
	})

	nodeFsScandir.sync(src, {
		callback({type, relative_path, absolute_path}) {
			const entry_src = absolute_path
			const entry_dest = path.join(dest, relative_path)

			const args = [fs_object, entry_src, entry_dest]

			if (type === "link") {
				copySymbolicLink(...args)
			} else if (type === "dir") {
				copyDirectory(...args)
			} else {
				copyFile(...args)
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

export default function(fs_object, src, dest) {
	const path_type = nodeFsGetPathType.sync(src)

	if (!(path_type in copy_map)) {
		throw new Error(`Don't know how to copy path of type '${path_type}'.`)
	}

	const copy_fn = copy_map[path_type]

	return copy_fn(fs_object, src, dest)
}
