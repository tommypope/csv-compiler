# CSV compiling script

###### This script will compile many CSV files into one main file: `main.csv`

In `script.js` modify the `fields` object. Change the property names to your desires CSV fields. Then in each property's array, add all other fields that should be compiled in the desired field.

Put misc files in the `to-compile/` folder.

Install dependencies and run the script:
```
npm install
npm run script.js
```
Then your main file will be generated in the `compiled/` folder.
