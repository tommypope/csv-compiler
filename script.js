// Script to combile records into master csv file
//
// Fields:
// Source,First Name,Last Name,Affiliation,Email,Phone,Origin,Instagram
//

import fs from 'node:fs';
import Papa from 'papaparse';

const fields = {
  'Source': [],
  'First Name': [],
  'Last Name': [],
  'Affiliation': [],
  'Email': [],
  'Phone': [],
  'Origin': [],
  'Instagram': []
}

const parseComplete = (results, file) => {
  console.log(results, file);
}

const parseError = (err, file) => {
  console.log(err, file);
}

const papaparseConfig = {
  delimiter: ',',
  header: true,
  skipEmptyLines: true,
  complete: parseComplete,
  error: parseError
}

// Iterate thru to-compile/ files
fs.readdir('to-compile/', (err, data) => {
  if (err) throw err;
  data.forEach(filepath => organizeFile(filepath));
});

// For each file
//   -Edit fields to be uniform with fields object
//   -Append to main.csv
const organizeFile = (filepath) => {
  console.log(filepath);
  fs.readFile('to-compile/' + filepath,'utf8', (err, data) => {
    if (err) throw err;
    Papa.parse(data, papaparseConfig);
  });
}

// In main.csv
//   -Sort by 'Last Name'
//   -Combine records with same 'Email'
