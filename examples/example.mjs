import {copy} from "../src/index.mjs"

console.log(
	await copy("examples/src", "examples/dest/p")
)

console.log("done")
