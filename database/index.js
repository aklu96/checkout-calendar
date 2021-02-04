/* eslint-disable no-console */
const mongoose = require('mongoose');

const url = process.env.CONNECTIONSTRING || 'mongodb://localhost:27017/checkout';
mongoose.connect(url, {
  useNewUrlParser: true, useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('Database connected:', url);
});
mongoose.connection.on('error', (err) => {
  console.log(err);
});

const checkoutSchema = new mongoose.Schema({
  _id: Number,
  // availability is an array of months
  availability: [
    // each month array has an object for each day of the month
    [{
      dayOfWeek: Number,
      available: Number,
      day: Number,
      month: Number,
    }],
  ],
  maxGuests: Number,
  price: Number,
  serviceFee: Number,
  cleaningFee: Number,
  minStay: Number,
});

const checkoutModel = mongoose.model('checkout', checkoutSchema);

module.exports = {
  checkoutModel,
  connection: mongoose.connection,
};
