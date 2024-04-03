# @anio-node-foundation/fs-copy

Copy a path of any type.

```js
import {copy} from "@anio-node-foundation/fs-copy"

console.log(
	await copy("examples/src", "examples/dest")
)
```

Todo: add function to copy with permissions/owner 

Could be implemented as `nodeFsCopy(src, dest, {faithful: true})`
