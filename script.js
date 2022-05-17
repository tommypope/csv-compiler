// Script to combile records into master CSV file
//
// Source,First Name,Last Name,Affiliation,Email,Phone,Origin,Instagram
//
// 1. Compile all CSV files into main file
// 2. Sort file alphabetically by Last Name
// 3. Check for multiple records with same First Name & Last Name
//     -When multiple records with same First Name & Last Name, combine records into 1
//     -When combining records, if both have a populated field, prefer the last
//

const FIELDS = {
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
// something to convert csv into mutable JS object?
