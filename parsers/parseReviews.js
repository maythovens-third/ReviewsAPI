const fs = require('fs');
const readline = require('readline');


async function cleanReviews() {
  var source = './csv/reviews.csv';
  var destination = './csv/clean_Reviews.csv';
  const inStream = fs.createReadStream(source);
  const outStream = fs.createWriteStream(destination);

  outStream.write(`id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness\n`);

  const rl = readline.createInterface({
    input: inStream,
    output: outStream,
    crlfDelay: Infinity
  })

  rl.on('line', (line) => {
    let recommendBinary = 0;
    let reportBinary = 0;
    var row = line.split(',');
    if (row[0] === 'id' || Number(row[0]) < 1) return;
    if (Number(row[1]) < 1) return;
    if (Number(row[2]) < 1 || Number(row[2]) > 5) return;
    if (!parseInt(row[3]) || new Date(parseInt(row[3])) === 'Invalid Date') return;
    if (row[4].length > 60 || row[4] === '') return;
    if (row[5].length > 1000 || row[5].length < 50) return;
    if (row[6] !== 'true' && row[6] !== 'false') return;
    if (row[6] === 'true') {
      recommendBinary = 1;
    }
    if (row[7] !== 'true' && row[7] !== 'false') return;
    if (row[7] === 'true') {
      reportBinary = 1;
    }
    if (row[8].length > 30 || row[8] === '') return;
    if (row[9].length > 40 || row[9] === '') return;
    if (typeof row[10] !== 'string') return;
    if (Number(row[11]) < 0) return;

    outStream.write(`${row[0]},${row[1]},${row[2]},${parseInt(row[3])},${row[4]},${row[5]},${recommendBinary},${reportBinary},${row[8]},${row[9]},${row[10]},${row[11]}\n`);
  })
}

cleanReviews();