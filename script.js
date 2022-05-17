// Script to combile records into master csv file
//
// Fields:
// Source,First Name,Last Name,Affiliation,Email,Phone,Origin,Instagram
//
// 1. Compile all csv files into main file
// 2. Sort file alphabetically by 'Last Name'
// 3. Check for multiple records with same 'First Name' and 'Last Name'
//     -When multiple records with same 'First Name' and 'Last Name', combine records into 1
//     -When combining records, if both have a populated field, prefer the last
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

// Use fs.readfile fs.writefile?
// Something to convert csv into mutable json? papaparse
