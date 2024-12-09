import {copy} from "../dist/default/index.min.mjs"

console.log(
	await copy("examples/src", "examples/dest/p")
)

console.log("done")
