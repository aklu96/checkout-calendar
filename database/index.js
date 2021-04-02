/* eslint-disable no-console */
const { Pool } = require('pg');
const dbpassword = require('./config.js');

const pool = new Pool({
  host: '45.79.68.105',
  user: 'postgres',
  password: dbpassword,
  database: 'listings',
  port: 5432,
});

pool.connect(() => {
  console.log('Connected to Postgres');
});

module.exports = pool;
