const app = require('./server/index.js')

const PORT = process.env.port || 8081

app.once('ready', () => {
    app.listen(PORT, () => console.log(`Database connected, server listening on port ${PORT}`))
})
