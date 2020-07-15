import { Terminal } from 'xterm'
import { writeWithDelay, delay, writeln } from '../utils'
import { chalk } from '../global'
import weather from './weather'

const init = async (term: Terminal) => {
    term.reset()
    await writeWithDelay(term, `[${new Date().toLocaleString()}] Initializing`, 20)
    await writeWithDelay(term, `...`, 200, true)
    await writeWithDelay(term, chalk`{redBright [${new Date().toLocaleString()}] Kernel panic: the world is on fire}`, 20)
    await writeWithDelay(term, chalk`{redBright !!!}`, 100, true)
    await delay(Math.random() * 1000)
    await writeWithDelay(term, chalk`{yellowBright [${new Date().toLocaleString()}] Let's not worry about it for now, resume initialization}`, 20)
    await writeWithDelay(term, chalk`{yellowBright ...}`, 200, true)
    await writeWithDelay(term, chalk`{greenBright [${new Date().toLocaleString()}] Initialized}`, 20, true)
    await writeln(term, '')

    // aloha
    await writeWithDelay(term, '   _   _       _             _ ', 5, true)
    await writeWithDelay(term, '  /_\\ | | ___ | |__   __ _  / \\', 5, true)
    await writeWithDelay(term, ' //_\\\\| |/ _ \\| \'_ \\ / _\\` |/  /', 5, true)
    await writeWithDelay(term, '/  _  \\ | (_) | | | | (_| /\\_/ ', 5, true)
    await writeWithDelay(term, '\\_/ \\_/_|\\___/|_| |_|\\__,_\\/   ', 5, true)
    await writeWithDelay(term, '                               ', 5, true)
    await writeln(term, '')


    await writeWithDelay(term, chalk`{greenBright Welcome to Sheng's terminal @ ${location.host}}`, 20, true)
    await weather(term)
    await writeWithDelay(term, chalk`{yellowBright Type in 'help' for available commands}`, 20, true)
    await writeln(term, '')
    return 0
}

export default init