import { Program } from '../types'
import { Terminal } from 'xterm'
import { writeWithDelay, delay } from '../utils'
import { chalk } from '../global'

const weather: Program = async (term: Terminal, ...args: string[]) => {
    try {
        const res = await fetch('https://official-joke-api.appspot.com/random_joke')
        if (res.status === 200) {
            const json = await res.json()
            await writeWithDelay(term, json.setup, 20, true)
            await delay(3000)
            await writeWithDelay(term, chalk.yellowBright(json.punchline), 40, true)
        }
    } catch (e) {
        await writeWithDelay(term, `Error fetching the data, try again later`, 20, true)
        console.error('Failed to fetch the weather', e)
        return 1
    }
    return 0
}

export default weather