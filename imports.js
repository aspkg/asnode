const fs = require('fs')

class NodeImport {

    constructor() {

        this._exports = null

        this.wasmImports = {
            FS: {
                fsWriteFileSync: (path, data) => {

                    fs.writeFileSync(this._exports.__getString(path), Uint8Array.from(this._exports.__getArray(data)))

                },
                fsReadFileSync: (id, path) => {

                    const array = fs.readFileSync(this._exports.__getString(path))

                    return this._exports.__newArray(id, array)

                },
                fsMkDirSync: (path) => {

                    fs.mkdirSync(this._exports.__getString(path))

                },
                fsAppendFileSync: (path, data) => {

                    fs.appendFileSync(this._exports.__getString(path), Uint8Array.from(this._exports.__getArray(data)))

                },
                fsExistsSync: (path) => {

                    return fs.existsSync(this._exports.__getString(path)) ? 1 : 0

                },
                fsReadStreamCall: (path, pointer) => {

                    const stream = fs.createReadStream(this._exports.__getString(path))

                    const callback = this._exports.table.get(pointer)

                    stream.on('data', (chunk) => {

                        callback(this._exports.__newString(chunk.toString()))

                    })
                }
            }
        }
    }

    get wasmExports() {
        return this._exports
    }
    set wasmExports(e) {
        this._exports = e
        this._exports.__getString = e.__getString
        this._exports.__newString = e.__newString
        this._exports.__newArray = e.__newArray
        this._exports.__getArray = e.__getArray
    }

    getFn(fnIndex) {
        if (!this.wasmExports)
            throw new Error(
                'Make sure you set .wasmExports after instantiating the Wasm module but before running the Wasm module.',
            )
        return this._exports.table.get(fnIndex)
    }
}

module.exports = NodeImport