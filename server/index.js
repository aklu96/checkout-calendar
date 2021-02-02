const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');

const { get } = require('./controller/checkoutController.js');

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/:id/bundle', express.static(path.join(__dirname, '..', 'public', 'bundle.js')));
app.use('/:id', express.static(path.join(__dirname, '..', 'public')));

app.get('/api/checkout/:id', get);

const PORT = 3010;
app.listen(PORT);
console.log(`Server started, listening on http://localhost:${PORT}`);
