const { Pool } = require('pg');

const pool = new Pool({
  user: 'alexklyuev',
  database: 'test',
  port: 5432,
});

pool.connect();

const counter = 1;

const writeToDbCallback = () => {
  pool.query(`COPY listing_dates FROM '${__dirname}/../CSV/test/listing_dates_${counter}.csv' WITH CSV HEADER DELIMITER ',' NULL AS 'null';`, () => {
    console.log('this is a callback');
  });
};

writeToDbCallback();
