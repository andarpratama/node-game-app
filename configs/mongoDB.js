const mongoose = require('mongoose');
const generateResource = require('../services/generate.resource');
const connectDB = async () => {
  const pathURL =
    'mongodb+srv://andarpratama:0ne41sGvLaRjTrCA@node-game-app.scrnm.mongodb.net/game-api?retryWrites=true&w=majority';
  //   const pathURL = process.env.DB_HOST;
  const connectOption = { useNewUrlParser: true, useUnifiedTopology: true };
  mongoose.connect(pathURL, connectOption);

  // cecking mongodb
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Connection error :'));
  db.once('open', async () => {
    generateResource();
    // console.log(`[INFO] [DB] Message : Database connected`)
  });
};

module.exports = connectDB;
