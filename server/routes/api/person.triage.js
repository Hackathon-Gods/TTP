const router = require('express').Router({ mergeParams: true })
const mongoose = require('mongoose')
const personRoute = require('./person.js')
const Triage = require('../../db/models/Triage.js')
const { check, validationResult, param } = require('express-validator')
const params = {
    triageId: 'triageId'
}

function getTriages(personId) {
    return Triage.find({ personId: mongoose.Types.ObjectId(personId) }).exec()
}

const middleware = {
    triageExists: (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }
        const personId = req.params[personRoute.params.personId]
        const triageId = req.params[params.triageId]
        Triage.find({ _id: mongoose.Types.ObjectId(triageId), personId: mongoose.Types.ObjectId(personId) }).exec().then(triage => {
            if (!triage) {
                return res.status(404).json({ triage: 'Does not exist' })
            }
            req.triage = triage
            next()
        }).catch(next)
    }
}

// TODO: Validation errors are duplicated

router.post('/', [
    check('personId').exists().isString(),
    check('location').exists().isString(),
    check('comments').exists().isString()
], (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    const personId = req.params[personRoute.params.personId]
    const triage = new Triage({
        personId: mongoose.Types.ObjectId(personId),
        ...req.body
    })
    triage.save().then(() => res.status(201).json(triage)).catch(next)
})

router.get('/', (req, res, next) => {
    const personId = req.params[personRoute.params.personId]
    getTriages(personId).then(data => res.json(data)).catch(next)
})

// Check param and triage exists before going further
router.use(`/:${params.triageId}`, [
    param(params.triageId).exists().isString()
], middleware.triageExists)

// GET
router.get(`/:${params.triageId}`, (req, res) => res.json(req.triage))

module.exports = {
    router,
    params,
    middleware
}
