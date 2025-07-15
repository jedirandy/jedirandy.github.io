import { Terminal } from '@xterm/xterm'
import { writeWithDelay, delay } from '../utils'

const bye = async (term: Terminal) => {
  await writeWithDelay(term, `Bye`, 20)
  await delay(500)
  const newWindow = open('about:blank', '_self')
  if (newWindow) {
    newWindow.close()
  }
  return 0
}

export default bye
