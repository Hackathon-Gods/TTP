const router = require('express').Router()
const personRoute = require('./person.js')
const transportRoute = require('./person.transport.js')
const triageRoute = require('./person.triage.js')

router.use('/person', personRoute.router)
router.use(`/person/:${personRoute.params.personId}/triage`, triageRoute.router)
router.use(`/person/:${personRoute.params.personId}/transport`, transportRoute.router)

module.exports = {
    router
}
