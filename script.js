// script to combile records into master csv file
//
// fields:
// Source,First Name,Last Name,Affiliation,Email,Phone,Origin,Instagram
//
// 1. compile all csv files into main file
// 2. sort file alphabetically by 'Last Name'
// 3. check for multiple records with same 'First Name' and 'Last Name'
//     -when multiple records with same 'First Name' and 'Last Name', combine records into 1
//     -when combining records, if both have a populated field, prefer the last
//

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

// use fs.readfile fs.writefile?
// something to convert csv into mutable json? papaparse
