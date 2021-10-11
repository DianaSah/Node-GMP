const fs = require('fs');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);

const csvtojson = require('csvtojson');
const csvFilePath = './csv/data.csv';

csvtojson()
  .fromFile(csvFilePath)
  .then((jsonObj) => writeFile('data.txt', JSON.stringify(jsonObj)))
  .catch((err) => console.error(err));
