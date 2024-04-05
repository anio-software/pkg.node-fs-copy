import {readlink, symlink, copyFile, mkdir} from "@anio-fs/api/sync"
import {getTypeOfPathSync} from "@anio-fs/path-type"
import {scandirSync} from "@anio-fs/scandir"
import path from "node:path"

function copySymbolicLink(src, dest) {
	const link = readlink(src)

	symlink(link, dest)
}

function copyDirectory(src, dest) {
	mkdir(dest, {
		recursive: true
	})

	scandirSync(src, {
		callback({type, relative_path, absolute_path}) {
			const entry_src = absolute_path
			const entry_dest = path.join(dest, relative_path)

			const args = [entry_src, entry_dest]

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

export default function(src, dest) {
	const path_type = getTypeOfPathSync(src)

	if (path_type === false) {
		throw new Error(`source path '${src}' does not exist.`)
	}

	if (!(path_type in copy_map)) {
		throw new Error(`Don't know how to copy path of type '${path_type}'.`)
	}

	const copy_fn = copy_map[path_type]

	return copy_fn(src, dest)
}
