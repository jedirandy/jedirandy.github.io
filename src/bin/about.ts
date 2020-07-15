import { writeWithDelay } from '../utils'
import { Program } from '../types'
import { chalk } from '../global'

const about: Program = async (term) => {
    await writeWithDelay(term, chalk`{green Hi! I'm Sheng Ran, you can find me at:}`, 20, true)
    await writeWithDelay(term, chalk`{blueBright - Linkedin https://www.linkedin.com/in/ransheng}`, 20, true)
    await writeWithDelay(term, chalk`{yellowBright - Github https://github.com/jedirandy}`, 20, true)
    return 0
}

export default about