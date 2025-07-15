import { Terminal } from '@xterm/xterm'

type Program = (term: Terminal, ...args: string[]) => Promise<number>

export type { Program }
