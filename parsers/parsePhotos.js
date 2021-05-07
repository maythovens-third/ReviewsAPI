const fs = require('fs');
const readline = require('readline');

async function cleanPhotos() {
  var source = './csv/reviews_photos.csv';
  var destination = './csv/cleanPhotos.csv';
  const inStream = fs.createReadStream(source);
  const outStream = fs.createWriteStream(destination);

  outStream.write('id, review_id, url\n');

  const rl = readline.createInterface({
    input: inStream,
    output: outStream,
    CRLF: Infinity
  })

  rl.on('line', (line) => {
    var row = line.split(',');
    if (isNaN(row[0]) || row[0] < 1) return;
    if (isNaN(row[1]) || row[1] < 1) return;
    var url = row[2];
    if (!url) return;
    outStream.write(`${row[0]},${row[1]},${row[2]}\n`);
  })
}

cleanPhotos();