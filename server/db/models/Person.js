const mongoose = require('mongoose')

const schema = mongoose.Schema({
    fname: {
        // First name
        type: String,
        default: 'unknown'
    },
    lname: {
        // Last name
        type: String,
        default: 'unknown'
    },
    age: {
        // Age
        type: Number,
        default: -1
    },
    location: {
        // Initial location
        type: String
    },
    priority: {
        // -1=Unknown, 0=Green, 1=Yellow, 2=Red, 3=Black
        type: Number,
        default: -1,
        max: 3,
        min: -1
    },
    rr: {
        // Heart rate variability
        type: Number,
        default: -1
    },
    pulse: {
        // Heart rate pulse
        type: Number,
        default: -1
    },
    capillaryRefill: {
        // https://en.wikipedia.org/wiki/Capillary_refill
        type: Number,
        default: -1
    },
    bloodPressure: {
        // Blood pressure
        type: String
    },
    qrData: {
        // String data of QR
        type: String
    }
})

const Model = mongoose.model('person', schema)

module.exports = Model
