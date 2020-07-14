import { Terminal } from 'xterm'

type Program = (term: Terminal, ...args: string[]) => Promise<number>

export {
    Program,
}