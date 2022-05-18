# CSV compiling script

This script will compile many CSV files into one main file: `main.csv`

In `modules/compile.js` modify the `fields` object.
Change the property names to your desires CSV fields.
Then in each property's array, add all other fields that should be compiled in the desired field.

In `modules/sort.js` modify the reducer and sorter variables.
Change 'Email' to desired reducer.
Change 'Last Name' to desired sorter.

Put misc files in the `to-compile/` folder.

Install dependencies and run the script:
```
npm install
node script.js
```
Then your main file will be generated in the `compiled/` folder.
