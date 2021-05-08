const fs = require('fs');
const readline = require('readline');

async function cleanCharacteristics() {
  var source = './csv/characteristics.csv';
  var destination = './csv/cleanCharacteristics.csv';
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
    var chars = {
      Quality: 1,
      Length: 1,
      Fit: 1,
      Size: 1,
      Width: 1,
      Comfort: 1,
    };
    if (isNaN(row[0]) || row[0] < 1) return;
    if (isNaN(row[1]) || row[1] < 1) return;
    if (!row[2] || row[2] === '') return;
    outStream.write(`${row[0]},${row[1]},${row[2]}\n`);
  })
}

cleanCharacteristics();
