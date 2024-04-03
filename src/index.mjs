import fs from "@anio-fs/api"

import sync_impl from "./auto/sync.mjs"
import async_impl from "./auto/async.mjs"

export function copy(src, dest) {
	return async_impl(fs.async, src, dest)
}

export function copySync(src, dest) {
	return sync_impl(fs.sync, src, dest)
}
