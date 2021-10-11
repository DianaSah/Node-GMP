import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';

import csvTojson from 'csvtojson';
const csvFilePath = './csv/data.csv';

// #1 Using Promises

pipeline(
  createReadStream(csvFilePath),
  csvTojson().fromFile(csvFilePath),
  createWriteStream('dataTask3.txt'),
  (err) => {
    if (err) {
      console.error(err);
    }
  }
);

// #2 Using async/await

// import { promisify } from 'util';
// const pipelinePromise = promisify(pipeline);

// const run = async () => {
//   await pipelinePromise(
//     createReadStream(csvFilePath),
//     csvTojson().fromFile(csvFilePath),
//     createWriteStream('dataTask3.txt')
//   );
// }

// run().catch(console.error);