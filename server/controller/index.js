const db = require('../../database');

const owner = require('./ownerController');
const renter = require('./renterController');

const getListings = (req, res) => {
  let listingInfo;
  db.query('SELECT * FROM LISTINGS WHERE LISTING_ID = $1', [req.params.listingId])
    .then((data) => {
      [listingInfo] = data.rows;
    })
    .then(() => db.query('SELECT * FROM LISTING_DATES WHERE LISTING_ID = $1', [req.params.listingId]))
    .then((data) => {
      listingInfo.availability = data.rows;
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
