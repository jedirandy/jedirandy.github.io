import { Terminal } from "xterm"

function delay(ms: number): Promise<void> {
    return new Promise((resolve, _) => {
        setTimeout(() => resolve(), ms)
    })
}

async function write(term: Terminal, data: string): Promise<void> {
    await new Promise(resolve => term.write(data, resolve))
}

async function writeln(term: Terminal, data: string): Promise<void> {
    await new Promise(resolve => term.writeln(data, resolve))
}

async function writeWithDelay(term: Terminal, chars: string, delayMs: number): Promise<void> {
    for (const char of chars) {
        await delay(delayMs)
        await write(term, char)
    }
}

export {
    delay,
    write,
    writeln,
    writeWithDelay
}