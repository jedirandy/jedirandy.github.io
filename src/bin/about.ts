import { writeln, writeWithDelay } from '../utils'
import { Program } from '../types'
import { chalk } from '../global'

const about: Program = async (term) => {
    await writeWithDelay(term, chalk`{green This is Sheng's terminal, to contact the author, click one of the following links:}`, 20, true)
    await writeWithDelay(term, chalk`{blue - Linkedin https://www.linkedin.com/in/ransheng}`, 20, true)
    await writeWithDelay(term, chalk`{yellow - Github https://github.com/jedirandy}`, 20, true)
    return 0
}

export default about