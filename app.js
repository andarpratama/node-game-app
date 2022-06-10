const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');
const connectDB = require('./configs/mongoDB');
require('dotenv').config();

class App {
  static app;
  constructor() {
    require('dotenv').config();
    this.app = express();
    this.plugin();
  }

  plugin() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(routes);
    connectDB();
  }
}

const apps = new App(express()).app;

module.exports = apps;
