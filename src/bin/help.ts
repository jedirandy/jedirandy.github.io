import { Terminal } from 'xterm'
import { Program } from '../types'
import { writeln } from '../utils'
import { chalk } from '../global'


const help: Program = async (term: Terminal, ...args: string[]) => {
    await writeln(term, chalk.yellowBright('> about'))
    await writeln(term, `  About the author`)
    await writeln(term, chalk.yellowBright('> weather [optional location]'))
    await writeln(term, `  Shows the weather for the location, for example: weather svalbard`)
    await writeln(term, chalk.yellowBright('> fortune'))
    await writeln(term, `  Gives a random quote`)
    await writeln(term, chalk.yellowBright('> joke'))
    await writeln(term, `  Tells a random joke`)
    await writeln(term, chalk.yellowBright('> clear'))
    await writeln(term, `  Clears the terminal, ctrl + l also works`)
    return 0
}

export default help