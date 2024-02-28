import fs from "node:fs"

export default function(src, dest) {
	fs.copyFileSync(src, dest)

	return dest
}
