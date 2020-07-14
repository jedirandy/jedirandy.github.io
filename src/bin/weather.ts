import { Program } from "../types";
import { Terminal } from "xterm";
import { writeWithDelay } from "../utils";

const weather: Program = async (term: Terminal, ...args: string[]) => {
    const loc = args.length > 0 ? args.join(' ') : ''
    try {
        const res = await fetch(`https://wttr.in/${loc}?format=4`)
        if (res.status === 200) {
            const weatherText = await res.text()
            await writeWithDelay(term, `${weatherText.replace('\n', '')}`, 20, true)
        }
    } catch (e) {
        await writeWithDelay(term, `Error fetching the data, try again later`, 20, true)
        console.error('Failed to fetch the weather', e)
        return 1
    }
    return 0
}

export default weather