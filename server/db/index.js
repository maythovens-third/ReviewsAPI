const mysql = require('mysql');

const db = mysql.createConnection({
  host: '18.237.83.39',
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
