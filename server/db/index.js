const mysql = require('mysql');

const db = mysql.createConnection({
  host: '54.149.187.173',
  user: 'api',
  password: 'password',
  database: 'reviewAPI'
})

db.connect(err => {
  if (err) console.log(`Cannot connect to the MySQL database: ${err}`);
  console.log(`Connected to MySQL database reviewAPI.`);
});

module.exports = db;