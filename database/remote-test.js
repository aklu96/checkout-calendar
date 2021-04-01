const { Pool } = require('pg');
const dbpassword = require('./config.js');

const pool = new Pool({
  host: '45.79.68.105',
  user: 'postgres',
  password: dbpassword,
  database: 'test',
  port: 5432,
});

pool.connect(() => {
  console.log('connected to pg');
});

pool.query('SELECT * FROM listing_dates WHERE id = 10', (err, res) => {
  console.log('here', err, res.rows);
});

module.exports = pool;
