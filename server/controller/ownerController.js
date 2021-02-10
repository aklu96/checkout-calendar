const db = require('../../database');

const addListing = (req, res) => {
  const values = [
    req.params.listingId,
    req.body.ownerEmail,
    req.body.maxGuests,
    req.body.price,
    req.body.serviceFee,
    req.body.cleaningFee,
    req.body.minStay,
  ];
  db.query('INSERT INTO listings(listing_id, owner_email, max_guests, price, cleaning_fee, service_fee, min_stay) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *', values)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const updateListing = (req, res) => {
  const values = [
    req.params.listingId,
    req.body.ownerEmail,
    req.body.maxGuests,
    req.body.price,
    req.body.serviceFee,
    req.body.cleaningFee,
    req.body.minStay,
    req.params.listingId,
  ];
  db.query('UPDATE listings SET (listing_id, owner_email, max_guests, price, cleaning_fee, service_fee, min_stay) = ($1, $2, $3, $4, $5, $6, $7) WHERE LISTING_ID = $8 RETURNING *', values)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const deleteListing = (req, res) => {
  db.query('DELETE FROM LISTINGS WHERE LISTING_ID = $1', [req.params.listingId])
    .then(() => res.send(204))
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = {
  addListing,
  updateListing,
  deleteListing,
};
