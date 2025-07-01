import type {getTypeOfPath} from "@anio-software/pkg.node-fs-path-type"
//>import type {getTypeOfPathSync} from "@anio-software/pkg.node-fs-path-type"

import type {getPathInformation} from "@anio-software/pkg.node-fs-stat-path"
//>import type {getPathInformationSync} from "@anio-software/pkg.node-fs-stat-path"

import type {scandirCallback} from "@anio-software/pkg.node-fs-scandir"
//>import type {scandirSyncCallback} from "@anio-software/pkg.node-fs-scandir"

import type {remove} from "@anio-software/pkg.node-fs-remove"
//>import type {removeSync} from "@anio-software/pkg.node-fs-remove"

export type __EnkoreFunctionDependencies = {
	getTypeOfPath: typeof getTypeOfPath
//>	getTypeOfPath: typeof getTypeOfPathSync

	getPathInformation: typeof getPathInformation
//>	getPathInformation: typeof getPathInformationSync

	scandirCallback: typeof scandirCallback
//>	scandirCallback: typeof scandirSyncCallback

	remove: typeof remove
//>	remove: typeof removeSync
}
