import fs from "node:fs"

export default function(src, dest) {
	const link = fs.readlinkSync(src)

	fs.symlinkSync(link, dest)

	return dest
}
