const fs = require('fs');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);

const csvTojson = require('csvtojson');
const csvFilePath = './csv/data.csv';

// #1 Using Promises

csvTojson()
  .fromFile(csvFilePath)
  .then((jsonObj) => writeFile('dataTask2.txt', JSON.stringify(jsonObj)))
  .catch((err) => console.error(err));

// #2 Using async/await

// async function run() {
//   try {
//     const jsonObj = await csvTojson().fromFile(csvFilePath);
//     await writeFile('dataTask2.txt', JSON.stringify(jsonObj));
//   } catch(err) {
//     console.error(err);
//   }
    
// };

// run();
