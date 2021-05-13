const mysql = require('mysql');

const db = mysql.createConnection({
  host: '35.165.40.28',
  user: 'api',
  password: 'password1',
  database: 'reviewAPI'
})

db.connect(err => {
  if (err) {
    console.log(`Cannot connect to the MySQL database: ${err}`);
  } else {
    console.log(`Connected to MySQL database reviewAPI.`);
  }
});

module.exports = db;
