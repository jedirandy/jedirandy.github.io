import 'xterm/css/xterm.css'
import './index.css'

import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { WebLinksAddon } from 'xterm-addon-web-links';

import Shell from './shell'
import help from './bin/help'
import about from './bin/about'
import bye from './bin/bye'

const backgroundColor = '#182631'
const div = document.getElementById('term')
div.style.backgroundColor = backgroundColor
const term = new Terminal({
    theme: {
        background: backgroundColor
    },
    cursorBlink: true,
})

const fitAddon = new FitAddon()
term.loadAddon(fitAddon)
term.loadAddon(new WebLinksAddon())
term.open(div)
fitAddon.fit()

const shell = new Shell(term)
shell.addProgram('help', help)
shell.addProgram('about', about)
shell.addProgram('bye', bye)
