import fs from 'node:fs/promises';
import Papa from 'papaparse';
import compileConfig from './modules/compile.js';
import sortConfig from './modules/sort.js';

const compileFile = filepath => {
  return fs.readFile('to-compile/' + filepath, 'utf8')
    .then(data => Papa.parse(data, compileConfig))
    .catch(err => console.log(err));
}

await fs.readdir('to-compile/')
  .then(async (files) => {
    for (const file of files) await compileFile(file);
  })
  .then(() => fs.readFile('compiled/main.csv', 'utf8'))
  .then(data => Papa.parse(data, sortConfig))
  .catch(err => console.log(err));
