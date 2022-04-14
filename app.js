const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require("./routes")
const bodyParser = require('body-parser');
require('dotenv').config()

app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());

// => Run Routes
app.use(routes);

// => Run App 
app.listen(port, () => {
	console.log(`Server running on port http://localhost:${port}`)
})