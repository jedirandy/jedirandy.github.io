import { Terminal } from "xterm";
import { Program } from '../types';
import { writeln } from '../utils';


const help: Program = async (term: Terminal, ...args: string[]) => {
    await writeln(term, '- about')
    await writeln(term, `  Shows information about the author`)
    await writeln(term, '- bye')
    await writeln(term, `  Goodbye my friend (close this site)`)
    await writeln(term, '- clear')
    await writeln(term, `  Clears the terminal, ctrl + l also works`)
    return 0
}

export default help