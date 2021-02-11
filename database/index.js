const { Pool } = require('pg');

const pool = new Pool({
  user: 'alexklyuev',
  database: 'listings',
  port: 5432,
});

pool.connect();

module.exports = pool;
