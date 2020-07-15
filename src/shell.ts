import { Terminal } from 'xterm'
import { chalk } from './global'
import { Program } from './types'
import init from './bin/init'
import { writeln } from './utils'

class Shell {
    term: Terminal
    buffer: string[]
    programs: {
        [k: string]: Program
    }
    history: string[]

    constructor(term: Terminal) {
        this.term = term
        // input characters buffer
        this.buffer = []
        this.history = []
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
                        await this.programs[cmd](this.term, ...args)
                        this.history.push(cmd)
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
                    this.term.write('\b \b')
                }
                break
            case 'Tab':
                break
            default:
                if (ev.ctrlKey === false && ev.altKey === false && ev.key.length === 1) {
                    this.buffer.push(ev.key)
                    this.term.write(ev.key)
                }
        }
    }

    clear() {
        this.term.reset()
        return Promise.resolve(0)
    }

    printPrompt() {
        this.term.write(chalk`{cyanBright ${location.hostname} }`)
        this.term.write(chalk`{greenBright ❯ }`)
    }
}

export default Shell