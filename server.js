const express = require('express');
const logging = require('./services/logging');
const App = require('./app');
require('dotenv').config();

// => Run App
App.listen(process.env.PORT || 3000, () => {
  logging.info(
    'SERVER',
    `Running on port http://localhost:${process.env.PORT}`
  );
});
