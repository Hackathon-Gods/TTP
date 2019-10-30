const router = require('express').Router({ mergeParams: true })
const mongoose = require('mongoose')
const personRoute = require('./person.js')
const Transport = require('../../db/models/Transport.js')
const { check, validationResult, param } = require('express-validator')
const params = {
    transportId: 'transportId'
}

function getTransports(personId) {
    return Transport.find({ personId: mongoose.Types.ObjectId(personId) }).exec()
}

const middleware = {
    transportExists: (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }
        const personId = req.params[personRoute.params.personId]
        const transportId = req.params[params.transportId]
        Transport.find({ _id: mongoose.Types.ObjectId(transportId), personId: mongoose.Types.ObjectId(personId) }).then(transport => {
            if (!transport) {
                return res.status(404).json({ transport: 'Does not exist' })
            }
            req.transport = transport
            next()
        }).catch(next)
    }
}

router.post('/', [
    check('destCoordinates').isString(),
    check('mode').optional().isInt()
], (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    const personId = req.params[personRoute.params.personId]
    const transport = new Transport({
        personId: mongoose.Types.ObjectId(personId),
        ...req.body
    })
    // Get the destination name here from GPS coordinates
    transport.save().then(() => res.status(201).json(transport)).catch(next)
})

router.get('/', (req, res, next) => {
    const personId = req.params[personRoute.params.personId]
    getTransports(personId).then(data => res.json(data)).catch(next)
})

// Check param and transport exists
router.use(`/:${params.transportId}`, [
    param(params.transportId).exists().isString()
], middleware.transportExists)

// GET
router.get(`/:${params.transportId}`, (req, res) => res.json(req.transport))

// PATCH
router.patch(`/:${params.transportId}`, [
    check('destCoordinates').isString(),
    check('mode').optional().isInt()
], (req, res, next) => {
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    for (const key in req.body) {
        req.transport[key] = req.body[key]
    }
    req.transport.save().then(() => res.json(req.transport)).catch(next)
})

module.exports = {
    router,
    middleware
}
