import '@xterm/xterm/css/xterm.css'
import 'hack-font/build/web/hack.css'
import './index.css'

import './assets/favicon.ico'

import { Terminal } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import { WebLinksAddon } from '@xterm/addon-web-links'

import Shell from './shell'
import help from './bin/help'
import about from './bin/about'
import bye from './bin/bye'
import weather from './bin/weather'
import joke from './bin/joke'

const backgroundColor = '#182631'
const div = document.getElementById('term')
if (!div) {
  throw new Error('Terminal element not found')
}
div.style.backgroundColor = backgroundColor
const term = new Terminal({
  theme: {
    background: backgroundColor,
  },
  fontFamily: 'Hack, monospace',
  cursorBlink: true,
})

const fitAddon = new FitAddon()
term.loadAddon(fitAddon)
term.loadAddon(new WebLinksAddon())
onresize = () => fitAddon.fit()
term.open(div)
fitAddon.fit()

const shell = new Shell(term)
shell
  .addProgram('help', help)
  .addProgram('about', about)
  .addProgram('bye', bye)
  .addProgram('weather', weather)
  .addProgram('joke', joke)
