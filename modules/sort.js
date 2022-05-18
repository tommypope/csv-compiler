import fs from 'node:fs/promises';
import Papa from 'papaparse';

const sortComplete = async (results) => {
  let records = results.data;
  let reducedByEmail = {};

  return await Promise.all(records.map(async (record) => {
    if (!reducedByEmail[record['Email']]) {
      reducedByEmail[record['Email']] = record;
      return;
    } else {
      let entries = Object.entries(record);
      entries.forEach(entry => {
        let prop = entry[0];
        let val = entry[1];
        reducedByEmail[record['Email']][prop] = val;
      });
      return;
    }
  }))
    .then(async () => {
      let reducedEntries = Object.entries(reducedByEmail);
      return await Promise.all(reducedEntries.map(reducedEntry => {
        return reducedEntry[1];
      }));
    })
    .then(async (reducedArray) => {
      return await Promise.all(reducedArray.sort((a, b) => {
        if (a['Last Name'].toLowerCase() > b['Last Name'].toLowerCase()) {
          return 1;
        }
        if (a['Last Name'].toLowerCase() < b['Last Name'].toLowerCase()) {
          return -1;
        }
        return 0;
      }));
    })
    .then(sortedByLastName => Papa.unparse(sortedByLastName))
    .then(data => fs.writeFile('compiled/main.csv', data))
    .then(() => console.log('Sorted main.csv'))
    .catch(err => console.log(err));
}

const sortError = err => {
  console.log('Sort error: ', err);
}

const sortConfig = {
  delimiter: ',',
  header: true,
  skipEmptyLines: true,
  complete: sortComplete,
  error: sortError
}

export default sortConfig;
