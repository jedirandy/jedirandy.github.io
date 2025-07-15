import { Terminal } from '@xterm/xterm'
import { writeWithDelay, writeln } from '../utils'
import { chalk } from '../global'
import weather from './weather'

const init = async (term: Terminal) => {
  term.reset()
  await writeWithDelay(
    term,
    `[${new Date().toLocaleString()}] Initializing`,
    20
  )
  await writeWithDelay(term, chalk`{yellowBright ...}`, 200, true)
  await writeWithDelay(
    term,
    chalk`{greenBright [${new Date().toLocaleString()}] Initialized}`,
    20,
    true
  )
  await writeln(term, '')

  // aloha
  await writeWithDelay(term, '   _   _       _             _ ', 5, true)
  await writeWithDelay(term, '  /_\\ | | ___ | |__   __ _  / \\', 5, true)
  await writeWithDelay(term, " //_\\\\| |/ _ \\| '_ \\ / _\\`|/  /", 5, true)
  await writeWithDelay(term, '/  _  \\ | (_) | | | | (_| /\\_/ ', 5, true)
  await writeWithDelay(term, '\\_/ \\_/_|\\___/|_| |_|\\__,_\\/   ', 5, true)
  await writeWithDelay(term, '                               ', 5, true)
  await writeln(term, '')

  await writeWithDelay(
    term,
    chalk`{greenBright Welcome to Sheng's terminal @ ${location.host}}`,
    20,
    true
  )
  await weather(term)
  await writeWithDelay(
    term,
    chalk`{yellowBright Type in 'help' for available commands, don't forget to press 'Enter (return)'}`,
    20,
    true
  )
  await writeln(term, '')
  return 0
}

export default init
