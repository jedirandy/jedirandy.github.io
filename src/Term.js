// @flow
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { writeLines, writeChars, delay } from './termUtils';
declare module Terminal {};
class Term extends Component {
  render() {
    return (
      <div id="container">
        <div id="screen">
        </div>
      </div>
    );
  }

  componentDidMount() {
    const container = findDOMNode(this);
    // $FlowFixMe
    const term = new Terminal({
      cursorBlink: true,
      cols: 120
    });

    term.prompt = () => term.write('\r\n$ ');

    const input = [];
    term.on('key', (key: string, ev) => {
      const printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey;

      if (ev.keyCode === 13) {
        const command = input.join('');
        const lines = execute(command, term);
        term.writeln('')
        writeLines(term, lines, 200).then(() => term.prompt());
        input.splice(0);
      } else if (ev.keyCode === 8) {
        // Do not delete the prompt
        input.splice(-1)
        if (term.x > 2) {
          term.write('\b \b');
        }
      } else if (printable) {
        input.push(key)
        term.write(key);
      }
      term.on('paste', function (data, ev) {
        term.write(data);
      });
    });
    term.open(container);
    term.fit();
    term.writeln('');
    writeChars(term, ' ♫♪ Welcome😁 enter "help" for instructions ♫♪', 24).then(() => {
      term.writeln('');
      term.prompt();
    });

    term.on('resize', () => {
      term.fit();
    });
  }
}

const execute = (input: string, term: Object): Array<string> =>  {
  // todo: return a function to execute
  switch (input) {
    case 'help':
      return [
        'Commands:',
        ' - about',
        ' - contact',
        ' - ls-projects',
        ' - bye'
      ];
    case 'about':
      return [
        'Hello! My name is Sheng Ran',
        'Currently I work as a software engineer at Criteo in la Ville-Lumière - Paris',
        'I am a Scala and JavaScript developer, sometimes play with Haskell and Elm',
        'I build applications, tools for large-scale data analytics products',
        'My projects covers domains such as web applications, data visualization tools, Big Data tools, etc.'
      ]
    case 'contact':
      return [
        ' Use contact <item> to open the link, for example \'contact linkedin\'',
        ' - email: jedirandy@gmail.com',
        ' - linkedin: https://www.linkedin.com/in/ransheng/',
        ' - github: https://github.com/jedirandy',
        ' - twitter: @__sheng__'
      ]
    case 'contact linkedin':
      window.open('https://www.linkedin.com/in/ransheng/', '_blank');
      return ['Opening https://www.linkedin.com/in/ransheng/ ...'];
    case 'contact email':
      window.open('mailto:jedirandy@gmail.com', '_self');
      return ['Opening the email client...'];
    case 'contact github':
      window.open('https://github.com/jedirandy', '_blank');
      return ['Opening https://github.com/jedirandy ...'];
    case 'contact twitter':
      window.open('https://twitter.com/__sheng__', '_blank');
      return ['Opening https://twitter.com/__sheng__ ...'];
    case 'ls-projects':
      return [
        'Working in progress...'
      ];
    case 'bye':
      delay(500).then(() => {
        window.open('about:blank', '_self', '').close();
      });
      return [
        '🙏 Bye! Au revoir! 再见! 🙏'
      ];
    default:
      return [`command not found: ${input}, see 'help' for available commands`];
  }
}


export default Term;
