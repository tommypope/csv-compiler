import fs from 'node:fs/promises';
import Papa from 'papaparse';

// Change 'Email' to desired reducer
const reducer = 'Email';

// Change 'Last Name' to desired sorter
const sorter = 'Last Name';

const sortComplete = async (results) => {
  let records = results.data;
  let reduced = {};

  console.log('Reducing main.csv...');

  return await Promise.all(records.map(async (record) => {
    if (!reduced[record[reducer]]) {
      reduced[record[reducer]] = record;
      return;
    } else {
      let entries = Object.entries(record);
      entries.forEach(entry => {
        let prop = entry[0];
        let val = entry[1];
        reduced[record[reducer]][prop] = val;
      });
      return;
    }
  }))
    .then(async () => {
      let reducedEntries = Object.entries(reduced);
      return await Promise.all(reducedEntries.map(reducedEntry => {
        return reducedEntry[1];
      }));
    })
    .then(async (reducedArray) => {

      console.log('Sorting main.csv...');

      return await Promise.all(reducedArray.sort((a, b) => {
        if (a[sorter].toLowerCase() > b[sorter].toLowerCase()) {
          return 1;
        }
        if (a[sorter].toLowerCase() < b[sorter].toLowerCase()) {
          return -1;
        }
        return 0;
      }));
    })
    .then(sorted => Papa.unparse(sorted))
    .then(data => fs.writeFile('compiled/main.csv', data))
    .then(() => console.log('Compiled main.csv'))
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
