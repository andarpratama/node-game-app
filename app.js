const express = require('express')
const app = express()
const routes = require("./routes")
const bodyParser = require('body-parser');
const connectDB = require('./configs/mongoDB')
const logging = require('./services/logging')
require('dotenv').config()

connectDB()
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());

// => Run Routes
app.use(routes);

// => Run App 
app.listen(process.env.PORT, () => {
	logging.info('SERVER', `Running on port http://localhost:${process.env.PORT}`)
})