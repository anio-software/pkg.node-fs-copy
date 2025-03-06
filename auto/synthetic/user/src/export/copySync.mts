import {createContext} from "@fourtune/realm-js/v0/runtime"

import {copySyncFactory as factory} from "#~synthetic/user/export/copySyncFactory.mts"

/**
 * @brief Synchronously copy a path.
 * @description
 * Synchronously copies path `src` to `dest`.
 * @param src Existing path.
 * @param dest Target path.
 */
export function copySync(src: string, dest: string) : undefined {
	const __fnImplementation = factory(createContext())

	return __fnImplementation(src, dest)
}
