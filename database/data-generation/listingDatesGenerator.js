// id SERIAL PRIMARY KEY,
// date VARCHAR(20),
// available INT,
// listing_id INT FOREIGN KEY REFERENCES listings(listing_id),
// reservation_id INT FOREIGN KEY REFERENCES reservations(reservation_id)

const fs = require('fs');
const path = require('path');
const faker = require('faker');
const moment = require('moment');

// connect to CSV, add headers
const writeListingDates = fs.createWriteStream(path.join(__dirname, '..', 'CSV', 'listing_dates.csv'));
writeListingDates.write('id,date,available,listing_id,reservation_id\n', 'utf8');

// write to CSV while handling drain event
const writeTenListingDates = (writer, encoding, callback) => {
  let i = 10 * 89;
  let listingId = 0;
  function write() {
    let ok = true;
    do {
      if (i % 89 === 0) {
        listingId += 1;
      }
      i -= 1;

      const data
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
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