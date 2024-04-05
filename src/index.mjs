import sync_impl from "./auto/sync.mjs"
import async_impl from "./auto/async.mjs"

export function copy(src, dest) {
	return async_impl(src, dest)
}

export function copySync(src, dest) {
	return sync_impl(src, dest)
}
