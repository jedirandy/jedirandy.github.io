import { Program } from '../types';
import { Terminal } from 'xterm';
import { write, writeWithDelay, delay, writeln } from '../utils';
import { chalk } from '../global'

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

    // 3d ascii hiya
    await writeWithDelay(term, ' ___  ___  ___      ___    ___ ________  ___       ', 1, true);
    await writeWithDelay(term, '|\\  \\|\\  \\|\\  \\    |\\  \\  /  /|\\   __  \\|\\  \\      ', 1, true);
    await writeWithDelay(term, '\\ \\  \\\\\\  \\ \\  \\   \\ \\  \\/  / | \\  \\|\\  \\ \\  \\     ', 1, true);
    await writeWithDelay(term, ' \\ \\   __  \\ \\  \\   \\ \\    / / \\ \\   __  \\ \\  \\    ', 1, true);
    await writeWithDelay(term, '  \\ \\  \\ \\  \\ \\  \\   \\/  /  /   \\ \\  \\ \\  \\ \\__\\   ', 1, true);
    await writeWithDelay(term, '   \\ \\__\\ \\__\\ \\__\\__/  / /      \\ \\__\\ \\__\\|__|   ', 1, true);
    await writeWithDelay(term, '    \\|__|\\|__|\\|__|\\___/ /        \\|__|\\|__|   ___ ', 1, true);
    await writeWithDelay(term, '                  \\|___|/                     |\\__\\', 1, true);
    await writeWithDelay(term, '                                              \\|__|', 1, true);
    await writeln(term, '')

    await writeWithDelay(term, chalk`{greenBright Welcome to Sheng's terminal @ ${location.host}}`, 20, true)
    try {
        const res = await fetch('https://wttr.in/?format=3')
        if (res.status === 200) {
            const weatherText = await res.text()
            await writeWithDelay(term, `Current weather: ${weatherText.replace('\n', '')}`, 20, true)
        }
    } catch (e) {
        console.error('Failed to fetch the weather', e)
    }
    await writeWithDelay(term, chalk`{yellowBright Type in 'help' for available commands}`, 20, true)
    await writeln(term, '')
    return 0
}

export default init