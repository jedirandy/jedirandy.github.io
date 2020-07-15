import { Terminal } from 'xterm'
import { chalk } from './global'
import { Program } from './types'
import init from './bin/init'
import { writeln, backspace, write } from './utils'
import History from './history'

class Shell {
    term: Terminal
    buffer: string[]
    programs: {
        [k: string]: Program
    }
    history: History

    constructor(term: Terminal) {
        this.term = term
        // input characters buffer
        this.buffer = []
        this.history = new History()
        this.programs = {
            'clear': () => this.clear(),
        }
        const query = new URLSearchParams(location.search)
        if (query.get('init') === 'false') {
            this.printPrompt()
            this.term.onKey(({ domEvent }) => this.onKeyEvent(domEvent))
        } else {
            init(this.term).then(() => {
                this.printPrompt()
                this.term.onKey(({ domEvent }) => this.onKeyEvent(domEvent))
                this.term.focus()
            })
        }
    }

    addProgram(name: string, program: Program) {
        this.programs[name] = program
        return this
    }

    onKeyEvent(ev: KeyboardEvent) {
        if (ev.ctrlKey) {
            switch (ev.key) {
                case 'l':
                    this.clear()
                    this.printPrompt()
                    break
                default:
            }
        }
        switch (ev.key) {
            case 'Enter':
                (async () => {
                    await writeln(this.term, '')
                    const [cmd, ...args] = this.buffer.join('').split(' ')
                    if (cmd in this.programs) {
                        this.history.push(cmd)
                        await this.programs[cmd](this.term, ...args)
                    } else {
                        if (cmd.length > 0)
                            await writeln(this.term, `command not found: ${cmd}, use 'help' for available commands`)
                    }
                    this.buffer = []
                    this.printPrompt()
                })()
                break
            case 'Backspace':
                if (this.buffer.length > 0) {
                    this.buffer.pop()
                    backspace(this.term, 1)
                }
                break
            case 'Tab':
                break
            case 'ArrowUp':
                this.replaceBuffer(this.history.prev())
                break
            case 'ArrowDown':
                this.replaceBuffer(this.history.next())
                break
            default:
                if (ev.ctrlKey === false && ev.altKey === false && ev.key.length === 1) {
                    this.buffer.push(ev.key)
                    write(this.term, ev.key)
                }
        }
    }

    clear() {
        this.term.reset()
        return Promise.resolve(0)
    }

    printPrompt() {
        write(this.term, `${chalk.cyanBright(location.hostname)} ${chalk.greenBright('❯ ')}`)
    }

    async replaceBuffer(text: string) {
        await backspace(this.term, this.buffer.length)
        this.buffer = text.split('')
        await write(this.term, text)
    }
}

export default Shell