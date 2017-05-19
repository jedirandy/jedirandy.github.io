export const writeLine = (term: any, line: string, delay: number) =>
  new Promise((resolve, reject) => {
    setTimeout(() => { 
      term.writeln(line);
      resolve();
    }, delay)
  });

export const writeLines = (term: Object, lines: Array<string>, delay: number) =>
  lines.reduce((promise, line) => promise.then(() => writeLine(term, line, delay)), Promise.resolve());

export const writeChar = (term: Object, char: string, delay: number) =>
  new Promise((resolve, reject) => {
    setTimeout(() => { 
      term.write(char);
      resolve();
    }, delay)
  });

export const writeChars = (term: Object, input: string, delay: number) =>
  Array.from(input).reduce((promise, char: string) => promise.then(() => writeChar(term, char, delay)), Promise.resolve());

export const delay = (d: number) => new Promise((resolve, reject) => setTimeout(() => resolve(), d));