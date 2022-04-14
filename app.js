const express = require('express')
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()

app.get('/', (req, res) => res.json({
    msg: 'Welcome to the game..',
    title: 'Node Game App',
    author: 'Andar Pratama',
    repo: 'https://github.com/andarpratama/node-game-app'
}))

app.listen(port, () => {
	console.log(`Server running on port http://localhost:${port}`)
})