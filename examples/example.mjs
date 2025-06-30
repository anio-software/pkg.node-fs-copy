import {copy} from "../products/project/dist/default/index.min.mjs"

console.log(
	await copy({
		source: "examples/src",
		destination: "examples/dest"
	})
)

console.log("done")
