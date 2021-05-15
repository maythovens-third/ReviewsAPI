const fs = require('fs');
const readline = require('readline');

async function cleanCharacteristics() {
  var source = './csv/characteristics.csv';
  var destination = './csv/clean_noQ_Characteristics.csv';
  const inStream = fs.createReadStream(source);
  const outStream = fs.createWriteStream(destination);

  outStream.write('id, product_id, name\n');

  const rl = readline.createInterface({
    input: inStream,
    output: outStream,
    crlfDelay: Infinity
  })

  rl.on('line', (line) => {
    var row = line.split(',');
    if (isNaN(row[0]) || row[0] < 1) return;
    if (isNaN(row[1]) || row[1] < 1) return;
    if (!row[2] || row[2] === '') return;
    outStream.write(`${row[0]},${row[1]},${row[2].substring(1, row[2].length -1)}\n`);
  })
}

cleanCharacteristics();
