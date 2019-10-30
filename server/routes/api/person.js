const router = require('express').Router()
const mongoose = require('mongoose')
const Person = require('../../db/models/Person.js')
const { check, validationResult, param } = require('express-validator')
const params = {
    personId: 'personId'
}

function fetchPerson (id) {
    return Person.findById(id).exec()
}

const middleware = {
    personExists: async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }
        const id = req.params[params.personId]
        try {
            const person = await fetchPerson(id)
            if (!person) {
                return res.status(404).json({ person: 'Does not exist' })
            }
            req.person = person
            next()
        } catch (err) {
            next(err)
        }
    }
}

router.post('/', [
    check('fname').exists().isString(),
    check('lname').exists().isString(),
    check('age').optional().isInt(),
    check('priority').optional().isInt(),
    check('rr').optional().isInt(),
    check('pulse').optional().isInt(),
    check('capillaryRefill').optional().isInt(),
    check('bloodPressure').optional().isString(),
    check('qrData').optional().isString()
], (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    const person = new Person(req.body)
    person.save().then(() => res.status(201).json(person)).catch(next)
})

router.use(`/:${params.personId}`, [
    param(params.personId).exists().isString()
], middleware.personExists)

router.get(`/:${params.personId}`, (req, res) => {
    res.json(req.person)
})

router.patch(`/:${params.personId}`, [
    check('fname').optional().isString(),
    check('lname').optional().isString(),
    check('age').optional().isInt(),
    check('priority').optional().isInt(),
    check('rr').optional().isInt(),
    check('pulse').optional().isInt(),
    check('capillaryRefill').optional().isInt(),
    check('bloodPressure').optional().isString(),
    check('qrData').optional().isString()
], (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    for (const key in req.body) {
        req.person[key] = req.body[key]
    }
    req.person.save().then(() => res.json(req.person)).catch(next)
})

module.exports = {
    router,
    params,
    middleware
}
