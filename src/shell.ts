import { Terminal } from 'xterm'
import { chalk } from './global'
import { Program } from './types'
import init from './bin/init'
import { write, writeln } from './utils'

class Shell {
    term: Terminal
    buffer: string[]
    programs: {
        [k: string]: Program
    }
    history: string[]

    constructor(term: Terminal) {
        this.term = term
        this.buffer = []
        this.history = []
        this.programs = {
            'clear': () => this.clear(),
        }
        const query = new URLSearchParams(location.search)
        if (query.get('init') === 'false') {
            this.printPrompt()
        } else {
            init(this.term).then(() => {
                this.term.onKey(({ domEvent }) => this.onKeyEvent(domEvent))
                this.printPrompt()
                this.term.focus()
            })
        }
    }

    addProgram(name: string, program: Program) {
        this.programs[name] = program
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
                    const cmd = this.buffer.join('');
                    if (cmd in this.programs) {
                        await this.programs[cmd](this.term);
                        this.history.push(cmd)
                    } else {
                        if (cmd.length > 0)
                            await this.term.writeln(`command not found: ${cmd}, use 'help' for available commands`)
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
                if (ev.ctrlKey == false && ev.altKey == false) {
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

export default Shell;