import { Terminal } from '@xterm/xterm'

function delay(ms: number): Promise<void> {
  return new Promise((resolve, _) => {
    setTimeout(() => resolve(), ms)
  })
}

async function backspace(term: Terminal, charCount: number): Promise<void> {
  for (let i = 0; i < charCount; ++i) {
    await term.write('\b \b')
  }
}

async function write(term: Terminal, data: string): Promise<void> {
  await new Promise<void>((resolve) => term.write(data, () => resolve()))
}

async function writeln(term: Terminal, data: string): Promise<void> {
  await new Promise<void>((resolve) => term.writeln(data, () => resolve()))
}

async function writeWithDelay(
  term: Terminal,
  chars: string,
  delayMs: number,
  newline: boolean = false
): Promise<void> {
  for (const char of chars) {
    await delay(delayMs)
    await write(term, char)
  }
  if (newline) await write(term, '\r\n')
}

export { delay, write, writeln, writeWithDelay, backspace }
