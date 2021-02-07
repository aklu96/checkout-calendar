const moment = require('moment');

// February 1st, 2021
let day1 = moment('2021-02-01');

console.log(day1);

console.log(day1.date());
day1.add(1, 'd');
console.log(day1.date());

console.log(`${day1.month() + 1}-${day1.date()}-${day1.year()}`);
