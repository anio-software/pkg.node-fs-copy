/**
 * @brief Asynchronously copy a path.
 * @description
 * Asynchronously copies path `src` to `dest`.
 * @param src Existing path.
 * @param dest Target path.
 */
export function copy(src : string, dest : string) : Promise<void>;

/**
 * @brief Synchronously copy a path.
 * @description
 * Synchronously copies path `src` to `dest`.
 * @param src Existing path.
 * @param dest Target path.
 */
export function copySync(src : string, dest : string) : void;
