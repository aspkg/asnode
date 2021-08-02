import { fs, Buffer } from '.'

fs.writeFileSync('test.txt', Buffer.from('Hello World!'))