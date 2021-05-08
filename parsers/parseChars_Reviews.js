const fs = require('fs');
const readline = require('readline');

async function cleanCharacteristicReviews() {
  var source = './csv/characteristic_reviews.csv';
  var destination = './csv/clean_Characteristic_reviews.csv';
  const inStream = fs.createReadStream(source);
  const outStream = fs.createWriteStream(destination);

  outStream.write('id, charateristic_id, review_id, value\n');

  const rl = readline.createInterface({
    input: inStream,
    output: outStream,
    crlfDelay: Infinity
  })

  rl.on('line', (line) => {
    var row = line.split(',');
    if (isNaN(row[0]) || row[0] < 1) return;
    if (isNaN(row[1]) || row[1] < 1) return;
    if (isNaN(row[2]) || row[2] < 1) return;
    if (isNaN(row[3]) || row[3] < 1 || row[3] > 5) return;
    outStream.write(`${row[0]},${row[1]},${row[2]},${row[3]}\n`);
  })
}

cleanCharacteristicReviews();

