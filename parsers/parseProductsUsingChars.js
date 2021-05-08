const fs = require('fs');
const readline = require('readline');


async function cleanProductsWithChars() {
  var source = './csv/characteristics.csv';
  var destination = './csv/clean_Product_using_Chars.csv';
  const inStream = fs.createReadStream(source);
  const outStream = fs.createWriteStream(destination);

  outStream.write('id\n');

  const rl = readline.createInterface({
    input: inStream,
    output: outStream,
    crlfDelay: Infinity
  })

  var lastId = 0;

  rl.on('line', (line) => {
    var row = line.split(',');
    if (isNaN(row[1]) || row[1] < 1) return;
    if (row[1] <= lastId) return;
    var difference = Number(row[1]) - lastId;
    lastId += difference;
    outStream.write(`${row[1]}\n`);
  })
}

cleanProductsWithChars();