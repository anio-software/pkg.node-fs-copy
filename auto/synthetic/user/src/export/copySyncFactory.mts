import {implementation, type AnioJsDependencies} from "#~synthetic/async.sync/copySync.mts"
import type {RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"
import {getProject} from "@fourtune/realm-js/v0/project"

// vvv dependencies declared via AnioJsDependencies type
import {getTypeOfPathSyncFactory} from "@aniojs/node-fs-path-type"
import {scandirSyncCallbackFactory} from "@aniojs/node-fs-scandir"
// ^^^ dependencies declared via AnioJsDependencies type

/**
 * @brief Synchronously copy a path.
 * @description
 * Synchronously copies path `src` to `dest`.
 * @param src Existing path.
 * @param dest Target path.
 */
declare function copySync(
	src: string,
	dest: string
) : undefined

/**
 * @brief
 * Create an instance of the function 'copySync'.
 *
 * @param user
 * Options object (see @fourtune/realm-js/v0/runtime) or an already
 * created context with createContext().
 * This parameter is optional.
 *
 * @return
 * An instance of the function 'copySync'.
 */
export function copySyncFactory(context: RuntimeWrappedContextInstance) : typeof copySync {
	const dependencies : AnioJsDependencies = {
		getTypeOfPath: getTypeOfPathSyncFactory(context),
		scandirCallback: scandirSyncCallbackFactory(context)
	}

	const project = getProject()
	const local_context : RuntimeWrappedContextInstance = {
		...context,
		_package: {
			name: project.package_json.name,
			version: project.package_json.version,
			author: project.package_json.author,
			license: project.package_json.license
		}
	}

	return function copySync(src: string, dest: string) : undefined {
		return implementation(local_context, dependencies, src, dest)
	}
}
