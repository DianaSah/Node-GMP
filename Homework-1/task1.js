process.openStdin().on('data', (chunk) => {
  const data = chunk.toString().trim().split("").reverse().join("");
  process.stdout.write(`${data}\n`); 
});
