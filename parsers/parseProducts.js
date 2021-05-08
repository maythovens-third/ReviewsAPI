const fs = require('fs');
const readline = require('readline');


async function cleanProducts() {
  var source = './csv/product.csv';
  var destination = './csv/cleanProduct.csv';
  const inStream = fs.createReadStream(source);
  const outStream = fs.createWriteStream(destination);

  outStream.write('id\n');

  const rl = readline.createInterface({
    input: inStream,
    output: outStream,
    crlfDelay: Infinity
  })

  rl.on('line', (line) => {
    var row = line.split(',');
    if (isNaN(row[0]) || row[0] < 1) return;
    outStream.write(`${row[0]}\n`);
  })
}

cleanProducts();
