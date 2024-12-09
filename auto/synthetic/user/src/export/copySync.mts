import {createContext} from "@fourtune/realm-js/v0/runtime"

import {copySyncFactory as factory} from "#~synthetic/user/export/copySyncFactory.mts"

const fn = factory(createContext())

/**
 * @brief Synchronously copy a path.
 * @description
 * Synchronously copies path `src` to `dest`.
 * @param src Existing path.
 * @param dest Target path.
 */
export function copySync(src: string, dest: string) : undefined {
	return fn(src, dest)
}
