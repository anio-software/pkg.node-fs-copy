import {generateFromTemplate} from "vipen/autogenerate"

const asyncToSync = {
	"import {readlink, symlink, copyFile, mkdir} from \"@anio-fs/api/async\"": "import {readlink, symlink, copyFile, mkdir} from \"@anio-fs/api/sync\"",
	"import {getTypeOfPath} from \"@anio-fs/path-type\"": "import {getTypeOfPathSync} from \"@anio-fs/path-type\"",
	"import {scandir} from \"@anio-fs/scandir\"": "import {scandirSync} from \"@anio-fs/scandir\"",
	"async function copySymbolicLink(": "function copySymbolicLink(",
	"await readlink": "readlink",
	"await symlink": "symlink",
	"async function copyDirectory(": "function copyDirectory(",
	"await mkdir": "mkdir",
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
