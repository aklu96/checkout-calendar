// easy workaround i'm currently thinking ... no reservations to start.

// reservation_id SERIAL PRIMARY KEY,
// renter_email VARCHAR(100),
// check_in VARCHAR(20),
// check_out VARCHAR(20),
// total_cost INT,
// num_adults INT,
// num_children INT,
// num_infants INT,
// listing_id INT FOREIGN KEY REFERENCES listings(listing_id)

const faker = require('faker');
const fs = require('fs');
const path = require('path');

// create fake data
const createReservationsForListing = () => {
  const renterEmail = `${faker.internet.userName()}@${faker.internet.domainName()}`;
  const data = `${ownerEmail},${maxGuests},${price},${serviceFee},${cleaningFee},${minStay}`;
  return data;
};

// connect to CSV, add headers
const writeReservations = fs.createWriteStream(path.join(__dirname, '..', 'CSV', 'reservations.csv'));
writeReservations.write('reservation_id,renter_email,total_cost,num_adults,num_children,num_infants,listing_id\n', 'utf8');

// write to CSV while handling drain event
const writeTenListingReservations = (writer, encoding, callback) => {
  let i = 10;
  let listingId = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      listingId += 1;

      // inner loop for reservations
      do {
        let j = Math.floor(Math.random() * 25 + 1);
        let reservationId = 0;

        if (i === 0) {
        writer.write(data, encoding, callback);
        } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
        }
      } while {

      }

      const data = `${listingId}`;

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