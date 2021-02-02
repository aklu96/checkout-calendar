/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const moment = require('moment');
const faker = require('faker');
const db = require('./index.js');

const records = [];
for (let id = 1; id <= 100; id += 1) {
  const data = {};
  data._id = id;
  data.maxGuests = faker.finance.amount(1, 14, 0);
  data.price = faker.finance.amount(70, 1000, 0);
  let coefficient = 3.5 + 2 * Math.random();
  data.serviceFee = Math.floor(data.price / coefficient);
  coefficient = 1.5 + 1.2 * Math.random();
  data.cleaningFee = Math.floor(data.price / coefficient);
  data.minStay = Math.random() < 0.1 ? 2 : 0;

  const availability = [[], [], [], [], [], [], [], [], [], [], [], []];
  const day1 = moment('2021-01-01');
  for (let i = 1; i <= 365; i += 1) {
    const month = day1.month();
    const day = day1.date() - 1;
    const obj = {};
    obj.available = Math.random() < 0.4 ? 1 : 0;
    obj.dayOfWeek = day1.day();
    obj.day = day + 1;
    obj.month = month;
    availability[month][day] = obj;
    day1.add(1, 'd');
  }
  data.availability = availability;
  records.push(data);
}

db.checkoutModel.insertMany(records, (err) => {
  if (err) {
    console.log(err);
  }
  db.connection.close(() => {
    console.log('connection closed successfully');
  });
});
