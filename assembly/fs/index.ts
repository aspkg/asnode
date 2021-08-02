import { Buffer } from '../buffer'
import { ReadableStream } from '../stream'

// @ts-ignore
@external('fs', 'writeFileSync')
declare function fsWriteFileSync(path: string, data: Uint8Array): void
// @ts-ignore
@external('fs', 'readFileSync')
declare function readFileSync(id: u32, path: string): Uint8Array
// @ts-ignore
@external('fs', 'mkdirSync')
declare function mkdirSync(path: string): void
// @ts-ignore
@external('fs', 'appendFileSync')
declare function appendFileSync(path: string, data: Uint8Array): void
// @ts-ignore
@external('fs', 'existsSync')
declare function existsSync(path: string): number

//declare function fsWriteStreamCall(data: string): void

declare function fsReadStreamCall(path: string, pointer: i32): void

let id = idof<Uint8Array>()

export namespace fs {
    export function writeFileSync(path: string, data: Buffer): void {

        fsWriteFileSync(path, data)

    }
    export function readFileSync(path: string): Buffer {

        return changetype<Buffer>(readFileSync(id, path))

    }
    export function mkDirSync(path: string): void {

        mkDirSync(path)

    }
    export function appendFileSync(path: string, data: Buffer): void {

        appendFileSync(path, data)

    }
    export function existsSync(path: string): boolean {

        return existsSync(path) === 1 ? true : false

    }
    export function createReadStream(path: string): ReadableStream {

        const stream = new ReadableStream()

        fsReadStreamCall(path, stream.push.index)

        return stream

    }
}