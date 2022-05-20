///////////////////////////////////////////////////////////////////////////////////////////////////
// Dependencies

import fs from 'node:fs/promises';
import Papa from 'papaparse';

///////////////////////////////////////////////////////////////////////////////////////////////////
// CSV field sorting variables

// Change property names to desired CSV fields
// In each property's array, add all other fields to be compiled
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

// Change 'Email' to desired reducer
const reducer = 'Email';

// Change 'Last Name' to desired sorter
const sorter = 'Last Name';

///////////////////////////////////////////////////////////////////////////////////////////////////
// Main data storage

let mainData = [];

///////////////////////////////////////////////////////////////////////////////////////////////////
// Parse config functions

const parseComplete = async (results) => {
  let records = results.data;

  console.log('Retrieving data...');

  return await Promise.all(records.map(async (record) => {
    let entries = Object.entries(record);
    
    // FIX: Need to check for all strings in fields obj
    return await Promise.all(entries.filter(entry => fields[entry[0]]))
      .then(filteredEntries => Object.fromEntries(filteredEntries))
      .catch(err => console.log(err));
  }))
    .then(data => {
      console.log('Appending data...');
      mainData.push(...data);
    })
    .catch(err => console.log(err));
}

const parseError = err => {
  console.log('Parse error: ', err);
}

const parseConfig = {
  delimiter: ',',
  header: true,
  skipEmptyLines: true,
  complete: parseComplete,
  error: parseError
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// Reduce and sort data and write to main.csv

const reduceAndSort = async () => {
  let records = mainData;
  let reduced = {};

  console.log('Reducing duplicates...');

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

      console.log('Sorting data...');

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
    .then(() => console.log('Compiled data written to compiled/main.csv'))
    .catch(err => console.log(err));
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// Begin script

await fs.readdir('to-compile/')
  .then(async (files) => {
    console.log('Reading to-compile/ files...');

    for (const file of files) {
      await fs.readFile('to-compile/' + file, 'utf8')
        .then(data => Papa.parse(data, parseConfig))
        .catch(err => console.log(err));
    }

    setTimeout(() => reduceAndSort(), 5000);
  })
  .catch(err => console.log(err));
