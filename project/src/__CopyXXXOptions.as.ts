import type {PathType} from "@anio-software/pkg.node-fs-path-type"
import type {PathInformation} from "@anio-software/pkg.node-fs-stat-path"

export type __XX__ = {
	/**
	 * @brief Decide whether to copy an entry or not.
	 */
	shouldCopyEntry?: (
		relativeSourcePath: string,
		pathType: PathType,
		pathInformation: PathInformation
	) => Promise<boolean> | boolean
//>	) => boolean

	/**
	 * @brief Source path to copy.
	 */
	source: string

	/**
	 * @brief Destination path.
	 */
	destination: string

	/**
	 * @brief Whether to delete destination path if it exists.
	 */
	overwriteDestination?: boolean

	/**
	 * @brief Whether to copy owner information.
	 */
	copyOwner?: boolean
}
