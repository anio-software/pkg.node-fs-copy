export type __XX__ = {
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
