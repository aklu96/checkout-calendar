/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const moment = require('moment');

// connect to CSV, add headers
const writeListingDates = fs.createWriteStream(path.join(__dirname, '..', 'CSV', 'test.csv'));
writeListingDates.write('id,_date,available,listing_id,reservation_id\n', 'utf8');

// write to CSV while handling drain event
const writeTenListingDates = (writer, encoding, callback) => {
  let i = 10000000 * 89;
  let listingId = 9999990;
  let id = 889999110;
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
        console.log(`${890000000 - i} records have been seeded...`);
      }

      const date = `${day1.month() + 1}-${day1.date()}-${day1.year()}`;
      const available = Math.random() < 0.4 ? 1 : 0;
      const data = `${id},${date},${available},${listingId},null\n`;
      if (i === 889999110) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        console.log('draining...');
        ok = writer.write(data, encoding);
      }
    } while (i > 889999110 && ok);
    if (i > 889999110) {
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
