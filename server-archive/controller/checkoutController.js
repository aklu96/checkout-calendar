const { getSeed } = require('../model/checkoutModel.js');

module.exports = {
  get: (req, res) => {
    const { id } = req.params;
    getSeed(id, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  },
};
