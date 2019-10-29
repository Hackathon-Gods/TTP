const app = require('./server/index.js')

const PORT = process.env.port || 8081

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
