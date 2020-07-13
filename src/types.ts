import { Terminal } from "xterm"

type Program = (term: Terminal, ...args: Array<string>) => Promise<number>

export {
    Program,
}