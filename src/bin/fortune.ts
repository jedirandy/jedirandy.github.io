import { Program } from '../types'
import { Terminal } from 'xterm'
import { writeWithDelay, write, writeln } from '../utils'

const fortune: Program = async (term: Terminal, ...args: string[]) => {
    const loc = args.length > 0 ? args.join(' ') : ''
    try {
        const res = await fetch(`https://api.ef.gy/fortune`)
        if (res.status === 200) {
            const text = await res.text()
            for (const line of text.split('\n')) {
                await writeln(term, line)
            }
        }
    } catch (e) {
        await writeWithDelay(term, `Error fetching the data, try again later`, 20, true)
        return 1
    }
    return 0
}

export default fortune