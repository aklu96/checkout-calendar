/* eslint-disable no-console */
// id SERIAL PRIMARY KEY,
// date VARCHAR(20),
// available INT,
// listing_id INT FOREIGN KEY REFERENCES listings(listing_id),
// reservation_id INT FOREIGN KEY REFERENCES reservations(reservation_id)

const fs = require('fs');
const path = require('path');
const moment = require('moment');

// connect to CSV, add headers
const writeListingDates = fs.createWriteStream(path.join(__dirname, '..', 'CSV', 'listing_dates.csv'));
writeListingDates.write('id,_date,available,listing_id,reservation_id\n', 'utf8');

// write to CSV while handling drain event
const writeTenListingDates = (writer, encoding, callback) => {
  let i = 1000000 * 89;
  let listingId = 0;
  let id = 0;
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

      if (i % 890000 === 0) {
        console.log(`${(89000000 - i) / 890000}% of records have been seeded...`);
      }

      const date = `${day1.month() + 1}-${day1.date()}-${day1.year()}`;
      const available = Math.random() < 0.4 ? 1 : 0;
      const data = `${id},${date},${available},${listingId},null\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
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

writeTenListingDates(writeListingDates, 'utf8', () => {
  writeListingDates.end();
});
