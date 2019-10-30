const mongoose = require('mongoose')

const schema = mongoose.Schema({
    personId: {
        // Target of transport, in Person collection
        type: mongoose.Types.ObjectId,
        unique: true
    },
    start: {
        // Start time
        type: Date,
        default: Date.now
    },
    destCoordinates: {
        // Destination coordinates
        type: String
    },
    destName: {
        // Destination name
        type: String
    },
    mode: {
        // Transport mode
        type: Number
    }
})

const Model = mongoose.model('transport', schema)

module.exports = Model
