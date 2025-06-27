# @anio-software/pkg.node-fs-copy

Copy a path of any type.

```js
import {copy} from "@anio-software/pkg.node-fs-copy"

console.log(
	await copy("examples/src", "examples/dest")
)
```

Todo: add function to copy with permissions/owner 

Could be implemented as `nodeFsCopy(src, dest, {faithful: true})`
