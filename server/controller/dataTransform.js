// may need to also convert keys into camel case - but will postpone this for now

// TO-DO: reverse dates transform for owner post and patch requests (see bottom)

const moment = require('moment');

// reformat date to put into format acceptable to moment
const reformatDate = (date) => {
  let newDate = date.split('-');
  newDate.unshift(newDate.pop());
  newDate = newDate.join('-');
  return newDate;
};

const dates = (days) => {
  // first month is februaray, so index 0 = month 2
  const availability = [[], [], []];

  // transform an array of 89 days into nested array of months as expected by front-end
  days.forEach((dayObj) => {
    // eslint-disable-next-line no-underscore-dangle
    let date = dayObj._date;
    date = reformatDate(date);
    date = moment(date);
    const day = {};
    day.dayOfWeek = date.day();
    day.available = dayObj.available;
    day.day = date.date();
    day.month = date.month() + 1;

    // push into appropriate month array
    availability[day.month - 2].push(day);
  });

  return availability;
};

// TO-DO:
const datesReverse = () => {};

module.exports = {
  dates,
  datesReverse,
};
