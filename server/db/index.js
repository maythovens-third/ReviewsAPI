const { Pool } = require('pg');

const pool = new Pool({
  user: 'samgasser',
  database: 'testdb',
});

module.exports = pool;