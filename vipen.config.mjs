import {generateFromTemplate} from "vipen/autogenerate"

const asyncToSync = {
	"import {getTypeOfPath} from \"@anio-fs/path-type\"": "import {getTypeOfPathSync} from \"@anio-fs/path-type\"",
	"import {scandir} from \"@anio-fs/scandir\"": "import {scandirSync} from \"@anio-fs/scandir\"",
	"async function copySymbolicLink(": "function copySymbolicLink(",
	"await fs_object.readlink": "fs_object.readlink",
	"await fs_object.symlink": "fs_object.symlink",
	"async function copyFile(": "function copyFile(",
	"await fs_object.copyFile": "fs_object.copyFile",
	"async function copyDirectory(": "function copyDirectory(",
	"await fs_object.mkdir": "fs_object.mkdir",
	"await scandir(": "scandirSync(",
	"async callback({type, relative_path, absolute_path})": "callback({type, relative_path, absolute_path})",
	"await copySymbolicLink(": "copySymbolicLink(",
	"await copyDirectory(": "copyDirectory(",
	"await copyFile(": "copyFile(",
	"export default async function": "export default function",
	"await getTypeOfPath(": "getTypeOfPathSync(",
	"await copy_fn(": "copy_fn("
}

export default {
	realm: "js",
	type: "package",

	autogenerate: {
		"sync.mjs": generateFromTemplate("src/template.mjs", asyncToSync),
		"async.mjs": generateFromTemplate("src/template.mjs", {})
	}
}
