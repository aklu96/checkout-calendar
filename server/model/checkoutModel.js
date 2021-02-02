const { checkoutModel } = require('../../database');

module.exports = {
  getSeed: (id, cb) => {
    checkoutModel.findById(id, (err, results) => {
      if (err) {
        cb(err);
      } else {
        cb(null, results);
      }
    });
  },
};
