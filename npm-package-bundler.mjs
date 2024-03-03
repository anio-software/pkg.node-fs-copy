export default {
	preprocessing: [{
		file: "./src/template.mjs",
		items: {
			"async function copySymbolicLink(": "function copySymbolicLink(",
			"await fs_object.readlink": "fs_object.readlink",
			"await fs_object.symlink": "fs_object.symlink",
			"async function copyFile(": "function copyFile(",
			"await fs_object.copyFile": "fs_object.copyFile",
			"async function copyDirectory(": "function copyDirectory(",
			"await fs_object.mkdir": "fs_object.mkdir",
			"await nodeFsScandir(": "nodeFsScandir.sync(",
			"async callback({type, relative_path, absolute_path})": "callback({type, relative_path, absolute_path})",
			"await copySymbolicLink(": "copySymbolicLink(",
			"await copyDirectory(": "copyDirectory(",
			"await copyFile(": "copyFile(",
			"export default async function": "export default function",
			"await nodeFsGetPathType(": "nodeFsGetPathType.sync(",
			"await copy_fn(": "copy_fn("
		},
		output: "./src/auto/sync.mjs"
	}, {
		file: "./src/template.mjs",
		items: {},
		output: "./src/auto/async.mjs"
	}]
}
