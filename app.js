const express = require("express");
const app = express();
const routes = require("./routes");
const bodyParser = require("body-parser");
const connectDB = require("./configs/mongoDB");
require("dotenv").config();

// function App() {
//     // connections database
// connectDB()
// generateResource()

// app.use(express.urlencoded({extended: true}))
// app.use(bodyParser.json());

//     // => Run Routes
//     app.use(routes);
//     app.get('/', (req, res) => res.json({msg: 'Welcome to the game..'}))
// }

class App {
  static app;
  constructor() {
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
