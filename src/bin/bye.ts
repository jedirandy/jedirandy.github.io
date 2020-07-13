import { Terminal } from "xterm"
import { writeWithDelay, delay } from "../utils"

const bye = async (term: Terminal) => {
    await writeWithDelay(term, `Bye`, 20)
    await delay(500)
    open('about:blank', '_self').close();
    return 0
}

export default bye