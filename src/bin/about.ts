import { writeln, writeWithDelay } from "../utils";
import { Program } from "../types";
import { chalk } from '../global'

const about: Program = async (term) => {
    await writeWithDelay(term, chalk`{green This is Sheng's terminal, to contact the author, click one of the following links:\r\n}`, 20)
    await writeWithDelay(term, chalk`{blue - Linkedin https://www.linkedin.com/in/ransheng\r\n}`, 20)
    await writeWithDelay(term, chalk`{yellow - Github https://github.com/jedirandy\r\n}`, 20)
    return 0
}

export default about