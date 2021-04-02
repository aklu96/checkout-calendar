// TO-DO: COMPLETE API SUITE
// The following have not yet been added:
// - Reservations for "getListings"
// - availability for owner API
// - full renter API

/* eslint-disable no-console */
const express = require('express');
// eslint-disable-next-line no-unused-vars
const newrelic = require('newrelic');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const morgan = require('morgan');

const controller = require('./controller');

const PORT = 80;

const app = express();

app.use(morgan('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// loader.io token
app.use('/loaderio-85d5287cfb6612055dddf74fa8c69236.txt', express.static(path.join(__dirname, '..', 'public', 'loaderio-85d5287cfb6612055dddf74fa8c69236.txt')));

app.use('/:id/bundle', express.static(path.join(__dirname, '..', 'public', 'bundle.js')));
app.use('/:id', express.static(path.join(__dirname, '..', 'public')));

// get all listings
app.get('/api/booking-info/:listingId', controller.getListings);

// owner API
app.post('/api/booking-info/:listingId', controller.owner.addListing);
app.patch('/api/booking-info/:listingId', controller.owner.updateListing);
app.delete('/api/booking-info/:listingId', controller.owner.deleteListing);

// renter API
app.get('/api/booking-info/:listingId/reservations', controller.renter.addReservation);
app.get('/api/booking-info/:listingId/reservations/:reservationId', controller.renter.updateReservation);
app.get('/api/booking-info/:listingId/reservations/:reservationId', controller.renter.deleteReservation);

app.listen(PORT, () => {
  console.log(`Server started, listening on http://localhost:${PORT}`);
});
