const fs = require("fs");
const loader = require("@assemblyscript/loader");
const Node = require('./imports')
const node = new Node()
const imports = {
    ...node.wasmImports
};
const wasmModule = loader.instantiateSync(fs.readFileSync(__dirname + "/build/untouched.wasm"), imports);
node.wasmExports = wasmModule.exports
wasmModule.exports._start()