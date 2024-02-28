import nodeFsScandirSync from "@anio-js-core-foundation/node-fs-scandir-sync"
import fs from "node:fs"
import path from "node:path"

import copySymbolicLink from "./copySymbolicLink.mjs"
import copyFile from "./copyFile.mjs"

export default function(src, dest) {
	const entries = nodeFsScandirSync(src)

	fs.mkdirSync(dest, {
		recursive: true
	})

	for (const entry of entries) {
		const dest_path = path.join(dest, entry.relative_path)

		if (entry.type === "link") {
			copySymbolicLink(entry.absolute_path, dest_path)
		} else if (entry.type === "dir") {
			fs.mkdirSync(dest_path)
		} else {
			copyFile(entry.absolute_path, dest_path)
		}
	}

	return dest
}
