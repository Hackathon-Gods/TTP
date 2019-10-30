const mongoose = require('mongoose')

const PersonTriageSchema = mongoose.Schema({
    // Target of triage, in Person collection
    personId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    date: {
        // Date of triage
        type: Date
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

const PersonTriage = mongoose.model(PersonTriageSchema)

module.exports = PersonTriage
