import {implementation, type AnioJsDependencies} from "#~synthetic/async.sync/copy.mts"
import type {RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"
import {getProject} from "@fourtune/realm-js/v0/project"

// vvv dependencies declared via AnioJsDependencies type
import {getTypeOfPathFactory} from "@aniojs/node-fs-path-type"
import {scandirCallbackFactory} from "@aniojs/node-fs-scandir"
// ^^^ dependencies declared via AnioJsDependencies type

// vvv--- types needed for implementation
/* couldn't find a user defined type named 'Promise' at the top level */
// ^^^--- types needed for implementation

/**
 * @brief Asynchronously copy a path.
 * @description
 * Asynchronously copies path `src` to `dest`.
 * @param src Existing path.
 * @param dest Target path.
 */
declare function copy(
	src: string,
	dest: string
) : Promise<undefined>

/**
 * @brief
 * Create an instance of the function 'copy'.
 *
 * @param user
 * Options object (see @fourtune/realm-js/v0/runtime) or an already
 * created context with createContext().
 * This parameter is optional.
 *
 * @return
 * An instance of the function 'copy'.
 */
export function copyFactory(context: RuntimeWrappedContextInstance) : typeof copy {
	const dependencies : AnioJsDependencies = {
		getTypeOfPath: getTypeOfPathFactory(context),
		scandirCallback: scandirCallbackFactory(context)
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

	return async function copy(src: string, dest: string) : Promise<undefined> {
		return await implementation(local_context, dependencies, src, dest)
	}
}
