import { Program } from "../types";
import { Terminal } from "xterm";
import { write, writeWithDelay, delay } from "../utils";
import { chalk } from '../global'

const init = async (term: Terminal) => {
    term.reset()
    await writeWithDelay(term, `[${new Date().toLocaleString()}] Initializing`, 20)
    await writeWithDelay(term, `...\r\n`, 200)
    await writeWithDelay(term, chalk`{redBright [${new Date().toLocaleString()}] Kernel panic: the world is on fire!!!\r\n}`, 20)
    await delay(2000)
    await writeWithDelay(term, chalk`{yellowBright [${new Date().toLocaleString()}] Hey, let's not worry about it for now, resume initialization}`, 20)
    await writeWithDelay(term, chalk`{yellowBright ...\r\n}`, 200)
    await writeWithDelay(term, `[${new Date().toLocaleString()}] Initialized\r\n`, 20)
    await write(term, '\r\n')
    await writeWithDelay(term, chalk`{greenBright Welcome to Sheng's terminal @ ${location.host}\r\n}`, 20)
    await writeWithDelay(term, chalk`{yellowBright Type in 'help' for available commands\r\n}`, 20)
    await write(term, '\r\n')
    return 0
}

export default init