// max_guests INT,
// price DECIMAL,
// service_fee DECIMAL,
// cleaning_fee DECIMAL,
// min_stay INT

const faker = require('faker');
const fs = require('fs');
const path = require('path');

// create fake data
const dataGenerator = () => {
  const ownerEmail = `${faker.internet.userName()}@${faker.internet.domainName()}`;
  const maxGuests = faker.finance.amount(1, 14, 0);
  const price = faker.finance.amount(70, 1000, 0);
  let coefficient = 3.5 + 2 * Math.random();
  const serviceFee = Math.floor(price / coefficient);
  coefficient = 1.5 + 1.2 * Math.random();
  const cleaningFee = Math.floor(price / coefficient);
  const minStay = Math.random() < 0.1 ? 2 : 0;
  const data = `${ownerEmail},${maxGuests},${price},${serviceFee},${cleaningFee},${minStay}`;
  return data;
};

// connect to CSV, add headers
const writeListings = fs.createWriteStream(path.join(__dirname, '..', 'CSV', 'listings.csv'));
writeListings.write('listing_id,owner_email,max_guests,price,service_fee,cleaning_fee,min_stay\n', 'utf8');

// write to CSV while handling drain event
const writeTenListings = (writer, encoding, callback) => {
  let i = 10;
  let listingId = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      listingId += 1;
      const data = `${listingId},${dataGenerator()}\n`;
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

writeTenListings(writeListings, 'utf8', () => {
  writeListings.end();
});
