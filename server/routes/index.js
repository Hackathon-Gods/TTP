const router = require('express').Router()
const apiRouter = require('./api/index.js')

router.use('/api', apiRouter)

module.exports = router
