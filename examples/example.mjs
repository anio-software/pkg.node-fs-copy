import nodeFsCopy from "../src/index.mjs"

console.log(
	await nodeFsCopy("examples/src", "examples/dest/p")
)

console.log("done")
