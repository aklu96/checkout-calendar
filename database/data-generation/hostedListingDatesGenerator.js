/* eslint-disable no-console */
const { Pool } = require('pg');

const pool = new Pool({
  user: 'ubuntu',
  password: 'ubuntu',
  database: 'test',
  port: 5432,
});

pool.connect();

const fs = require('fs');
const path = require('path');
const moment = require('moment');

// should be multiple of 89 - ultimately 890,000; write 100 times
// keep everything the same, just pass through variables
let counter = 10;
let listingId = 0;
let id = 0;

// this callback is invoked after the csv is written
// it will copy to the db, then upon completion of that, invoke the next round of seeding
const writeToDbCallback = (writer) => {
  pool.query(`COPY listing_dates FROM '${__dirname}/../CSV/test/listing_dates_${counter}.csv' WITH CSV HEADER DELIMITER ',' NULL AS 'null';`, () => {
    counter -= 1;
    const percentage = 100 * ((10 - counter) / 10);
    console.log(`${percentage}% of records have been seeded...`);

    if (counter > 0) {
      // eslint-disable-next-line no-use-before-define
      writeMillionListingDates('utf8');
    } else {
      writer.end();
    }
  });
};

// write to CSV while handling drain event
const writeMillionListingDates = (encoding) => {
  const writer = fs.createWriteStream(path.join(__dirname, '..', 'CSV', 'test', `listing_dates_${counter}.csv`));
  writer.write('id,_date,available,listing_id,reservation_id\n', 'utf8');

  let i = 890;
  let day1;

  function write() {
    let ok = true;
    do {
      if (i % 89 === 0) {
        listingId += 1;
        day1 = moment('2021-01-31');
      }
      id += 1;
      day1.add(1, 'd');
      i -= 1;

      const date = `${day1.month() + 1}-${day1.date()}-${day1.year()}`;
      const available = Math.random() < 0.4 ? 1 : 0;
      const data = `${id},${date},${available},${listingId},null\n`;
      if (i === 0) {
        // iteration has ended - check if it's the last file as well
        // eslint-disable-next-line no-loop-func
        writer.write(data, encoding, () => {
          writeToDbCallback(writer);
        });
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.ß
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write();
};

writeMillionListingDates('utf8');
