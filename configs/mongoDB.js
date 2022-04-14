const mongoose = require('mongoose')
const logging = require('../services/logging')
const connectDB = () => {
   const pathURL = 'mongodb+srv://andarpratama:0ne41sGvLaRjTrCA@node-game-app.scrnm.mongodb.net/game-api?retryWrites=true&w=majority'
   const connectOption = { useNewUrlParser: true, useUnifiedTopology: true }
   mongoose.connect(pathURL, connectOption)

   // cecking mongodb
   const db = mongoose.connection
   db.on('error', console.error.bind(console, 'Connection error :'))
   db.once('open', () => logging.info('DB', `Database connected`) )
}

module.exports = connectDB