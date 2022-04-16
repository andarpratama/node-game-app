const express = require('express')
const app = express()
const logging = require('./services/logging')
const App = require("./app");
require('dotenv').config()

// => Run App 
App.listen(process.env.PORT, () => {
	logging.info('SERVER', `Running on port http://localhost:${process.env.PORT}`)
})