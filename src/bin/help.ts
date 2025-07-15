import { Terminal } from '@xterm/xterm'
import { Program } from '../types'
import { writeln } from '../utils'
import { chalk } from '../global'

const help: Program = async (term: Terminal, ..._args: string[]) => {
  await writeln(term, chalk.white('--- keys ---'))
  await writeln(
    term,
    '- Use arrow up/down to choose the previous/next command from history'
  )
  await writeln(term, '- CTRL+L or type in "clear" to clear the screen')
  await writeln(term, '')
  await writeln(term, chalk.white('--- programs ---'))
  await writeln(term, chalk.yellowBright('- about'))
  await writeln(term, `  About the author`)
  await writeln(term, chalk.yellowBright('- weather [optional location]'))
  await writeln(
    term,
    `  Shows the weather for the location, for example: weather svalbard`
  )
  await writeln(term, chalk.yellowBright('- joke'))
  await writeln(term, `  Tells a random joke`)
  return 0
}

export default help
