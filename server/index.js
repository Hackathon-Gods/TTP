const express = require('express')
const app = express()
const routes = require('./routes/index.js')
require('./db/connect.js')(app)

app.use(express.json())

// Test route
app.get('/', (req, res) => res.send('Hello World!'))

// Deal with all routes in routes/index
app.use(routes)

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html')))
}

module.exports = app
