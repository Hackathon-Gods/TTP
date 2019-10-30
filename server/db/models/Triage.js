const mongoose = require('mongoose')

const schema = mongoose.Schema({
    // Target of triage, in Person collection
    personId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    date: {
        // Date of triage
        type: Date,
        default: Date.now
    },
    location: {
        // Location of triage
        type: String
    },
    comments: {
        // Triage comments
        type: String
    }
})

const Model = mongoose.model('triage', schema)

module.exports = Model
