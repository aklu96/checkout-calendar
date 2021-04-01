const db = require('../../database');
const transform = require('./dataTransform');

const owner = require('./ownerController');
const renter = require('./renterController');

// add reservations
const getListings = (req, res) => {
  let listingInfo;
  db.query('SELECT * FROM LISTINGS WHERE LISTING_ID = $1', [req.params.listingId])
    .then((data) => {
      [listingInfo] = data.rows;
    })
    .then(() => db.query('SELECT * FROM LISTING_DATES WHERE LISTING_ID = $1', [req.params.listingId]))
    .then((data) => {
      listingInfo.availability = transform.dates(data.rows);
      // for the sake of making front-end look normal, copy-paste the 3 months of availability
      // to fill out a year's worth of availability
      const placeholder = [];
      for (let i = 0; i < 3; i += 1) {
        placeholder.push(...listingInfo.availability);
      }
      listingInfo.availability.push(...placeholder);
      res.status(200).send(listingInfo);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = {
  owner,
  renter,
  getListings,
};
