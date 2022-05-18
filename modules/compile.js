import fs from 'node:fs/promises';
import Papa from 'papaparse';
const fields = {
  'Source': ['Source'],
  'First Name': ['First Name'],
  'Last Name': ['Last Name'],
  'Affiliation': ['Affiliation'],
  'Email': ['Email'],
  'Phone': ['Phone'],
  'Origin': ['Origin'],
  'Instagram': ['Instagram']
};

const compileComplete = async (results) => {
  let records = results.data;

  return await Promise.all(records.filter(async (record) => {
    let entries = Object.entries(record);
    
    // Need to check for all strings in fields obj
    return await Promise.all(entries.filter(entry => fields[entry[0]] ? entry : null))
      .then(filteredEntries => Object.fromEntries(filteredEntries))
      .catch(err => console.log(err));
  }))
    .then(filteredRecords => Papa.unparse(filteredRecords))
    .then(data => fs.appendFile('compiled/main.csv', data))
    .catch(err => console.log(err));
}

const compileError = err => {
  console.log('Compile error: ', err);
}

const compileConfig = {
  delimiter: ',',
  header: true,
  skipEmptyLines: true,
  complete: compileComplete,
  error: compileError
}

export default compileConfig;
